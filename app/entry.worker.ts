/// <reference lib="WebWorker" />

import type { DefaultFetchHandler } from '@remix-pwa/sw'
import {
  EnhancedCache,
  Logger,
  NavigationHandler,
  clearUpOldCaches,
  isDocumentRequest,
  isLoaderRequest,
} from '@remix-pwa/sw'

declare const self: ServiceWorkerGlobalScope

const SW_VERSION = 'v1'
const logger = new Logger({
  prefix: 'Journal Stack',
  logLevel: 'debug',
})

const dataCache = new EnhancedCache('data-cache', {
  version: SW_VERSION,
  strategy: 'NetworkFirst',
  strategyOptions: {
    maxAgeSeconds: 3_600 * 24 * 3,
  },
})

const documentCache = new EnhancedCache('document-cache', {
  version: SW_VERSION,
  strategy: 'CacheFirst',
  strategyOptions: {
    maxAgeSeconds: 3_600 * 24 * 3,
  },
})

const assetCache = new EnhancedCache('asset-cache', {
  version: SW_VERSION,
  strategy: 'NetworkFirst',
  strategyOptions: {
    maxAgeSeconds: 3_600 * 24 * 30,
  },
})

self.addEventListener('install', event => {
  logger.log('Service Worker installed')

  logger.debug('Precaching assets:', self.__workerManifest.assets)
  event.waitUntil(
    assetCache.preCacheUrls(self.__workerManifest.assets).then(() => {
      self.skipWaiting()
    })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    clearUpOldCaches(
      ['asset-cache', 'document-cache', 'data-cache'],
      SW_VERSION
    ).then(() => {
      self.clients.claim()
    })
  )
})

export const defaultFetchHandler: DefaultFetchHandler = ({ context }) => {
  const { event, fetchFromServer } = context

  const { request } = event
  const url = new URL(request.url)

  if (isLoaderRequest(request)) {
    return dataCache.handleRequest(request)
  }

  if (isDocumentRequest(request)) {
    return documentCache.handleRequest(request)
  }

  if (self.__workerManifest.assets.includes(url.pathname)) {
    return assetCache.handleRequest(request)
  }

  return fetchFromServer()
}

// This in the message handling section
//
// Handles the caching of document requests

const messageHandler = new NavigationHandler({
  cache: documentCache,
  logger,
})

self.addEventListener('message', event => {
  event.waitUntil(messageHandler.handleMessage(event))
})
