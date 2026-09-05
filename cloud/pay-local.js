// ============================================================
//  本地联调服务器 — mock 虎皮椒 + 复用 pay-function 核心逻辑
// ------------------------------------------------------------
//  用法：
//    1) 准备环境变量（可用 cloud/.env.local，见 DEPLOY.md）：
//       XHP_APPID/XHP_APPSECRET（本地可随意填，如 test/test-secret）
//       GH_TOKEN、CODES_JSON（建议用 TEST 开头的测试码）
//       PAY_SECRET、ALLOW_ORIGIN=http://localhost:8765
//    2) node cloud/pay-local.js
//    3) curl http://localhost:8788/order -d '{"orderId":"TEST-xxx1"}'
//    4) curl http://localhost:8788/mock/notify -d '{"orderId":"TEST-xxx1"}'
//       （模拟虎皮椒支付成功回调，真实签名）
//    5) curl "http://localhost:8788/status?orderId=TEST-xxx1" → 返回激活码
// ============================================================

"use strict";

const fs = require("fs");
const path = require("path");
const http = require("http");
const crypto = require("crypto");

// ---- 加载 cloud/.env.local（存在则注入，不覆盖已有环境变量）----
(function loadEnvLocal() {
  const p = path.join(__dirname, ".env.local");
  if (!fs.existsSync(p)) return;
  fs.readFileSync(p, "utf8").split("\n").forEach(line => {
    line = line.trim();
    if (!line || line.startsWith("#")) return;
    const i = line.indexOf("=");
    if (i < 0) return;
    const k = line.slice(0, i).trim();
    const v = line.slice(i + 1).trim();
    if (!(k in process.env)) process.env[k] = v;
  });
})();

// ---- mock 虎皮椒：拦截全局 fetch ----
const REAL_FETCH = globalThis.fetch;
const MOCK_SECRET = process.env.XHP_APPSECRET || "test-secret";

globalThis.fetch = async function (url, opts) {
  const s = String(url);
  if (s.indexOf("api.xunhupay.com") !== -1 && s.indexOf("/payment/do.html") !== -1) {
    const body = JSON.parse(opts.body);
    const resp = {
      openid: "2019081202",
      url_qrcode: "https://mock.local/qr/test-" + body.trade_order_id + ".png",
      url: "https://mock.local/pay/" + body.trade_order_id,
      errcode: 0,
      errmsg: "success!"
    };
    resp.hash = xhpHashLocal(resp, MOCK_SECRET);
    return mockResponse(200, JSON.stringify(resp));
  }
  if (s.indexOf("api.xunhupay.com") !== -1 && s.indexOf("/payment/query.html") !== -1) {
    return mockResponse(200, JSON.stringify({
      errcode: 0, errmsg: "success!",
      data: { status: "OD", out_trade_order: "mock" }
    }));
  }
  return REAL_FETCH.apply(this, arguments);
};

function xhpHashLocal(params, secret) {
  const keys = Object.keys(params)
    .filter(k => k !== "hash" && params[k] !== "" && params[k] !== undefined && params[k] !== null)
    .sort();
  const str = keys.map(k => k + "=" + params[k]).join("&") + secret;
  return crypto.createHash("md5").update(str, "utf8").digest("hex");
}

function mockResponse(status, body) {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status: status,
    statusText: String(status),
    json: () => Promise.resolve(JSON.parse(body)),
    text: () => Promise.resolve(body),
    headers: new Map()
  });
}

// ---- 引入云函数核心 ----
const payFn = require("./pay-function.js");
const handle = payFn._handle;

const PORT = Number(process.env.LOCAL_PORT || 8788);

const server = http.createServer(async function (req, res) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const bodyRaw = Buffer.concat(chunks).toString("utf8");
  const u = new URL(req.url, "http://localhost");
  const query = {};
  u.searchParams.forEach((v, k) => { query[k] = v; });
  const headers = {};
  Object.keys(req.headers).forEach(k => { headers[k.toLowerCase()] = req.headers[k]; });

  // ---- mock：模拟虎皮椒支付成功回调（真实签名）----
  if (u.pathname === "/mock/notify" && req.method === "POST") {
    let orderId = "";
    try { orderId = String(JSON.parse(bodyRaw || "{}").orderId || ""); } catch (e) {}
    if (!/^[A-Za-z0-9_-]{6,64}$/.test(orderId)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: false, error: "orderId 格式不对" }));
      return;
    }
    const form = {
      trade_order_id: orderId,
      total_fee: payFn._CFG.amount,
      transaction_id: "MOCKTX" + Date.now(),
      open_order_id: "MOCKOPEN" + Date.now(),
      order_title: payFn._CFG.title,
      status: "OD",
      appid: payFn._CFG.appid,
      time: String(Math.floor(Date.now() / 1000)),
      nonce_str: crypto.randomBytes(8).toString("hex")
    };
    form.hash = xhpHashLocal(form, MOCK_SECRET);
    const encoded = Object.keys(form).map(k => k + "=" + encodeURIComponent(form[k])).join("&");
    const r = await handle("POST", "/notify", {}, headers, encoded);
    res.writeHead(r.status, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ mocked: "notify", orderId: orderId, gatewayReply: r.body }));
    return;
  }

  const r = await handle(req.method, u.pathname, query, headers, bodyRaw);
  res.writeHead(r.status, r.headers);
  res.end(r.body);
});

server.listen(PORT, function () {
  console.log("pay-local 联调服务已启动 → http://localhost:" + PORT);
  console.log("  POST /order        {orderId}          下单（mock 虎皮椒）");
  console.log("  POST /mock/notify  {orderId}          模拟支付成功回调");
  console.log("  GET  /status?orderId=...              查询订单/取码");
  console.log("  码池数量: " + payFn._CFG.codes.length + "，GitHub: " + payFn._CFG.ghOwner + "/" + payFn._CFG.ghRepo);
});
