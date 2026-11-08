# 进度存档（供下次继续）

> 最后更新：2026-11-05 22:40 · 第 0–5 步完成（23 个文件已在 GitHub）；第 6 步卡在 github.com 连接被重置

## 已完成

- **第 0 步**：信息收集完成（姓名/学校/定位/技能/证书/邮箱/风格/头像）
- **第 1 步**：栏目与文案确认（4 栏 + 404，中文为主、英文仅作 kicker，不做 `/en`）
- **第 2 步**：Astro 静态站搭好，`npm run build` 通过，8 个页面
- **第 3 步**：SiteHub 无文档 → 仅留 `.env.example` 空占位，未接入、未编造
- **第 4 步**：本地 200/404/sitemap/robots/canonical 检查通过

## 关键决策（不要推翻）

| 项 | 值 |
|---|---|
| 站点地址（临时） | `https://songziduo.pages.dev`，写在 `astro.config.mjs` 的 `site` |
| 域名 | 暂无，先用 pages.dev；换域名只改 `site` + `public/robots.txt` 的 Sitemap 行 |
| 作品数量 | 2 个（AdSkip、时间折叠），03 已由本人取消 |
| 语言 | 中文主、英文副；不建 `/en` 路由 |
| noindex | 只有 `/404.html` 是 `noindex, follow`，其余全 `index, follow` |
| 头像 | `public/avatar.jpg`（720×720，冷调处理过）；原图在 DSH attachment |
| OG 图 | `public/og.png`，由 `scripts/make-assets.py` 生成 |

## 仓库状态

- GitHub 用户名：`szd-n`
- 本地仓库：`songziduo-site/.git`，分支 `main`
- 首次 commit：`c1f2edb`（23 个文件，7226 行）
- 远端：已建并推送，`https://github.com/szd-n/songziduo-site`（main = `f2635f7`，23 个文件）
- 本机没有 `gh` CLI；`git` 也不在系统 PATH（只有 GitHub Desktop 自带一份）
- **认证问题**：GCM（helper-selector → manager）在非交互环境里读不到密码，`git push` 会卡在登录；
  在沙箱里 push 还受子进程限制。后续要推送，需在能弹登录窗口的终端里执行，或在 GitHub 网页直接改文件
- 未提交：`public/_headers`（Cloudflare 安全头与缓存配置），等认证恢复后补推

## 还差什么才能上线

| 步 | 状态 | 要做的事 | 谁做 |
|---|---|---|---|
| 6 | **阻塞** | Cloudflare Pages 连 Git → 填 `npm run build` + `dist` → Deploy | 你点授权，我做验证 |
| 6.1 | 待办 | 线上验证 `/`、`/robots.txt`、`/sitemap-index.xml`、canonical、404 | 我 |
| 7 | 待办 | Google Search Console / 百度搜索资源平台验证文件 + 提交 sitemap | 我生成文件，你提交 |
| 8 | 待办 | 上线审计：200 / robots / noindex / canonical / sitemap / 移动端 / 大陆访问 → P0/P1/P2 | 我 |
| 杂 | 待办 | 补推 `public/_headers`；视觉验收；Lighthouse Mobile 分数 | 等凭据/你确认 |

**第 6 步的阻塞原因**：Cloudflare 的 "Connect to Git" 会跳到 `github.com/login/oauth/...`，
而你这条网络连接被重置（`ERR_CONNECTION_RESET`），OAuth 走不完。三条出路：
① 过一阵重试；② 开 Cloudflare WARP 再授权；③ 改用 Pages Direct Upload（我 wrangler 直传，不经过 github.com）。

## 明天的第一件事

1. 打开 https://dash.cloudflare.com/ → Workers & Pages → Create → Pages → Connect to Git
2. 能进到选仓库页面就继续；还是被重置，就开 WARP 或改走 Direct Upload
3. 部署完成后把 `xxx.pages.dev` 丢给我

## 收尾杂项

1. [ ] 补推 `public/_headers`（现在只是本地未跟踪文件）
2. [ ] 视觉验收：`http://localhost:4321/`（DSH 重启后预览会停，按下面命令重开）
3. [ ] Lighthouse Mobile 分数（Edge DevTools）
4. [ ] Cloudflare 账号仍在注册/未验证状态

## 本机沙箱的坑（下次直接用，不要再踩）

1. `npm install` 必须加 `--ignore-scripts --cache ../.npm-cache`（默认缓存在 AppData 会被拒）
2. 构建必须 `ASTRO_TELEMETRY_DISABLED=1`（否则写 `AppData\Roaming\astro` 报 EPERM）
3. 沙箱禁止 Node 派生子进程 → esbuild 报 `spawn EPERM`，构建命令需要放宽权限执行
4. `node_modules/vite/dist/node/chunks/dep-CkSfqg8D.js` 的 `optimizeSafeRealPathSync()` 已本地加 `return;`
   （它会 `exec("net use")`）。**重装依赖会丢，需要重新打**
5. 浏览器截图/headless 不可用（`crashpad failed to launch`），视觉验收只能人工

## 常用命令

```bash
cd songziduo-site
ASTRO_TELEMETRY_DISABLED=1 node node_modules/astro/astro.js build
ASTRO_TELEMETRY_DISABLED=1 node node_modules/astro/astro.js preview --port 4321 --host 127.0.0.1
```

## 内容改动入口

全部文案在 `src/data/site.ts`：`site`（个人信息/技能/证书）、`works`（作品）、`notes`（记录）。
改完重新 build 即可，页面不用动。
