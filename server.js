// ============================================================
//  静态文件 + DeepSeek API 代理服务器
//  同一端口，浏览器直调 /api/deepseek/v1 → 无 CORS 问题
// ============================================================
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = 8765;
const ROOT = __dirname;
const DEEPSEEK_BASE = "https://api.deepseek.com";

// MIME types for static files
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff"
};

const server = http.createServer(function (req, res) {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  // ---- proxy: /api/deepseek/v1/chat/completions ----
  if (pathname === "/api/deepseek/v1/chat/completions" && req.method === "POST") {
    return proxyDeepSeek(req, res);
  }

  // ---- static files ----
  let filePath = path.join(ROOT, pathname === "/" ? "index.html" : pathname.replace(/^\/+/, ""));
  // Security: prevent directory traversal
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); res.end("Forbidden"); return; }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || "application/octet-stream";

  fs.readFile(filePath, function (err, data) {
    if (err) {
      if (err.code === "ENOENT") {
        // SPA fallback: serve index.html for unknown paths
        fs.readFile(path.join(ROOT, "index.html"), function (err2, fallback) {
          if (err2) { res.writeHead(404); res.end("Not Found"); return; }
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(fallback);
        });
        return;
      }
      res.writeHead(500);
      res.end("Internal Server Error");
      return;
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

function proxyDeepSeek(req, res) {
  let body = "";
  req.on("data", function (chunk) { body += chunk; });
  req.on("end", function () {
    console.log("[proxy] forwarding request, body length:", body.length, "auth:", req.headers["authorization"] ? "present" : "missing");
    const options = {
      hostname: "api.deepseek.com",
      port: 443,
      path: "/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": req.headers["authorization"] || "",
        "Content-Length": Buffer.byteLength(body)
      }
    };

    const proxy = https.request(options, function (proxyRes) {
      res.writeHead(proxyRes.statusCode, {
        "Content-Type": proxyRes.headers["content-type"] || "application/json",
        "Access-Control-Allow-Origin": "*"
      });
      proxyRes.pipe(res);
    });

    proxy.on("error", function (e) {
      console.error("[proxy error]", e.message, e.stack);
      res.writeHead(502);
      res.end(JSON.stringify({ error: "Bad Gateway: " + e.message }));
    });

    proxy.write(body);
    proxy.end();
  });
}

server.listen(PORT, function () {
  console.log("写作批改 服务已启动 → http://localhost:" + PORT);
  console.log("API 代理: POST /api/deepseek/v1/chat/completions → api.deepseek.com");
});
