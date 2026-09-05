# 自动发码支付 — 部署指南

> 目标：用户扫码付款（虎皮椒）→ 云函数收到回调 → 自动发激活码 → 前端自动入账。
> 全程无需加微信。上线前网站保持「人工发码」兜底模式不受影响。

## 架构

```
浏览器(静态站 GitHub Pages)
  │ ① 点购买 → POST 云函数 /order（签名下单）
  │ ② 展示虎皮椒返回的支付二维码 url_qrcode
  │ ④ 每 3 秒轮询 GET 云函数 /status
  ▼
云函数 cloud/pay-function.js（阿里云FC / 腾讯云SCF）
  │ ③ 虎皮椒支付成功 → POST 云函数 /notify（MD5 验签）
  │    → 从码池取码 → 登记 used → 订单写入（AES 加密存码）
  │ ⑤ /status 解密返回激活码 → 前端 PayGate.credit() 自动入账
  ▼
GitHub 仓库 essay-shared（零数据库）
  data/used/<sha256>.json    激活码已用标记
  data/orders/<orderId>.json 订单状态（码加密存放，公库不泄露）
```

## 第一步：注册虎皮椒（约 30 分钟，人工步骤）

1. 打开 https://admin.xunhupay.com/sign-up.html 注册账号
2. 提交商户资料（**微信支付渠道，开户费约 ¥118-198**）：
   - 身份证、手机号、本人银行卡（微信需已绑卡）
   - 网站：`https://penly888.github.io/Essay-checker/`
   - 网站需有客服联系方式（页脚已有微信 1059398048，满足要求）
3. 用本人微信扫码完成微信支付签约，等待官方审核（最快 10 分钟）
4. 审核通过后，进入「支付渠道管理 → 我的支付渠道」，拿到 **appid** 和 **appsecret**

> 注意：虎皮椒 2025-11 起关闭了微信内唤起支付。PC/手机浏览器扫码支付正常；
> 用户在微信里直接打开网站时，页面会提示走浏览器打开。支付宝渠道以后可再开通（另收费）。

## 第二步：部署云函数

推荐 **阿里云函数计算 FC**（有每月免费额度，低流量基本 0 成本），
腾讯云 SCF 也可以（低流量每月几毛钱）。

### 阿里云 FC 3.0 部署（推荐）

1. 注册阿里云账号，开通函数计算（搜索"函数计算"，开通按量付费，有免费额度）
2. 控制台 → 函数计算 → 创建函数：
   - 运行环境：Node.js 18+；请求处理程序类型：**处理 HTTP 请求**
   - 代码：把 `cloud/pay-function.js` 的内容粘贴进去（单文件，无依赖）
3. 触发器/访问地址：函数详情 → 配置 → 触发器，使用默认的公网访问地址
   （形如 `https://xxxxxx.cn-hangzhou.fcapp.app`），记下来
4. 环境变量（函数配置 → 环境变量）逐个添加：

| 变量 | 值 | 说明 |
|---|---|---|
| `XHP_APPID` | 虎皮椒 appid | 第一步拿到 |
| `XHP_APPSECRET` | 虎皮椒 appsecret | 第一步拿到，**保密** |
| `GH_TOKEN` | `js/shared.js` 里拼出来的 token | essay-shared 写权限 |
| `CODES_JSON` | 见下方生成命令 | **明文码池** |
| `PAY_SECRET` | 任意 32+ 位随机串 | 加密订单里的激活码，**保密** |
| `ALLOW_ORIGIN` | `https://penly888.github.io` | CORS |
| `PAY_AMOUNT` | `9.90` | 可选，默认 9.90 |
| `PAY_TITLE` | `AI写作批改-10次` | 可选 |

5. 验证：浏览器打开 `https://<函数地址>/health`，返回 `ok` 即部署成功

### 腾讯云 SCF 部署（备选）

控制台 → 云函数 → 新建（Node.js 18+，HTTP 触发器，集成响应），
粘贴 `cloud/pay-function.js`，配同样环境变量，使用 API 网关默认域名。

## 第三步：生成 CODES_JSON（明文码池）

```bash
cd /Users/penly/WorkBuddy/写作批改
node -e "console.log(JSON.stringify(require('fs').readFileSync('/Users/penly/WorkBuddy/essay-codes-batch1-500.txt','utf8').trim().split('\n')))"
```

输出形如 `["EC-52T23-7U2R7","EC-..."]`，整段填入 `CODES_JSON` 环境变量。

> 码池发完后（500 个全卖完），生成新批次码 + 哈希（js/pay-codes.js），
> 更新码池环境变量即可。人工发过的码要保留在 used 目录（已自动标记，无需处理）。

## 第四步：联调验证（可选，5 分钟）

```bash
# 用测试码本地跑通全流程（不影响真实码池）
cp cloud/.env.local cloud/.env.local.bak   # 编辑为测试值
node cloud/pay-local.js
# 另开终端：
curl -X POST http://localhost:8788/order -d '{"orderId":"TEST-abc123"}'
curl -X POST http://localhost:8788/mock/notify -d '{"orderId":"TEST-abc123"}'
curl "http://localhost:8788/status?orderId=TEST-abc123"   # 应返回 paid + 激活码
```

## 第五步：上线切换

部署好云函数后，只改一处：`js/pay.js`

```js
cloudEndpoint: "https://xxxxxx.cn-hangzhou.fcapp.app"
```

提交推送即生效。充值弹窗自动切换为「扫码支付 → 自动激活」模式；
留空则回退「收款码 + 人工发码」模式（两者共用同一套激活码和已用标记）。

建议真实支付 ¥0.1 或 ¥9.9 自测一单（虎皮椒后台可退款，退款回调不会回收次数）。

## 记账对账

- 每笔订单：`essay-shared/data/orders/<orderId>.json`（含金额、交易号、时间、claimed）
- 每个已发码：`essay-shared/data/used/<hash>.json`（含 orderId）
- 虎皮椒后台可查全部交易和 D+1 结算流水

## 已知边界

- 前端门控可被技术用户绕过（静态站固有局限，防君子不防小人）
- 回调依赖 GitHub API，若 GitHub 抖动，虎皮椒会自动重试 6 次
- 订单里的激活码用 PAY_SECRET AES 加密，公开仓库不泄露明文
- 若用户付完款但页面关闭，重新打开网站点「查询支付状态」即可取码入账
