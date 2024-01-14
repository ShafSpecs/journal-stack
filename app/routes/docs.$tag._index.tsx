import { json, redirect } from '@remix-run/node'
import type { LoaderFunctionArgs } from '@remix-run/node'

import {
  getPostContent,
  redirectToFirstPost,
  tagHasIndex,
} from '~/utils/server/doc.server'
import { mdxToHtml } from '~/utils/server/mdx.server'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const tag = params.tag ?? 'main'
  const hasIndex = tagHasIndex(tag)

  if (!hasIndex) {
    throw redirect(`/docs/${tag}/${await redirectToFirstPost(tag)}`)
  }

  const postContent = (await getPostContent(tag, '/')) ?? '' // handle null cases later
  const { code, frontmatter } = await mdxToHtml(postContent)

  return json({
    frontmatter,
    code,
  })
}

export default function TagRoute() {
  return (
    <div>
      <p>Escapee</p>
      Sht - index
    </div>
  )
}
