// ============================================================
// 付费门控 — 按次充值
// ------------------------------------------------------------
// 商业模式（自动发码，主模式）：
//   - 新用户免费体验 3 次批改（localStorage 计数）
//   - 付费：用户点购买 → 云函数（cloud/pay-function.js）向虎皮椒
//     下单 → 展示支付二维码 → 支付成功回调云函数 → 自动发码 →
//     前端轮询拿码并自动入账，全程无需加微信
//   - 激活码校验：SHA-256 后比对 js/pay-codes.js 哈希库
//   - 跨设备一次性使用：发码时云端登记 data/used/<hash>.json
// 兜底模式（PAY_CONFIG.cloudEndpoint 留空时）：
//   - 用户扫微信商家收款码付款 → 卖家人工发码 → 手动激活
//
// 站长须知：
//   - 明文码表在本地 essay-codes-batch1-500.txt（勿入库）
//   - 码池（CODES_JSON）部署在云函数环境变量里
//   - 云函数部署步骤见 cloud/DEPLOY.md
//   - 前端门控可被技术用户绕过（静态站固有局限），
//     起步阶段以「方便付费」为主，不追求防破解
// ============================================================

var PAY_CONFIG = {
  freeUses: 3,           // 新用户免费次数
  usesPerPack: 10,       // 每个激活码包含的批改次数
  priceText: "9.9 元",   // 展示用价格文案
  payQr: "img/wechat-pay.jpg",  // 兜底：微信商家收款码图片（人工发码模式）
  sellerContact: "1059398048",  // 兜底：卖家微信（人工发码模式 / 售后联系）
  storageKey: "wc_pay_state_v1",
  // 已用码登记目录（essay-shared 仓库内）
  usedDir: "used",
  // ---- 自动发码模式（虎皮椒 + 云函数）----
  // 部署 cloud/pay-function.js 后把访问地址填到这里，
  // 例如 "https://1234567890.ap-northeast-2.fcapp.app"
  // 留空 = 人工发码模式（扫收款码 + 加微信领码）
  cloudEndpoint: ""
};

var PayGate = (function () {
  "use strict";

  // ---- 纯 JS SHA-256（避免依赖 crypto.subtle，测试环境也能跑）----
  function sha256(ascii) {
    function rightRotate(v, a) { return (v >>> a) | (v << (32 - a)); }
    var maxWord = Math.pow(2, 32);
    var result = "";
    var words = [];
    var asciiBitLength = ascii.length * 8;
    var hash = sha256.h = sha256.h || [];
    var k = sha256.k = sha256.k || [];
    var primeCounter = k.length;
    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (var i = 0; i < 313; i += candidate) isComposite[i] = candidate;
        hash[primeCounter] = (Math.pow(candidate, 0.5) * maxWord) | 0;
        k[primeCounter++] = (Math.pow(candidate, 1 / 3) * maxWord) | 0;
      }
    }
    ascii += "\x80";
    while (ascii.length % 64 - 56) ascii += "\x00";
    for (i = 0; i < ascii.length; i++) {
      var j = ascii.charCodeAt(i);
      if (j >> 8) return ""; // 非 ASCII 输入不支持（激活码只含 ASCII）
      words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words.length] = ((asciiBitLength / maxWord) | 0);
    words[words.length] = (asciiBitLength);
    for (j = 0; j < words.length;) {
      var w = words.slice(j, j += 16);
      var oldHash = hash.slice(0, 8);
      hash = hash.slice(0, 8);
      for (i = 0; i < 64; i++) {
        var w15 = w[i - 15], w2 = w[i - 2];
        var a = hash[0], e = hash[4];
        var temp1 = hash[7]
          + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
          + ((e & hash[5]) ^ ((~e) & hash[6]))
          + k[i]
          + (w[i] = (i < 16) ? w[i] : (
            w[i - 16]
            + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
            + w[i - 7]
            + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
          ) | 0);
        var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
          + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
        hash = [(temp1 + temp2) | 0].concat(hash);
        hash[4] = (hash[4] + temp1) | 0;
      }
      for (i = 0; i < 8; i++) {
        hash[i] = (hash[i] + oldHash[i]) | 0;
      }
    }
    for (i = 0; i < 8; i++) {
      for (var j2 = 3; j2 + 1; j2--) {
        var b = (hash[i] >> (j2 * 8)) & 255;
        result += ((b < 16) ? 0 : "") + b.toString(16);
      }
    }
    return result;
  }

  // ---- 本地配额状态 ----
  function loadState() {
    var s = { free: PAY_CONFIG.freeUses, paid: 0, packs: 0 };
    try {
      var raw = localStorage.getItem(PAY_CONFIG.storageKey);
      if (raw) {
        var o = JSON.parse(raw);
        if (typeof o.free === "number") s.free = o.free;
        if (typeof o.paid === "number") s.paid = o.paid;
        if (typeof o.packs === "number") s.packs = o.packs;
      }
    } catch (e) { /* localStorage 不可用则每次都免费体验 */ }
    return s;
  }

  function saveState(s) {
    try { localStorage.setItem(PAY_CONFIG.storageKey, JSON.stringify(s)); } catch (e) {}
  }

  function remaining() {
    var s = loadState();
    return Math.max(0, s.free) + Math.max(0, s.paid);
  }

  function canUse() { return remaining() > 0; }

  // 扣一次：先扣免费，再扣付费
  function consume() {
    var s = loadState();
    if (s.free > 0) s.free -= 1;
    else if (s.paid > 0) s.paid -= 1;
    else return 0;
    saveState(s);
    return remaining();
  }

  // ---- 激活码处理 ----
  // 归一化：去掉空白和连字符，转大写
  function normalizeCode(input) {
    var t = String(input || "").replace(/[\s-]/g, "").toUpperCase();
    if (!/^EC[A-Z0-9]{10}$/.test(t)) return null;
    return "EC-" + t.slice(2, 7) + "-" + t.slice(7);
  }

  function codeHash(normalized) { return sha256(normalized); }

  // GitHub 数据仓库通道（复用共享库配置）
  function ghBase() {
    var c = (typeof SHARED_CONFIG !== "undefined") ? SHARED_CONFIG : null;
    return (c && c.owner && c.repo) ? c : null;
  }

  function ghHeaders(withAuth) {
    var h = { "Accept": "application/vnd.github+json" };
    if (withAuth && ghBase() && typeof SHARED_CONFIG.token === "string") {
      h["Authorization"] = "Bearer " + SHARED_CONFIG.token;
    }
    return h;
  }

  // 查询该码是否已被使用（带 token 读取，避免 CDN 缓存 404 误判）
  function isUsedOnline(hash) {
    var c = ghBase();
    if (!c || typeof fetch !== "function") return Promise.reject(new Error("网络不可用"));
    var url = "https://api.github.com/repos/" + c.owner + "/" + c.repo +
      "/contents/data/" + PAY_CONFIG.usedDir + "/" + hash + ".json?ref=" + encodeURIComponent(c.branch || "main");
    return fetch(url, { headers: ghHeaders(true) }).then(function (res) {
      if (res.status === 404) return false;      // 未使用
      if (!res.ok) throw new Error("查询失败（" + res.status + "）");
      return true;                                // 已被使用
    });
  }

  // 登记已使用（写，需 token）
  function markUsedOnline(hash) {
    var c = ghBase();
    if (!c || !SHARED_CONFIG.token || typeof fetch !== "function") {
      return Promise.reject(new Error("网络不可用，暂无法激活"));
    }
    var payload = JSON.stringify({ usedAt: new Date().toISOString() });
    var body = JSON.stringify({
      message: "code used: " + hash.slice(0, 8),
      branch: c.branch || "main",
      content: (typeof btoa !== "undefined") ? btoa(payload) : payload
    });
    var url = "https://api.github.com/repos/" + c.owner + "/" + c.repo +
      "/contents/data/" + PAY_CONFIG.usedDir + "/" + hash + ".json";
    return fetch(url, { method: "PUT", headers: ghHeaders(true), body: body })
      .then(function (res) {
        if (res.status === 422) throw new Error("该激活码已被使用过");
        if (!res.ok) throw new Error("登记失败（" + res.status + "），请稍后重试");
        return true;
      });
  }

  // 激活主流程：返回 Promise<remaining>
  function activate(input) {
    var code = normalizeCode(input);
    if (!code) return Promise.reject(new Error("激活码格式不对，应为 EC-XXXXX-XXXXX"));
    var hashes = (typeof PAY_CODE_HASHES !== "undefined") ? PAY_CODE_HASHES : [];
    var hash = codeHash(code);
    if (hashes.indexOf(hash) === -1) {
      return Promise.reject(new Error("激活码无效，请核对后重试（或联系卖家）"));
    }
    return isUsedOnline(hash).then(function (used) {
      if (used) throw new Error("该激活码已被使用过");
      return markUsedOnline(hash);
    }).then(function () {
      var s = loadState();
      s.paid += PAY_CONFIG.usesPerPack;
      s.packs += 1;
      saveState(s);
      return remaining();
    });
  }

  // ---- 云端发码后的本地入账 ----
  // 与 activate() 的区别：云端回调已把该码登记为已用，
  // 这里只做格式 + 哈希校验 + 本设备防重复入账
  function creditedList() {
    try { return JSON.parse(localStorage.getItem("wc_pay_credited_v1") || "[]"); }
    catch (e) { return []; }
  }

  function credit(input) {
    var code = normalizeCode(input);
    if (!code) return Promise.reject(new Error("激活码格式不对，应为 EC-XXXXX-XXXXX"));
    var hashes = (typeof PAY_CODE_HASHES !== "undefined") ? PAY_CODE_HASHES : [];
    var hash = codeHash(code);
    if (hashes.indexOf(hash) === -1) {
      return Promise.reject(new Error("激活码无效，请核对后重试（或联系卖家）"));
    }
    if (creditedList().indexOf(hash) !== -1) {
      return Promise.resolve(remaining()); // 本设备已入过账，幂等返回
    }
    var s = loadState();
    s.paid += PAY_CONFIG.usesPerPack;
    s.packs += 1;
    saveState(s);
    try {
      var list = creditedList();
      list.push(hash);
      localStorage.setItem("wc_pay_credited_v1", JSON.stringify(list));
    } catch (e) {}
    return Promise.resolve(remaining());
  }

  return {
    sha256: sha256,
    remaining: remaining,
    canUse: canUse,
    consume: consume,
    activate: activate,
    credit: credit,
    normalizeCode: normalizeCode,
    _loadState: loadState
  };
})();

// ============================================================
// 云端自动发码 — 虎皮椒下单 + 轮询订单 + 自动入账
// 依赖 cloud/pay-function.js 部署后的访问地址
// ============================================================
var PayCloud = (function () {
  "use strict";

  var ORDERS_KEY = "wc_pay_last_orders_v1"; // 最多存最近 10 个订单号
  var POLL_MS = 3000;
  var POLL_MAX = 200; // 约 10 分钟

  function endpoint() {
    var e = PAY_CONFIG.cloudEndpoint || "";
    return e ? String(e).replace(/\/+$/, "") : "";
  }

  function enabled() { return !!endpoint() && typeof fetch === "function"; }

  function genOrderId() {
    var t = Date.now().toString(36);
    var r = Math.random().toString(36).slice(2, 8);
    return "WC" + t + "-" + r;
  }

  function rememberOrder(orderId) {
    try {
      var list = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
      list.unshift({ orderId: orderId, at: Date.now() });
      localStorage.setItem(ORDERS_KEY, JSON.stringify(list.slice(0, 10)));
    } catch (e) {}
  }

  function lastOrder() {
    try {
      var list = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
      var o = list[0];
      return (o && o.orderId) ? o.orderId : null;
    } catch (e) { return null; }
  }

  // 下单：返回 Promise<{orderId, urlQrcode, url}>
  function createOrder() {
    var orderId = genOrderId();
    return fetch(endpoint() + "/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: orderId })
    }).then(function (res) {
      if (!res.ok) throw new Error("下单请求失败（" + res.status + "）");
      return res.json();
    }).then(function (data) {
      if (!data.ok) throw new Error(data.error || "下单失败，请稍后重试");
      rememberOrder(orderId);
      return { orderId: orderId, urlQrcode: data.urlQrcode || "", url: data.url || "" };
    });
  }

  // 查询单次：返回 Promise<{status, code?}>
  function fetchStatus(orderId) {
    return fetch(endpoint() + "/status?orderId=" + encodeURIComponent(orderId) + "&t=" + Date.now())
      .then(function (res) {
        if (!res.ok) throw new Error("查询失败（" + res.status + "）");
        return res.json();
      }).then(function (data) {
        if (!data.ok) throw new Error(data.error || "查询失败");
        return { status: data.status, code: data.code || null, orderId: orderId };
      });
  }

  // 轮询直到支付成功：onTick(statusObj) 每次回调，onDone(data) 成功回调
  // 返回 stop 函数
  function pollUntilPaid(orderId, onTick, onDone, onError) {
    var n = 0;
    var stopped = false;
    var timer = null;
    function tick() {
      if (stopped) return;
      n++;
      fetchStatus(orderId).then(function (d) {
        if (stopped) return;
        if (typeof onTick === "function") onTick(d, n);
        if (d.status === "paid" && d.code) {
          stopped = true;
          if (typeof onDone === "function") onDone(d);
          return;
        }
        if (n >= POLL_MAX) {
          stopped = true;
          if (typeof onError === "function") onError(new Error("等待超时，请点击「查询支付状态」重试"));
          return;
        }
        timer = setTimeout(tick, POLL_MS);
      }).catch(function (e) {
        if (stopped) return;
        if (n >= POLL_MAX) { if (typeof onError === "function") onError(e); return; }
        timer = setTimeout(tick, POLL_MS * 2); // 网络抖动退避
      });
    }
    timer = setTimeout(tick, 1500);
    return function stop() {
      stopped = true;
      if (timer) clearTimeout(timer);
    };
  }

  return {
    enabled: enabled,
    createOrder: createOrder,
    fetchStatus: fetchStatus,
    pollUntilPaid: pollUntilPaid,
    lastOrder: lastOrder
  };
})();
