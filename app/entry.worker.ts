/// <reference lib="WebWorker" />
import type { DefaultFetchHandler } from '@remix-pwa/sw'
import {
  EnhancedCache,
  NavigationHandler,
  clearUpOldCaches,
} from '@remix-pwa/sw'

declare const self: ServiceWorkerGlobalScope

const SW_VERSION = 'v3'
const PRECACHED_URLS = [
  '/remix.svg',
  '/AI-Hero.webp',
  '/favicon.ico',
  '/fonts/Inter/Inter-roman.var.woff2',
  '/fonts/Space/Space.woff2',
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
    networkTimeoutInSeconds: 3,
  },
})

self.addEventListener('install', event => {
  event.waitUntil(
    assetCache
      .preCacheUrls(
        // process.env.NODE_ENV === 'development'
        PRECACHED_URLS
        // : self.__workerManifest.assets
      )
      .then(() => {
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
  const { event, fetchFromServer } = context
  const { request } = event
  const url = new URL(request.url)
  const { searchParams } = url

  if (searchParams.has('_data')) {
    return dataCache.handleRequest(request)
  }

  if (PRECACHED_URLS.includes(url.pathname)) {
    return assetCache.handleRequest(request)
  }

  if (url.origin.includes('githubusercontent.com')) {
    return fetchWithTimeout(request, 3_000) as Promise<Response>
  }

  return fetchFromServer()
}

// eslint-disable-next-line no-new
new NavigationHandler({
  documentCache,
})

function fetchWithTimeout(url: string | URL | Request, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Request timed out'))
    }, timeout)

    fetch(url)
      .then(response => {
        clearTimeout(timer)
        resolve(response)
      })
      .catch(err => {
        clearTimeout(timer)
        reject(err)
      })
  })
}
