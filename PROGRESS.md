# 进度存档（供下次继续）

> 最后更新：2026-11-05 21:45 · 当前进度：第 0–4 步完成；第 5 步已 `git init` + 首次 commit，等 push

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
- 远端：待建，建议 `https://github.com/szd-n/songziduo-site.git`（public，不要勾选 README/gitignore/license）
- 本机没有 `gh` CLI，push 用 HTTPS + Git Credential Manager 或 PAT

## 待办（按顺序）

1. [ ] **用户视觉验收**：浏览器打开 `http://localhost:4321/`（预览已重启）
2. [ ] **Lighthouse**：用户在 Edge DevTools 跑 Mobile，把分数发回
3. [x] **用户注册 GitHub**（用户名 `szd-n`）；Cloudflare 仍待注册
4. [ ] 第 5 步剩余：建远端仓库 → `git remote add` → `git push -u origin main`
5. [ ] 第 6 步：Cloudflare Pages 部署（优先 Git 连接），验证线上 sitemap/robots/canonical
6. [ ] 第 7 步：生成 Google / 百度验证文件 + 逐步提交清单（不代提交、不声称已收录）
7. [ ] 第 8 步：上线审计（200 / robots / noindex / canonical / sitemap / 移动端 / 大陆访问），输出 P0/P1/P2

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
