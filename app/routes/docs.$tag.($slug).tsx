import type { LoaderFunctionArgs } from '@remix-run/node'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const tag = params.tag
  let slug = params.slug

  if (slug === undefined) slug = '/'

  console.log(tag, slug)

  return null
}

export default function DocRoute() {
  return (
    <div>
      <p>Sht</p>
    </div>
  )
}
