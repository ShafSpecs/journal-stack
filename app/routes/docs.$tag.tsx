import { json } from '@remix-run/node'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'

import { RemixPWASidebarProvider as SidebarProvider } from '~/components/layout/remix-pwa/Sidebar'
import { getParsedMetadata } from '~/utils/server/doc.server'
import type { MetadataType } from '~/utils/server/doc.server'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  let metadata: MetadataType = {
    paths: {},
    hasIndex: false,
    sections: [],
    meta: {},
  } // default values

  if (params.tag) {
    metadata = (await getParsedMetadata(params.tag)) ?? metadata
  }

  return json({
    metadata,
  })
}

export default function TagRoute() {
  const { metadata } = useLoaderData<{
    metadata: MetadataType
  }>()

  return (
    <SidebarProvider metadata={metadata}>
      <Outlet />
    </SidebarProvider>
  )
}
