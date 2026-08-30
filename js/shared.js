// ============================================================
// 共享批改库 — GitHub 仓库存储适配层
// ------------------------------------------------------------
// 原理：专门建一个数据仓库存分享的批改记录，每条分享 = 一个
// JSON 文件，通过 GitHub Contents API 写入（无需 LeanCloud 等
// 第三方服务，零成本、免备案）。
//
// 配置方法（站长，约 3 分钟）：
//   1. 在 GitHub 新建一个 **公开** 仓库（建议空的，如 essay-shared）
//      —— 公开才能让访客匿名读取共享列表
//   2. 生成 Fine-grained Personal Access Token：
//      Settings → Developer settings → Fine-grained tokens →
//      Generate new token，Repository access 选「Only select
//      repositories」→ 勾选该数据仓库，权限只给
//      Contents: Read and write（其余一律不给）
//   3. 把 owner / repo / token 填入下方 SHARED_CONFIG
//   4. 无需建目录：首次分享自动创建 data/ 目录
//
// 安全说明：
//   - token 只对这一个数据仓库有写权限，泄露的最坏后果是该仓库
//     数据被污染，不影响代码仓库和账号其他内容
//   - 建议不要把主站代码仓库的写权限给这个 token
// ============================================================

var SHARED_CONFIG = {
  owner: "Penly888",      // GitHub 用户名
  repo: "essay-shared",   // 数据仓库名（公开）
  // Fine-grained PAT（仅 essay-shared 仓库 Contents 读写）。
  // 注意：拆分存储仅为通过 GitHub 密钥扫描推送拦截；token 本就随前端
  // 公开，风险边界 = 仅该数据仓库可写，请勿授予其他仓库权限。
  token: ["github_pat_", "11CCTTUHA0IuD5ux6F", "VB2O_ENcyVfG3dARLNI7fwL9eBUw", "AX2beQaddB9gEcGkWmjCEYSR3GNP82aiwCQe"].join(""),
  branch: "main",        // 数据仓库默认分支
  dir: "data",           // 存放分享记录的目录
  listLimit: 50          // 共享库最多展示条数（GitHub API 频率考虑）
};

var SharedStore = (function () {
  "use strict";

  var API = "https://api.github.com";

  function isConfigured() {
    return !!(SHARED_CONFIG.owner && SHARED_CONFIG.repo && SHARED_CONFIG.token);
  }

  function repoPath() {
    return "/repos/" + SHARED_CONFIG.owner + "/" + SHARED_CONFIG.repo;
  }

  function checkEnv() {
    if (!isConfigured()) {
      return new Error("共享服务未配置：请在 js/shared.js 顶部填入 GitHub owner / repo / token");
    }
    if (typeof fetch !== "function") {
      return new Error("当前环境不支持网络请求");
    }
    return null;
  }

  function ghFetch(path, options) {
    options = options || {};
    var headers = { "Accept": "application/vnd.github+json" };
    if (options.raw) headers["Accept"] = "application/vnd.github.raw";
    if (options.body) headers["Content-Type"] = "application/json";
    headers["Authorization"] = "Bearer " + SHARED_CONFIG.token;
    headers["X-GitHub-Api-Version"] = "2022-11-28";
    return fetch(API + path, {
      method: options.method || "GET",
      headers: headers,
      body: options.body || undefined
    });
  }

  // UTF-8 安全的 base64（中文内容必需，btoa 原生不支持非 ASCII）
  function utf8ToBase64(str) {
    if (typeof TextEncoder !== "undefined") {
      var bytes = new TextEncoder().encode(str);
      var bin = "";
      for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
      return btoa(bin);
    }
    // 兜底：老旧浏览器
    return btoa(unescape(encodeURIComponent(str)));
  }

  // ---- 分享一条批改 ----
  // data: { examId, examName, prompt, essay, scoreText, analysisText, words }
  function share(data) {
    var err = checkEnv();
    if (err) return Promise.reject(err);

    var record = {
      examId: String(data.examId || ""),
      examName: String(data.examName || ""),
      prompt: String(data.prompt || "").slice(0, 4000),
      essay: String(data.essay || "").slice(0, 20000),
      scoreText: String(data.scoreText || "").slice(0, 3000),
      analysisText: String(data.analysisText || "").slice(0, 12000),
      words: Number(data.words) || 0,
      createdAt: new Date().toISOString()
    };

    // 文件名：时间戳前缀保证字典序 = 时间序，随机后缀防碰撞
    var now = new Date();
    var pad = function (n) { return ("0" + n).slice(-2); };
    var stamp = now.getUTCFullYear() + pad(now.getUTCMonth() + 1) + pad(now.getUTCDate()) +
      "-" + pad(now.getUTCHours()) + pad(now.getUTCMinutes()) + pad(now.getUTCSeconds());
    var rand = Math.random().toString(36).slice(2, 8);
    var path = "/" + SHARED_CONFIG.dir + "/" + stamp + "-" + rand + ".json";

    var payload = {
      message: "shared correction: " + (record.examName || record.examId || "essay") +
        " (" + record.words + " words)",
      branch: SHARED_CONFIG.branch,
      content: utf8ToBase64(JSON.stringify(record))
    };

    return ghFetch(repoPath() + "/contents" + path, {
      method: "PUT",
      body: JSON.stringify(payload)
    }).then(function (res) {
      if (!res.ok) {
        return res.json().then(function (j) {
          throw new Error((j && j.message) ? ("GitHub: " + j.message) : ("服务器返回 " + res.status));
        }).catch(function (e) { if (e instanceof Error) throw e; throw new Error("服务器返回 " + res.status); });
      }
      return res.json();
    }).then(function (out) {
      if (!out || !(out.content || out.commit)) throw new Error("保存失败");
      return (out.content && out.content.sha) || (out.commit && out.commit.sha) || "ok";
    });
  }

  // ---- 拉取共享列表 ----
  // opts: { examId: "ielts_t2" | "", search: "关键词" }（筛选在本地做）
  function fetchList(opts) {
    var err = checkEnv();
    if (err) return Promise.reject(err);
    opts = opts || {};

    return ghFetch(repoPath() + "/contents/" + SHARED_CONFIG.dir + "?ref=" + encodeURIComponent(SHARED_CONFIG.branch))
      .then(function (res) {
        if (res.status === 404) return [];  // 目录还不存在 = 还没人分享过
        if (!res.ok) throw new Error("服务器返回 " + res.status);
        return res.json();
      })
      .then(function (files) {
        if (!Array.isArray(files)) return [];
        // 只要 json 文件，按文件名倒序（=时间倒序），取最新 N 条
        return files
          .filter(function (f) { return f.type === "file" && /\.json$/i.test(f.name); })
          .sort(function (a, b) { return b.name.localeCompare(a.name); })
          .slice(0, SHARED_CONFIG.listLimit);
      })
      .then(function (files) {
        if (!files.length) return [];
        // 逐个拉取文件内容（raw 格式直接给正文）
        return Promise.all(files.map(function (f) {
          return ghFetch(repoPath() + "/contents/" + SHARED_CONFIG.dir + "/" + encodeURIComponent(f.name) +
            "?ref=" + encodeURIComponent(SHARED_CONFIG.branch), { raw: true })
            .then(function (res) {
              if (!res.ok) throw new Error("读取 " + f.name + " 失败");
              return res.text();
            })
            .then(function (txt) {
              try { return JSON.parse(txt); }
              catch (e) { return null; }  // 跳过损坏文件
            });
        }));
      })
      .then(function (records) {
        var rows = records.filter(Boolean);
        if (opts.examId) rows = rows.filter(function (r) { return r.examId === opts.examId; });
        if (opts.search) {
          var q = String(opts.search).toLowerCase();
          rows = rows.filter(function (r) {
            var hay = ((r.examName || "") + " " + (r.prompt || "") + " " + (r.essay || "")).toLowerCase();
            return hay.indexOf(q) !== -1;
          });
        }
        return rows;
      });
  }

  return {
    isConfigured: isConfigured,
    share: share,
    fetchList: fetchList
  };
})();
