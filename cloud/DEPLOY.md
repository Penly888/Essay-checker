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

### 腾讯云 SCF 部署（已选定）

> SCF 单函数环境变量总大小上限 4KB，500 个码的 CODES_JSON 放不下，
> 码池改为 `cloud/codes.json` **随函数包一起部署**（函数代码私有不可下载，安全）。

1. 打开 https://console.cloud.tencent.com/scf → 函数服务 → **新建**
2. 创建方式：**自定义创建**
   - 函数名称：`essay-pay`；地域：广州/上海任意
   - 运行环境：**Nodejs18.15**（或 20）
   - 内存：128MB；执行超时：**60 秒**（下单调虎皮椒 + 回调写 GitHub，留余量）
   - 提交方法：**本地上传 zip 包** → 选 `cloud/scf-deploy.zip`
     （zip 内含 pay-function.js + codes.json 两个文件，平级无目录）
3. 高级配置 → 环境变量，逐个添加（值见 `cloud/.env.production`）：

   | 变量 | 值 |
   |---|---|
   | `XHP_APPID` | 虎皮椒 appid |
   | `XHP_APPSECRET` | 虎皮椒 appsecret（保密） |
   | `GH_TOKEN` | essay-shared 写权限 token |
   | `PAY_SECRET` | 32+ 位随机串（保密，加密订单里的激活码） |
   | `SITE_URL` | `https://www.shinewood.top/` |
   | `ALLOW_ORIGIN` | `https://www.shinewood.top` |

   （PAY_AMOUNT/PAY_TITLE/GH_OWNER/GH_REPO/GH_BRANCH 有默认值，可不填）
4. 函数代码确认入口：**函数管理 → 函数代码 → 配置**，
   执行函数改为 `pay-function.main_handler`（默认 index.main_handler 是错的）
5. 创建函数后：**函数管理 → 触发器（或"函数 URL"）** →
   新建触发器 → 选 **函数 URL / API 网关触发器**，认证方式选**免鉴权**，
   **勾选"集成响应"**（必须勾，否则浏览器收到的是 JSON 包裹层而非真实 HTTP 响应）
6. 复制生成的 URL（形如 `https://xxx-xxx.apigw.tencentcs.com/api/xxx`
   或 `https://xxx.tencentscf.com/`），浏览器访问 `<URL>/health` 返回 `ok` 即成功

### 阿里云 FC 3.0 部署（备选）

1. 注册阿里云账号，开通函数计算（搜索"函数计算"，开通按量付费，有免费额度）
2. 控制台 → 函数计算 → 创建函数：
   - 运行环境：Node.js 18+；请求处理程序类型：**处理 HTTP 请求**
   - 代码：zip 上传（pay-function.js + codes.json）
3. 触发器/访问地址：使用默认公网访问地址（形如 `https://xxxxxx.cn-hangzhou.fcapp.app`）
4. 环境变量同上表；验证 `<地址>/health` 返回 `ok`

## 码池 cloud/codes.json（明文码池，已 gitignore）

```bash
cd /Users/penly/WorkBuddy/写作批改
# 从明文码表重新生成（自动排除带「已用」标记的人工发码）
node -e "
const fs=require('fs');
const lines=fs.readFileSync('/Users/penly/Desktop/essay-codes-batch1-500.txt','utf8').split('\n').map(s=>s.trim()).filter(Boolean);
const all=lines.filter(l=>/^EC-[A-Z0-9]{5}-[A-Z0-9]{5}$/.test(l));
fs.writeFileSync('cloud/codes.json',JSON.stringify(all));
console.log(all.length+' codes');
"
# 重打部署包
cd cloud && zip -j scf-deploy.zip pay-function.js codes.json
```

> 码池发完（499 个全卖完）后：生成新批次码+哈希（js/pay-codes.js）→
> 重建 codes.json → 重新上传 zip 即可。人工发过的码保留 used 标记（已自动排除）。

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
