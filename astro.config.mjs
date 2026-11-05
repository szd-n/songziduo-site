import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// TODO(域名): 拿到自定义域名后，把 site 改掉即可，canonical / sitemap / robots 会一起变。
export default defineConfig({
  site: "https://songziduo.pages.dev",
  output: "static",
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [sitemap()],
});
