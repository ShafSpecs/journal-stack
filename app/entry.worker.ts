/// <reference lib="WebWorker" />
import type { DefaultFetchHandler } from '@remix-pwa/sw'
import {
  EnhancedCache,
  NavigationHandler,
  clearUpOldCaches,
} from '@remix-pwa/sw'

declare const self: ServiceWorkerGlobalScope

const SW_VERSION = 'v1'
const PRECACHED_URLS = [
  '/icons/remix.svg',
  '/AI-Hero.png',
  '/favicon.ico',
  '/fonts/Inter/Inter-roman.var.woff2',
  '/fonts/Space/Space.ttf',
]

const assetCache = new EnhancedCache('asset-cache', {
  version: SW_VERSION,
  strategy: 'NetworkFirst',
  strategyOptions: {
    cacheableResponse: {
      statuses: [200, 201, 202, 204, 301, 302],
    },
    maxAgeSeconds: 3_600 * 24 * 30,
  },
})

const documentCache = new EnhancedCache('document-cache', {
  version: SW_VERSION,
  strategy: 'CacheFirst',
  strategyOptions: {
    maxAgeSeconds: 3_600 * 24 * 3,
  },
})

const dataCache = new EnhancedCache('data-cache', {
  version: SW_VERSION,
  strategy: 'NetworkFirst',
  strategyOptions: {
    maxAgeSeconds: 3_600 * 24,
  },
})

self.addEventListener('install', event => {
  event.waitUntil(
    assetCache.preCacheUrls(PRECACHED_URLS).then(() => {
      self.skipWaiting()
    })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    clearUpOldCaches(['asset-cache', 'document-cache'], SW_VERSION).then(() => {
      self.clients.claim()
    })
  )
})

export const defaultFetchHandler: DefaultFetchHandler = ({ context }) => {
  const { event } = context
  const { request } = event
  const url = new URL(request.url)
  const { searchParams } = url

  if (searchParams.has('_data')) {
    return dataCache.handleRequest(request)
  }

  if (PRECACHED_URLS.includes(url.pathname)) {
    console.log(url.pathname)
    return assetCache.handleRequest(request)
  }

  return fetch(request)
}

// eslint-disable-next-line no-new
new NavigationHandler({
  documentCache,
})
