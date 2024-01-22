import { json } from '@remix-run/node'
import type { LoaderFunctionArgs } from '@remix-run/node'
import type { ClientLoaderFunctionArgs } from '@remix-run/react'
import { Outlet, useLoaderData, json as clientJson } from '@remix-run/react'

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

export const clientLoader = async ({
  params,
  serverLoader,
}: ClientLoaderFunctionArgs) => {
  const localMetadata = window.sessionStorage.getItem(`metadata-${params.tag}`)

  if (localMetadata) {
    return clientJson({
      metadata: JSON.parse(localMetadata),
    })
  }

  const { metadata } = (await serverLoader()) as unknown as any
  window.sessionStorage.setItem(
    `metadata-${params.tag}`,
    JSON.stringify(metadata)
  )

  return clientJson({
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
