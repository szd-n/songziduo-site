# songziduo-site

宋子鐸的个人主页。Astro 静态输出，部署目标是 Cloudflare Pages。

## 页面

| 路径 | 说明 |
|---|---|
| `/` | 首页：头像、主张、作品、记录、技能 |
| `/works/` | 作品列表 |
| `/works/adskip/` | 作品：AdSkip |
| `/works/time-fold/` | 作品：时间折叠 |
| `/notes/` | 记录列表 |
| `/notes/how-this-site-was-built/` | 记录：这个站是怎么搭的 |
| `/about/` | 关于 |
| `/404.html` | 404 |

## 本地运行

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 产出 dist/
npm run preview  # 预览 dist/
```

### 本机沙箱限制（仅影响这台机器）

DSH 沙箱禁止 Node 派生子进程，esbuild 会报 `spawn EPERM`。处理方式：

```bash
ASTRO_TELEMETRY_DISABLED=1 node node_modules/astro/astro.js build
```

另外 `node_modules/vite/dist/node/chunks/dep-*.js` 里的 `optimizeSafeRealPathSync()` 已被本地打上 `return;`
（它会 `exec("net use")`）。这两处都只影响本机，不影响 Cloudflare 的构建。

## 部署到 Cloudflare Pages

- Build command：`npm run build`
- Build output directory：`dist`
- 环境变量：`NODE_VERSION=20`（可选，默认即可）

## 换域名

只改 `astro.config.mjs` 里的 `site`，canonical / sitemap / robots 会一起更新。
同时更新 `public/robots.txt` 里的 `Sitemap:` 地址。

## SEO 清单

- 每页独立 title / description / canonical
- Person + WebSite JSON-LD（全站）
- `sitemap-index.xml` + `sitemap-0.xml`（@astrojs/sitemap 生成）
- `robots.txt` 指向 sitemap
- 404 页面 `noindex, follow`，其余页面均为 `index, follow`
- 移动端优先，无客户端框架，首屏无阻塞脚本

## SiteHub

尚未拿到文档与站点 ID，`.env.example` 里留了占位，未接入。
