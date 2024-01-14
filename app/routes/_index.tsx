import type { MetaFunction } from '@remix-run/node'
import { redirect, useFetcher } from '@remix-run/react'

import { useRequestInfo } from '~/hooks/useRequestInfo'
import { useOptimisticThemeMode } from '~/hooks/useTheme'

export const loader = () => {
  // To add a landing page to your docs, remove this line.
  return redirect('/docs/main')
}

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  const fetcher = useFetcher()
  const requestInfo = useRequestInfo()
  const optimisticMode = useOptimisticThemeMode()

  const mode = optimisticMode ?? requestInfo.userPrefs.theme ?? 'system'

  const availableThemes = ['light', 'dark', 'system']

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Welcome to Remix (Updated)</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
      <div className="flex select-none flex-col rounded-2xl bg-white/60 px-1 py-1 drop-shadow-sm backdrop-blur-md transition hover:bg-white dark:bg-white/20">
        <fetcher.Form method="POST" action={'/updateTheme'} className="flex">
          <div className="flex items-center">
            {availableThemes.map(theme => (
              <button
                key={theme}
                type="submit"
                name="theme"
                value={theme}
                className={`${
                  mode === theme &&
                  'rounded-xl bg-black/80 text-white drop-shadow-md dark:bg-white/80 dark:text-black'
                } h-9 px-4`}
              >
                <span className="font-semibold">
                  {theme && theme.charAt(0).toUpperCase() + theme.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </fetcher.Form>
      </div>
    </div>
  )
}
