// ============================================================
//  支付云函数 — 虎皮椒自动发码（无状态单文件）
// ------------------------------------------------------------
//  职责：
//    POST /order?orderId=xxx   签名下单，返回虎皮椒支付二维码
//    POST /notify              虎皮椒回调：验签 → 发码 → success
//    GET  /status?orderId=xxx  查询订单（已支付则解密返回激活码）
//    GET  /health              健康检查
//
//  数据流（复用 essay-shared 仓库，零数据库）：
//    - data/used/<sha256>.json   激活码已用标记（422=已用，防重发）
//    - data/orders/<orderId>.json 订单状态（激活码 AES 加密存放，
//      公开仓库不暴露明文码）
//
//  环境变量（全部必填项见 DEPLOY.md）：
//    XHP_APPID / XHP_APPSECRET  虎皮椒支付渠道凭证
//    GH_TOKEN                    essay-shared 写权限 token
//    CODES_JSON                  明文激活码 JSON 数组
//    PAY_SECRET                  32+ 位随机串，用于加密订单里的激活码
//    可选: PAY_AMOUNT(9.90) PAY_TITLE GH_OWNER(Penly888)
//          GH_REPO(essay-shared) GH_BRANCH(main) SITE_URL ALLOW_ORIGIN
//
//  部署：阿里云函数计算 FC 3.0（Web Handler）或腾讯云云函数 SCF，
//        均以 HTTP 触发器暴露，见 cloud/DEPLOY.md
// ============================================================

"use strict";

const crypto = require("crypto");

// ---------------- 配置 ----------------
const CFG = {
  appid: process.env.XHP_APPID || "",
  appsecret: process.env.XHP_APPSECRET || "",
  ghToken: process.env.GH_TOKEN || "",
  codes: parseCodes(process.env.CODES_JSON || ""),
  paySecret: process.env.PAY_SECRET || "",
  amount: process.env.PAY_AMOUNT || "9.90",
  title: process.env.PAY_TITLE || "AI写作批改-10次",
  ghOwner: process.env.GH_OWNER || "Penly888",
  ghRepo: process.env.GH_REPO || "essay-shared",
  ghBranch: process.env.GH_BRANCH || "main",
  siteUrl: process.env.SITE_URL || "https://penly888.github.io/Essay-checker/",
  allowOrigin: process.env.ALLOW_ORIGIN || "https://penly888.github.io",
  xhpDo: "https://api.xunhupay.com/payment/do.html",
  usedDir: "data/used",
  ordersDir: "data/orders"
};

function parseCodes(raw) {
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter(c => /^EC-[A-Z0-9]{5}-[A-Z0-9]{5}$/.test(c)) : [];
  } catch (e) { return []; }
}

// ---------------- 虎皮椒签名 ----------------
// 排序 k=v&… 拼接 + appsecret → MD5 小写；空值与 hash 不参与
function xhpHash(params, secret) {
  const keys = Object.keys(params)
    .filter(k => k !== "hash" && params[k] !== "" && params[k] !== undefined && params[k] !== null)
    .sort();
  const s = keys.map(k => k + "=" + params[k]).join("&") + secret;
  return crypto.createHash("md5").update(s, "utf8").digest("hex");
}

function nonce() { return crypto.randomBytes(8).toString("hex"); }

// ---------------- AES-256-GCM 加解密（订单内激活码）----------------
function encryptCode(code) {
  const key = crypto.createHash("sha256").update(CFG.paySecret).digest();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const enc = Buffer.concat([cipher.update(code, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv, tag, enc].map(b => b.toString("base64")).join(".");
}

function decryptCode(payload) {
  try {
    const parts = String(payload || "").split(".");
    if (parts.length !== 3) return null;
    const key = crypto.createHash("sha256").update(CFG.paySecret).digest();
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(parts[0], "base64"));
    decipher.setAuthTag(Buffer.from(parts[1], "base64"));
    const dec = Buffer.concat([decipher.update(Buffer.from(parts[2], "base64")), decipher.final()]);
    const code = dec.toString("utf8");
    return /^EC-[A-Z0-9]{5}-[A-Z0-9]{5}$/.test(code) ? code : null;
  } catch (e) { return null; }
}

// ---------------- GitHub Contents API ----------------
const GH_API = "https://api.github.com/repos/" + CFG.ghOwner + "/" + CFG.ghRepo + "/contents/";

function ghHeaders() {
  return {
    "Accept": "application/vnd.github+json",
    "Authorization": "Bearer " + CFG.ghToken,
    "User-Agent": "essay-pay-function",
    "Content-Type": "application/json"
  };
}

async function withRetry(fn, tries) {
  let lastErr;
  for (let i = 0; i < (tries || 2); i++) {
    try { return await fn(); }
    catch (e) { lastErr = e; if (i < (tries || 2) - 1) await sleep(500); }
  }
  throw lastErr;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// PUT 文件。返回 {ok} / {conflict:true}（422 已存在）/ {error}
async function ghPut(path, message, obj) {
  const body = JSON.stringify({
    message: message,
    branch: CFG.ghBranch,
    content: Buffer.from(JSON.stringify(obj)).toString("base64")
  });
  const res = await withRetry(() => fetch(GH_API + path, { method: "PUT", headers: ghHeaders(), body }));
  if (res.ok) return { ok: true };
  if (res.status === 422) return { conflict: true };
  return { error: "PUT " + path + " 失败(" + res.status + ")" };
}

// PUT 已存在文件（带 sha 覆盖）
async function ghPutWithSha(path, message, obj, sha) {
  const body = JSON.stringify({
    message: message,
    branch: CFG.ghBranch,
    content: Buffer.from(JSON.stringify(obj)).toString("base64"),
    sha: sha
  });
  const res = await withRetry(() => fetch(GH_API + path, { method: "PUT", headers: ghHeaders(), body }));
  if (res.ok) return { ok: true };
  return { error: "PUT " + path + " 失败(" + res.status + ")" };
}

// GET 文件。返回 {obj, sha} / null(404) / {error}
async function ghGet(path) {
  const res = await withRetry(() => fetch(GH_API + path + "?ref=" + CFG.ghBranch + "&t=" + Date.now(), { headers: ghHeaders() }));
  if (res.status === 404) return null;
  if (!res.ok) return { error: "GET " + path + " 失败(" + res.status + ")" };
  try {
    const j = await res.json();
    const obj = JSON.parse(Buffer.from(j.content, "base64").toString("utf8"));
    return { obj: obj, sha: j.sha };
  } catch (e) { return { error: "解析 " + path + " 失败" }; }
}

// ---------------- 发码核心 ----------------
async function deliverCode(orderId, txInfo) {
  // 1. 幂等：已发过直接成功
  const existing = await ghGet(orderPath(orderId));
  if (existing && existing.obj && existing.obj.status === "paid") return { ok: true, code: decryptCode(existing.obj.enc) };

  // 2. 从码池随机取码，靠 used 标记排重（422=已被用过→换一个）
  if (!CFG.codes.length) return { error: "码池为空" };
  const pool = CFG.codes.slice();
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  let delivered = null;
  for (const code of pool.slice(0, 50)) {
    const hash = crypto.createHash("sha256").update(code).digest("hex");
    const mark = await ghPut(CFG.usedDir + "/" + hash + ".json", "code used: " + hash.slice(0, 8), { usedAt: new Date().toISOString(), orderId: orderId });
    if (mark.ok) { delivered = code; break; }
    if (mark.error) return mark; // 网络问题 → 回调重试
    // conflict → 该码已被用过，换下一个
  }
  if (!delivered) return { error: "码池已耗尽" };

  // 3. 写订单（激活码 AES 加密，公开仓库不暴露明文）
  const orderData = {
    status: "paid",
    enc: encryptCode(delivered),
    claimed: false,
    totalFee: String(txInfo.total_fee || ""),
    transactionId: String(txInfo.transaction_id || ""),
    openOrderId: String(txInfo.open_order_id || ""),
    paidAt: new Date().toISOString()
  };
  const put = await ghPut(orderPath(orderId), "order paid: " + orderId, orderData);
  if (!put.ok) return put.error ? put : { error: "订单写入失败" };
  return { ok: true, code: delivered };
}

function orderPath(orderId) { return CFG.ordersDir + "/" + orderId + ".json"; }

// ---------------- 各端点处理 ----------------
// 统一入口：返回 {status, type, body}
async function handle(method, path, query, headers, bodyRaw) {
  const origin = headers["origin"] || "";
  const cors = (origin === CFG.allowOrigin) ? { "Access-Control-Allow-Origin": origin } : {};
  const baseHeaders = Object.assign({ "Content-Type": "application/json; charset=utf-8" }, cors);

  // CORS 预检
  if (method === "OPTIONS") return { status: 204, headers: Object.assign({}, baseHeaders, { "Access-Control-Allow-Methods": "GET,POST,OPTIONS", "Access-Control-Allow-Headers": "Content-Type" }), body: "" };

  if (path === "/health") return { status: 200, headers: baseHeaders, body: "ok" };

  // ---- 下单 ----
  if (path === "/order" && method === "POST") {
    if (!CFG.appid || !CFG.appsecret) return json(500, baseHeaders, { ok: false, error: "支付通道未配置" });
    let orderId = "";
    try { orderId = String((JSON.parse(bodyRaw || "{}").orderId) || ""); } catch (e) {}
    if (!/^[A-Za-z0-9_-]{6,64}$/.test(orderId)) return json(400, baseHeaders, { ok: false, error: "订单号格式不对" });
    if (!rateAllow(clientIp(headers))) return json(429, baseHeaders, { ok: false, error: "请求太频繁，请稍后再试" });

    const notifyUrl = publicBaseUrl(headers) + "/notify";
    const params = {
      version: "1.1",
      appid: CFG.appid,
      trade_order_id: orderId,
      total_fee: CFG.amount,
      title: CFG.title,
      time: String(Math.floor(Date.now() / 1000)),
      notify_url: notifyUrl,
      return_url: CFG.siteUrl,
      callback_url: CFG.siteUrl,
      nonce_str: nonce()
    };
    params.hash = xhpHash(params, CFG.appsecret);

    let resp;
    try {
      resp = await withRetry(() => fetch(CFG.xhpDo, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
      }), 2);
    } catch (e) { return json(502, baseHeaders, { ok: false, error: "支付网关连接失败，请重试" }); }
    const data = await resp.json().catch(() => ({}));
    // 验签返回
    const respHash = data.hash;
    if (!respHash || xhpHash(data, CFG.appsecret) !== respHash) {
      return json(502, baseHeaders, { ok: false, error: "支付网关响应验签失败" });
    }
    if (data.errcode !== 0) {
      return json(502, baseHeaders, { ok: false, error: "下单失败(" + data.errcode + ") " + (data.errmsg || "") });
    }
    return json(200, baseHeaders, { ok: true, orderId: orderId, urlQrcode: data.url_qrcode || "", url: data.url || "" });
  }

  // ---- 虎皮椒回调 ----
  if (path === "/notify" && method === "POST") {
    const form = parseForm(bodyRaw);
    const theirHash = form.hash;
    if (!theirHash || xhpHash(form, CFG.appsecret) !== theirHash) return { status: 200, headers: { "Content-Type": "text/plain" }, body: "fail" };
    if (form.status !== "OD") return { status: 200, headers: { "Content-Type": "text/plain" }, body: "success" }; // 退款等状态不处理
    const orderId = String(form.trade_order_id || "");
    if (!/^[A-Za-z0-9_-]{6,64}$/.test(orderId) || !CFG.codes.length) return { status: 200, headers: { "Content-Type": "text/plain" }, body: "success" };
    const r = await deliverCode(orderId, form);
    // 发码成功才回 success；失败回非 success，虎皮椒会重试 6 次
    return { status: 200, headers: { "Content-Type": "text/plain" }, body: r.ok ? "success" : "fail" };
  }

  // ---- 订单状态查询 ----
  if (path === "/status" && method === "GET") {
    const orderId = String((query && query.orderId) || "");
    if (!/^[A-Za-z0-9_-]{6,64}$/.test(orderId)) return json(400, baseHeaders, { ok: false, error: "订单号格式不对" });
    const got = await ghGet(orderPath(orderId));
    if (got && got.error) return json(502, baseHeaders, { ok: false, error: "订单查询失败，请重试" });
    if (!got) return json(200, baseHeaders, { ok: true, status: "created" });
    const o = got.obj;
    if (o.status !== "paid") return json(200, baseHeaders, { ok: true, status: o.status || "created" });
    const code = decryptCode(o.enc);
    if (!code) return json(500, baseHeaders, { ok: false, error: "订单数据异常" });
    // 首次查询标记 claimed（尽力而为，失败不影响返回）
    if (!o.claimed) {
      ghPutWithSha(orderPath(orderId), "order claimed: " + orderId, Object.assign({}, o, { claimed: true }), got.sha).catch(() => {});
    }
    return json(200, baseHeaders, { ok: true, status: "paid", code: code, orderId: orderId });
  }

  return json(404, baseHeaders, { ok: false, error: "not found" });

  function json(status, h, obj) { return { status: status, headers: h, body: JSON.stringify(obj) }; }
}

function parseForm(raw) {
  const out = {};
  String(raw || "").split("&").forEach(pair => {
    if (!pair) return;
    const i = pair.indexOf("=");
    if (i < 0) return;
    const k = pair.slice(0, i);
    const v = decodeURIComponent(pair.slice(i + 1).replace(/\+/g, "%20"));
    if (v !== "") out[k] = v;
  });
  return out;
}

// ---- 限流（实例内存级，防刷即可）----
const rateMap = {};
function rateAllow(ip) {
  const now = Date.now();
  const win = 60 * 60 * 1000;
  const r = rateMap[ip];
  if (r && now - r.start < win) {
    if (r.n >= 20) return false;
    r.n++;
  } else {
    rateMap[ip] = { start: now, n: 1 };
  }
  return true;
}
function clientIp(headers) {
  return String(headers["x-forwarded-for"] || headers["x-real-ip"] || "").split(",")[0].trim() || "unknown";
}
function publicBaseUrl(headers) {
  const host = headers["host"] || "";
  if (!host) return "";
  const proto = headers["x-forwarded-proto"] || "https";
  return proto + "://" + host;
}

// ============================================================
//  平台适配层
// ============================================================

// ---- 阿里云函数计算 FC 3.0（Web Handler: exports.handler）----
async function aliHandler(req, res) {
  try {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const bodyRaw = Buffer.concat(chunks).toString("utf8");
    const u = new URL(req.url, "http://localhost");
    const query = {};
    u.searchParams.forEach((v, k) => { query[k] = v; });
    const r = await handle(req.method, u.pathname, query, req.headers, bodyRaw);
    res.writeHead(r.status, r.headers);
    res.end(r.body);
  } catch (e) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: false, error: String(e && e.message) }));
  }
}

// ---- 腾讯云云函数 SCF（API 网关触发）----
async function tencentHandler(event) {
  try {
    const bodyRaw = (event.isBase64Encoded && event.body) ? Buffer.from(event.body, "base64").toString("utf8") : String(event.body || "");
    const query = {};
    Object.keys(event.queryString || {}).forEach(k => { query[k] = event.queryString[k]; });
    const headers = {};
    Object.keys(event.headers || {}).forEach(k => { headers[String(k).toLowerCase()] = event.headers[k]; });
    const r = await handle(event.httpMethod, event.path, query, headers, bodyRaw);
    return { isBase64Encoded: false, statusCode: r.status, headers: r.headers, body: r.body };
  } catch (e) {
    return { isBase64Encoded: false, statusCode: 500, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ok: false, error: String(e && e.message) }) };
  }
}

exports.handler = aliHandler;                 // 阿里云 FC 3.0
exports.main_handler = tencentHandler;        // 腾讯云 SCF
exports._handle = handle;                     // 本地测试/自定义运行时复用
exports._CFG = CFG;
