import { Fragment, createContext, useEffect, useRef, useState } from 'react'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { NavLink, useLocation } from '@remix-run/react'
import clsx from 'clsx'

import { useIsomorphicLayoutEffect } from '~/hooks/useIsomorphicLayoutEffect'
import { useActionKey } from '~/hooks/useActionKey'
import { nearestScrollableContainer } from '~/utils/client/nearest-scrollable-container'
import { useMediaQuery } from '~/hooks/useMediaQuery'
import type { MetadataMetaType, MetadataType } from '~/utils/server/doc.server'
import { DEFAULT_TAG } from '~/utils/defatult'

import Header from './Header'

function Wrapper({
  allowOverflow,
  children,
}: {
  allowOverflow?: boolean
  children?: ReactNode
}) {
  return (
    <div className={allowOverflow ? undefined : 'overflow-hidden'}>
      {children}
    </div>
  )
}

function DocList({ meta, tag }: { meta: MetadataMetaType; tag: string }) {
  const location = useLocation()
  const actionKey = useActionKey()

  const mobile = useMediaQuery('(max-width: 1024px)')

  const [docList, setDocList] = useState<
    { section: string; children: any[] }[]
  >([])

  const activeItemRef = useRef<HTMLElement>()
  const previousActiveItemRef = useRef<HTMLElement>()
  const scrollRef = useRef<HTMLDivElement>(null!)

  useIsomorphicLayoutEffect(() => {
    function updatePreviousRef() {
      previousActiveItemRef.current = activeItemRef.current
    }

    if (activeItemRef.current) {
      if (activeItemRef.current === previousActiveItemRef.current) {
        updatePreviousRef()
        return
      }

      updatePreviousRef()

      const scrollable = nearestScrollableContainer(scrollRef.current)

      const scrollRect = scrollable.getBoundingClientRect()
      const activeItemRect = activeItemRef.current.getBoundingClientRect()

      const top = activeItemRef.current.offsetTop
      const bottom = top - scrollRect.height + activeItemRect.height

      if (scrollable.scrollTop > top || scrollable.scrollTop < bottom) {
        scrollable.scrollTop =
          top - scrollRect.height / 2 + activeItemRect.height / 2
      }
    }
  }, [location.pathname])

  useEffect(() => {
    const reduced = {} as any

    for (const key in meta) {
      const item = meta[key]
      const section = item.section ?? ''

      if (!reduced[section]) {
        reduced[section] = []
      }

      reduced[section].push(item)
    }

    const result = Object.keys(reduced).map(section => {
      return { section, children: reduced[section] }
    })
    console.log(result)
    setDocList(result)
  }, [meta])

  return (
    <nav ref={scrollRef} id="nav" className="relative lg:text-sm lg:leading-6">
      <div className="pointer-events-none sticky top-0 -ml-0.5">
        {!mobile && <div className="h-10 bg-white dark:bg-slate-900" />}
        {/* <div className="pointer-events-auto relative hidden bg-white lg:block dark:bg-slate-900">
          <button
            type="button"
            className="dark:highlight-white/5 hidden w-full items-center rounded-md py-1.5 pl-2 pr-3 text-sm leading-6 text-slate-400 shadow-sm outline-none ring-slate-900/10 hover:ring-slate-300 lg:flex dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <>
              <svg
                width="24"
                height="24"
                fill="none"
                aria-hidden="true"
                className="mr-3 flex-none"
              >
                <path
                  d="m19 19-3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="11"
                  cy="11"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Quick search... */}
        {/* eslint-disable-next-line multiline-ternary */}
        {/* {actionKey ? (
                <span className="ml-auto flex-none pl-3 text-xs font-semibold">
                  {actionKey[0]}K
                </span>
              ) : null}
            </>
          </button>
        </div> */}
        {!mobile && (
          <div className="h-8 bg-gradient-to-b from-white dark:from-slate-900" />
        )}
      </div>
      <ul className="lg:-mt-6">
        {/* {meta.map((el: MetaDataObject, i: number) => (
          <NavItem key={`${i}-${el.name}`} {...el} />
        ))} */}
        {docList.map(
          (section: { section: string; children: any[] }, index: number) => {
            return (
              <li className="mt-12 lg:mt-8" key={index}>
                <h3 className="mb-8 font-semibold text-slate-900 lg:mb-3 dark:text-slate-200">
                  {section.section}
                </h3>
                <ul
                  className={clsx(
                    'space-y-6 border-l border-slate-100 lg:space-y-2',
                    mobile ? 'dark:border-slate-700' : 'dark:border-slate-800'
                  )}
                >
                  {section.children.map(sub => {
                    return (
                      <li className="" key={sub.alternateTitle ?? sub.title}>
                        <NavLink
                          prefetch="intent"
                          to={`/docs/${tag}/${sub.slug}`}
                          end={true}
                        >
                          {({ isActive }) => (
                            <span
                              className={clsx('-ml-px block border-l pl-4', {
                                'border-current font-semibold text-sky-500 dark:text-sky-400':
                                  isActive,
                                'border-transparent hover:border-slate-400 dark:hover:border-slate-500':
                                  !isActive,
                                'text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300':
                                  !isActive,
                                'text-slate-400': !isActive,
                              })}
                            >
                              {sub.alternateTitle ?? sub.title}
                            </span>
                          )}
                        </NavLink>
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          }
        )}
      </ul>
    </nav>
  )
}

const RemixPWASidebarContext = createContext<{
  currentTag: string
  navIsOpen: boolean
  setNavIsOpen: Dispatch<SetStateAction<boolean>>
}>({ navIsOpen: false, setNavIsOpen: () => {}, currentTag: DEFAULT_TAG })

export { RemixPWASidebarContext as SidebarContext }

type RemixPWASidebarProviderProps = {
  metadata: MetadataType
  children?: ReactNode
  layoutProps?: { allowOverflow?: boolean }
}

export function RemixPWASidebarProvider({
  children,
  layoutProps: { allowOverflow = true } = {},
  metadata,
}: RemixPWASidebarProviderProps) {
  const location = useLocation()

  const [navIsOpen, setNavIsOpen] = useState(false)
  const [tag, setTag] = useState<string>(DEFAULT_TAG)

  useEffect(() => {
    setTag(location.pathname.split('/')[2] ?? DEFAULT_TAG)
  }, [metadata, location.pathname])

  return (
    <Fragment>
      <Header section="Getting Started" title="Hello World" />
      <RemixPWASidebarContext.Provider
        value={{ navIsOpen, setNavIsOpen, currentTag: tag }}
      >
        <Wrapper allowOverflow={allowOverflow}>
          <div className="mx-auto max-w-8xl px-4 sm:px-6 md:px-8">
            <div className="sidebar-content fixed inset-0 left-[max(0px,calc(50%-45rem))] right-auto top-[3.8125rem] z-20 hidden w-[19rem] overflow-y-auto pb-10 pl-8 pr-6 lg:block">
              <DocList meta={metadata.meta} tag={tag} />
            </div>
            <div className="lg:pl-[19.5rem]">{children}</div>
          </div>
        </Wrapper>
        {/* <p>Todo: Sidebar Wrapper (Sidebar provider)</p>
        {Object.values(metadata.meta).reduce((acc, item, index) => {
          // Check if the current item starts a new section
          if (item.spacer || index === 0) {
            acc.push(<h2 key={`section-${index}`}>{item.section}</h2>)
          }

          // Add the item to the sidebar
          acc.push(
            <div key={`item-${index}`} className="sidebar-item">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          )

          return acc
        }, [] as any)}
        {children} */}
      </RemixPWASidebarContext.Provider>
    </Fragment>
  )
}
