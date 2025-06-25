import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { Buffer } from "node:buffer"
import tailwindcss from '@tailwindcss/vite'
import minifyHtml from "@minify-html/node"

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    tailwindcss(),
    // 导致 bug，暂不启用
    // vitePluginMinifyHtml({
    //   preserve_brace_template_syntax: true,
    // })
  ],
  build: {
    rollupOptions: {
      input: {
        // 文章页面模板
        article: resolve(__dirname, 'article.html'),
        // 工具页面模板
        home: resolve(__dirname, 'page.html'),
        archive: resolve(__dirname, 'archive.html'),
        tag: resolve(__dirname, 'tag.html'),
        // 模板页面
        footer: resolve(__dirname, '_footer.html'),
        header: resolve(__dirname, '_header.html'),
        profile: resolve(__dirname, '_profile.html'),
      },
    },
  },
})

/**
 * @param {Parameters<typeof minifyHtml.minify>[1]} options - minify-html 的配置项
 * @returns {import('vite').Plugin}
 */
function vitePluginMinifyHtml(options = {}) {
  return {
    name: "vite-plugin-minify-html-all",

    // 仅在 'build' (生产构建) 模式下应用
    apply: "build",

    async transformIndexHtml(html) {
      try {
        const sourceBuffer = Buffer.from(html)
        const minified = minifyHtml.minify(sourceBuffer, options)
        return minified.toString()
      } catch (error) {
        this.error(`Failed to minify HTML: ${error}`)
      }
    }
  };
}