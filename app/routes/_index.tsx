import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

export const loader = () => {
  // To add a landing page to your docs, remove this line.
  // return redirect('/docs/main')
  return null
}

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  return (
    <div className="placeholder-index relative h-screen w-screen dark:bg-white sm:pb-16 sm:pt-8">
      <div className="relative mx-auto max-w-[90rem] sm:px-6 lg:px-8">
        <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
          <section className="absolute inset-0">
            <img
              className="h-full w-full object-cover"
              src="/AI-Hero.png"
              alt="Rushing vibes of life"
            />
            <div className="absolute inset-0 bg-slate-950/75 mix-blend-multiply" />
          </section>
          <section className="lg:pb-18 relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pt-32">
            <h1 className="overflow-hidden text-center text-7xl font-medium sm:text-6xl lg:text-8xl">
              <span className="font-space block pb-2 pr-2 text-center uppercase text-white drop-shadow-md">
                <span className="text-center">Journal&nbsp;</span>
                <span className="block h-full bg-gradient-to-tr from-indigo-500 to-sky-300 bg-clip-text pb-1 pr-1 text-center text-transparent dark:from-indigo-500 dark:to-sky-300 sm:inline sm:pb-0">
                  Stack
                </span>
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-lg text-center text-lg text-white sm:max-w-3xl md:mt-12">
              Check the{' '}
              <a
                href="https://github.com/ShafSpecs/rockspec-stack/blob/main/README.md"
                target={'_blank'}
                className="text-white no-underline focus:text-white"
                rel="noreferrer"
              >
                README.md
              </a>{' '}
              file for instructions on how to get this project deployed.
            </p>
            <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
              <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                <Link
                  to="/docs/main"
                  className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-slate-800 shadow-sm hover:bg-blue-50 sm:px-8"
                >
                  Get Started
                </Link>
                <a
                  aria-label="GitHub"
                  href="https://github.com/ShafSpecs/journal-stack"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center rounded-md bg-slate-700 px-4 py-3 font-medium text-white hover:bg-slate-800  "
                >
                  Source Code
                </a>
              </div>
            </div>
            <a href="https://remix.run" className="mx-auto w-max">
              <img
                src="/icons/remix.svg"
                alt="Remix"
                className="mx-auto mt-16 w-full max-w-[12rem] md:max-w-[16rem]"
              />
            </a>
          </section>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-8 py-2 sm:px-12 lg:px-16">
        <div className="mt-6 flex flex-wrap justify-center gap-8">
          {[
            {
              src: 'https://user-images.githubusercontent.com/1500684/157764397-ccd8ea10-b8aa-4772-a99b-35de937319e1.svg',
              alt: 'Fly.io',
              href: 'https://fly.io',
            },
            {
              src: 'https://avatars.githubusercontent.com/u/2232217?s=200&v=4',
              alt: 'AWS S3',
              href: 'https://aws.amazon.com/',
            },
            {
              src: 'https://mdx-logo.now.sh',
              alt: 'MDX',
              href: 'https://mdxjs.com',
            },
            {
              src: 'https://user-images.githubusercontent.com/1500684/157764276-a516a239-e377-4a20-b44a-0ac7b65c8c14.svg',
              alt: 'Tailwind',
              href: 'https://tailwindcss.com',
            },
            {
              src: 'https://playwright.dev/img/playwright-logo.svg',
              alt: 'Playwright',
              href: 'https://playwright.dev/',
            },
            {
              src: 'https://user-images.githubusercontent.com/1500684/157772447-00fccdce-9d12-46a3-8bb4-fac612cdc949.svg',
              alt: 'Vitest',
              href: 'https://vitest.dev',
            },
            {
              src: 'https://user-images.githubusercontent.com/1500684/157772662-92b0dd3a-453f-4d18-b8be-9fa6efde52cf.png',
              alt: 'Testing Library',
              href: 'https://testing-library.com',
            },
            {
              src: 'https://user-images.githubusercontent.com/1500684/157772934-ce0a943d-e9d0-40f8-97f3-f464c0811643.svg',
              alt: 'Prettier',
              href: 'https://prettier.io',
            },
            {
              src: 'https://user-images.githubusercontent.com/1500684/157772990-3968ff7c-b551-4c55-a25c-046a32709a8e.svg',
              alt: 'ESLint',
              href: 'https://eslint.org',
            },
            {
              src: 'https://user-images.githubusercontent.com/1500684/157773063-20a0ed64-b9f8-4e0b-9d1e-0b65a3d4a6db.svg',
              alt: 'TypeScript',
              href: 'https://typescriptlang.org',
            },
          ].map(img => (
            <a
              key={img.href}
              href={img.href}
              target="_blank"
              className="flex h-16 w-32 justify-center p-1 grayscale transition hover:grayscale-0 focus:grayscale-0"
              rel="noreferrer"
            >
              <img alt={img.alt} src={img.src} />
            </a>
          ))}
        </div>
      </div>
      <section className="absolute bottom-2 mb-2 mt-2 w-full pb-3 text-center md:mb-0 md:mt-0">
        Crafted by ShafSpecs with ❤️ and Remix vibes 💿
      </section>
    </div>
  )
}
