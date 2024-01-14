import { type LoaderFunctionArgs, json } from '@remix-run/node'

import { getPostContent } from '~/utils/server/doc.server'
import { mdxToHtml } from '~/utils/server/mdx.server'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const tag = params.tag ?? 'main'
  const slug = params.slug as string

  const postContent = (await getPostContent(tag, slug)) ?? '' // handle null cases later
  const { code, frontmatter } = await mdxToHtml(postContent)

  return json({
    frontmatter,
    code,
  })
}

export default function DocRoute() {
  return (
    <div>
      <p>Sht</p>
    </div>
  )
}
