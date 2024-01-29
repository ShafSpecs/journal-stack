import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import { json } from '@remix-run/node'
import { useSWEffect } from '@remix-pwa/sw'
import type { LoaderFunctionArgs } from '@remix-run/node'

import { ClientHints, getHints } from './components/ClientHint'
import { useTheme } from './hooks/useTheme'
import { getTheme } from './utils/server/theme.server'
import { getVersions } from './utils/server/doc.server'

import './styles/code.css'
import './styles/documentation.css'
import './styles/fonts.css'
import './styles/tailwind.css'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const versions = (await getVersions()) ?? []

  return json({
    requestInfo: {
      hints: getHints(request),
      userPrefs: { theme: getTheme(request) },
    },
    versions,
  })
}

// If you want to wrap your app further or include some shared UI
function App() {
  return <Outlet />
}

export default function Document() {
  useSWEffect()
  const theme = useTheme()

  return (
    <html lang="en" className={`h-full overflow-x-hidden ${theme} antialiased`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <ClientHints />
        <Meta />
        <Links />
      </head>
      <body className="bg-background-color">
        <App />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
