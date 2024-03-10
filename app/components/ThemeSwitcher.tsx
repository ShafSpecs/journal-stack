import { useFetcher } from '@remix-run/react'
import { MoonIcon, SunIcon } from 'lucide-react'

import { useTheme } from '~/hooks/useTheme'

export const ThemeSwitcher = () => {
  const fetcher = useFetcher()
  const theme = useTheme()

  return (
    <button
      className="flex h-6 w-6 items-center justify-center rounded-lg shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5"
      onClick={() => {
        if (theme === 'light') {
          fetcher.submit(
            { theme: 'dark' },
            { method: 'post', action: '/updateTheme' }
          )
        } else if (theme === 'dark') {
          fetcher.submit(
            { theme: 'light' },
            { method: 'post', action: '/updateTheme' }
          )
        }
      }}
    >
      {theme === 'light' && (
        <SunIcon className="h-4 w-4 fill-sky-400 text-sky-400" />
      )}
      {theme === 'dark' && (
        <MoonIcon className="h-4 w-4 fill-sky-400 text-sky-400" />
      )}
    </button>
  )
}
