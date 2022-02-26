// @ts-check
const fs = require('fs')
const path = require('path')
const express = require('express')
const serialize = require('serialize-javascript');

async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) {
  const resolve = (p) => path.resolve(__dirname, p)

  const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : ''

  const manifest = isProd
    ? // @ts-ignore
      require('./dist/client/ssr-manifest.json')
    : {}

  const app = express()

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite
  if (!isProd) {
    vite = await require('vite').createServer({
      root,
      logLevel: 'info',
      server: {
        middlewareMode: 'ssr',
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100
        }
      }
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)
  } else {
    app.use(require('compression')())
    // index false表示匹配不到静态文件时 不做处理交给后面逻辑
    app.use('/js', express.static(resolve('dist/client/js'),{index: false}));
    app.use('/css', express.static(resolve('dist/client/css'),{index: false}));
    app.use('/assets', express.static(resolve('dist/client/assets'),{index: false}));
    app.use('/json', express.static(resolve('dist/client/json'),{index: false}));
    app.use('/favicon', express.static(resolve('dist/client/favicon'),{index: false}));
  }

  app.use('*', async (req, res) => {
    try {
      let url = req.originalUrl

      let template, render
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.js')).render
      } else {
        template = indexProd
        render = require('./dist/server/entry-server.js').render
      }
      // 调用entry-server.js的render方法
      const [appHtml, preloadLinks, store] = await render(url, manifest)

      // 将服务端获取的数据注入到html页面中
      const state = ("<script>window.__INIT_STATE__" + "=" + serialize(store, { isJSON: true }) + "</script>");

      // 组装html
      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)
        .replace(`<!--app-store-->`, state)


      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  return { app, vite }
}

createServer().then(({ app }) =>
  app.listen(8887, () => {
    console.log('http://localhost:8887')
  })
)

// for test use
exports.createServer = createServer
