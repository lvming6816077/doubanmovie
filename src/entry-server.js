import { createApp } from './main'
import { renderToString } from 'vue/server-renderer'
import { getAsyncData } from './store/getAsyncData';  // 异步处理数据的时候使用

export async function render(url, manifest) {
  const { app, router, store } = createApp()

  // 设置默认的路由，/默认走home路由
  router.push(url)
  // 等待路由加载完成
  await router.isReady()
  // 获取首屏需要的异步数据store
  await getAsyncData(router,store, true)
  
  // store中已经存放了数据 提供渲染出html字符串
  const ctx = {}
  ctx.state = store.state
  const html = await renderToString(app, ctx)

  //处理需要预加载的链接
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
  return [html, preloadLinks, store]
}

// 获得需要preload的资源
function renderPreloadLinks(modules, manifest) {

  let links = ''
  const seen = new Set()
  modules.forEach((id) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file)
          links += renderPreloadLink(file)
        }
      })
    }
  })

  return links
}

function renderPreloadLink(file) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else if (file.endsWith('.woff')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
  } else if (file.endsWith('.woff2')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
  } else if (file.endsWith('.gif')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
  } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
  } else if (file.endsWith('.png')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`
  } else {
    // TODO
    return ''
  }
}
