import { Link, useRouteLoaderData } from '@remix-run/react'
import { Fragment, useMemo } from 'react'
import { getMDXComponent, getMDXExport } from 'mdx-bundler/client'
import clsx from 'clsx'
import redent from 'redent'

import { RemixPWAInfo as Info } from '~/components/plugins/Info'
import { RemixPWAWarn as Warn } from '~/components/plugins/Warn'
import SnippetGroup from '~/components/plugins/Snippet'
import Editor from '~/components/plugins/editor'
import Heading from '~/components/plugins/Heading'
import { useTableOfContents } from '~/hooks/useTableOfContents'
import { TOCContext } from '~/utils/contexts/TOCContext'

function RemixPWADocumentation() {
  const { code, frontmatter, next, prev, tag } = useRouteLoaderData<any>(
    'routes/docs.$tag.$slug'
  )

  const Component = useMemo(
    () =>
      getMDXComponent(code, {
        clsx,
        redent,
        Editor,
        Snippet: SnippetGroup,
        Heading,
        Info,
        Warn,
      }),
    [code]
  )
  const { tableOfContents } = useMemo(() => getMDXExport(code), [code])

  const { currentSection, registerHeading, unregisterHeading } =
    useTableOfContents(tableOfContents)

  function isActive(section: any) {
    if (section.slug === currentSection) {
      return true
    }
    if (!section.children) {
      return false
    }
    return section.children.findIndex(isActive) > -1
  }

  const pageHasSubsections = tableOfContents.some(
    (section: any) => section.children.length > 0
  )

  return (
    <TOCContext.Provider value={{ registerHeading, unregisterHeading }}>
      <div className="mx-auto max-w-3xl pt-10 xl:ml-0 xl:mr-[15.5rem] xl:max-w-none xl:pr-16">
        <div className="mb-8 flex-auto scroll-smooth">
          <article>
            <header id="header" className="relative z-20">
              <div>
                <h5 className="mb-2 text-sm font-semibold leading-6 text-sky-500 dark:text-sky-400">
                  {frontmatter.section}
                </h5>
                <div className="flex items-center">
                  <h1 className="inline-block text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 sm:text-3xl">
                    {frontmatter.title}
                  </h1>
                </div>
              </div>
              <p className="mt-2 text-lg text-slate-700 dark:text-slate-400">
                {frontmatter.description}
              </p>
            </header>

            <main
              id="article-main"
              className="prose-h2:not-prose prose prose-slate relative z-20 mt-8 scroll-smooth dark:prose-dark prose-h2:mb-2 prose-h2:flex prose-h2:whitespace-pre-wrap prose-h2:text-sm prose-h2:font-semibold prose-h2:leading-6 prose-h2:tracking-normal prose-h2:text-sky-500 prose-code:font-fira prose-code:text-sm prose-code:font-medium prose-h2:dark:text-sky-400 prose-code:dark:text-[#e2e8f0]"
            >
              <Component />
            </main>
          </article>
          <dl className="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
            {prev && (
              <div>
                <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
                  Previous
                </dt>
                <dd className="mt-1">
                  <Link
                    className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                    to={`/docs/${tag}/${prev.slug}`}
                    // reloadDocument={true}
                    // prefetch="intent"
                  >
                    <span aria-hidden="true">←</span>&nbsp;
                    {prev.alternateTitle ?? prev.title}
                  </Link>
                </dd>
              </div>
            )}
            {next && (
              <div className="ml-auto text-right">
                <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
                  Next
                </dt>
                <dd className="mt-1">
                  <Link
                    className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                    to={`/docs/${tag}/${next.slug}`}
                    // reloadDocument={true}
                    // prefetch="intent"
                  >
                    {next.alternateTitle ?? next.title}
                    {/* */}&nbsp;<span aria-hidden="true">→</span>
                  </Link>
                </dd>
              </div>
            )}
          </dl>
        </div>
        <div className="fixed bottom-0 right-[max(0px,calc(50%-45rem))] top-[3.8125rem] z-20 hidden w-[19.5rem] overflow-y-auto py-10 xl:block">
          <nav aria-labelledby="on-this-page-title" className="px-8">
            {/* eslint-disable-next-line multiline-ternary */}
            {tableOfContents.length > 0 ? (
              <h2
                id="on-this-page-title"
                className="mb-4 text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100"
              >
                On this page
              </h2>
            ) : (
              <p></p>
            )}

            <ol className="text-sm leading-6 text-slate-700" id="toc-id">
              {tableOfContents.map(section => (
                <Fragment key={section.slug}>
                  <li>
                    <a
                      href={`#${section.slug}`}
                      // onClick={closeNav}
                      className={clsx(
                        'block py-1',
                        pageHasSubsections ? 'font-medium' : '',
                        isActive(section)
                          ? 'font-medium text-sky-500 dark:text-sky-400'
                          : 'hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300'
                      )}
                    >
                      {section.title}
                    </a>
                  </li>
                  {section.children.map(subsection => (
                    <li className="ml-4" key={subsection.slug}>
                      <a
                        href={`#${subsection.slug}`}
                        // onClick={closeNav}
                        className={clsx(
                          'group flex items-start py-1',
                          isActive(subsection)
                            ? 'text-sky-500 dark:text-sky-400'
                            : 'hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300'
                        )}
                      >
                        <svg
                          width="3"
                          height="24"
                          viewBox="0 -9 3 24"
                          className="mr-2 overflow-visible text-slate-400 group-hover:text-slate-600 dark:text-slate-600 dark:group-hover:text-slate-500"
                        >
                          <path
                            d="M0 0L3 3L0 6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        {subsection.title}
                      </a>
                    </li>
                  ))}
                </Fragment>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </TOCContext.Provider>
  )
}

export { RemixPWADocumentation as Documentation }
