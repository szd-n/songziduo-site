export const site = {
  name: "宋子鐸",
  nameAlt: "宋子铎",
  nameEn: "Song Ziduo",
  url: "https://songziduo.pages.dev",
  email: "songqiduo427@qq.com",
  school: "河北政法职业学院",
  schoolEn: "Hebei Vocational College of Politics and Law",
  major: "软件技术",
  tagline: "在石家庄学软件技术，写代码，也顺手记录。",
  intro:
    "我是宋子鐸，河北政法职业学院软件技术专业在读。平时用 C、C#、MySQL 写东西，习惯把 AI agent 当搭子——从拆需求到查 bug 都一起过一遍。这个站存三样东西：做完的项目、踩过的坑、还在折腾的实验。",
  status: "最近：把项目一个个搬上来，顺手把这个站做对。",
  skills: ["C", "C#", "MySQL", "Kotlin", "计算机网络", "AI Agent 协作", "Office"],
  certs: ["计算机应用工程师（中级）", "NIT", "普通话二级"],
};

export const nav = [
  { href: "/works/", label: "作品" },
  { href: "/notes/", label: "记录" },
  { href: "/about/", label: "关于" },
];

export type Work = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  year: string;
  role: string;
  stack: string[];
  status: string;
  body: string[];
  note?: string;
};

export const works: Work[] = [
  {
    slug: "adskip",
    index: "01",
    title: "AdSkip · 广告跳过",
    summary:
      "用 Android 无障碍服务自动点掉开屏广告——不联网、不 root、不 hook。",
    year: "2026",
    role: "独立开发 · 设计 / 编码 / 构建 / 实机验证",
    stack: ["Kotlin", "Android 无障碍", "规则引擎", "零第三方依赖"],
    status: "代码未公开",
    body: [
      "开屏广告的跳过按钮位置不固定，包名和控件文案也常变，所以我把「跳过」做成一件很具体的事：用无障碍服务读当前界面节点，命中规则就点。",
      "规则按包名索引，条件跨类别用 AND、类内用 OR，同一个 id 导入即覆盖；优先级高的先试，避免通用规则误点。",
      "整个 APK 不申请 INTERNET 权限，没有 AndroidX、没有网络库，JSON 直接用系统 org.json；构建走 aapt2 → kotlinc → d8 → zipalign → apksigner 的手工流水线。",
      "规则引擎有 26 条 JVM 单测，在 Android 12 模拟器和真机上验证过开屏、弹窗两类场景。",
    ],
  },
  {
    slug: "time-fold",
    index: "02",
    title: "时间折叠 · 播放器实验",
    summary:
      "劫持 HTMLMediaElement 的 duration / currentTime / ended，把原生 3 倍速在页面上伪装成 1 倍速。",
    year: "2026",
    role: "独立开发 · 页面行为分析 / 原型实现",
    stack: ["JavaScript", "HTMLMediaElement", "属性描述符", "MutationObserver"],
    status: "实验记录",
    body: [
      "页面靠 video.duration 和 currentTime 判断进度，还会监听 ended 自动切下一节。所以只改 playbackRate 不够——得把这几个口子一起接管。",
      "做法是给每个 iframe realm 单独取一份原生描述符，用 WeakMap 缓存；getter 返回折叠后的值（时长 ×3、进度 ÷3），setter 把写入折算回真实值。",
      "ended 事件在捕获阶段用 stopImmediatePropagation 拦掉，再按虚拟进度补发 timeupdate，直到伪造的 duration 走完才放行切换。",
      "全部状态收在 __cx 上，stop() 能还原描述符、倍速和 ended，页面不用刷新。",
    ],
    note: "仅作前端实验记录，不提供安装或使用说明。",
  },
];

export type Note = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  body: string[];
};

export const notes: Note[] = [
  {
    slug: "how-this-site-was-built",
    title: "这个站是怎么搭的",
    date: "2026-11-05",
    summary: "Astro 静态输出、一套 CSS 弥散光，以及把 SEO 一次做对的清单。",
    body: [
      "站点用 Astro 做静态输出，除了构建工具本身没有客户端框架。页面在构建期全部生成成 HTML，Cloudflare Pages 直接托管 dist 目录。",
      "视觉上没有用图片背景：三团 CSS radial-gradient 圆形做模糊叠加，加一层 SVG 噪点压住色带，动效只在首屏和 hover 出现，prefers-reduced-motion 下全部关闭。",
      "SEO 这部分做得比较老实：每页独立的 title 与 description，canonical 用绝对地址，Person JSON-LD 常驻全站，sitemap 由 @astrojs/sitemap 生成，robots.txt 指向它，404 是独立页面而不是重定向。",
      "部署目标写死在 site 配置里，换成自定义域名时只改一行，canonical、sitemap、robots 会一起跟上。",
    ],
  },
];
