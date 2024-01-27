import { readFileSync } from 'fs'
import { bundleMDX } from 'mdx-bundler'
import { join } from 'path'
import { cwd } from 'process'

import type { FrontMatterType } from '~/types/mdx'

import {
  importToC,
  importRole,
  importCheckbox,
  importHighlighter,
  importGfm,
  importSlug,
  importEmoji,
} from '../../exports/esm-module'

export async function mdxToHtml(source: string) {
  const { default: gfm } = await importGfm()
  const { default: emoji } = await importEmoji()
  const { default: slug } = await importSlug()
  const { default: highlight } = await importHighlighter()
  const { default: role } = await importRole()
  const { default: checkbox } = await importCheckbox()
  const { default: toc } = await importToC()

  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = join(
      cwd(),
      'node_modules',
      'esbuild',
      'esbuild.exe'
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = join(
      cwd(),
      'node_modules',
      'esbuild',
      'bin',
      'esbuild'
    )
  }

  // inject Heading into the doc just below the frontmatter
  const injectHeading = (source: string) => {
    const frontMatterEnd = source.indexOf('---', 10) + 3
    return `${source.slice(0, frontMatterEnd)}\n\nimport Heading from './heading.tsx'\nimport Editor from './Editor.tsx'${source.slice(
      frontMatterEnd
    )}`
  }

  try {
    const { code, frontmatter } = await bundleMDX<FrontMatterType>({
      source: injectHeading(source),
      files: {
        './info.tsx': readFileSync(
          join(cwd(), 'app', 'components/plugins/Info.tsx')
        ).toString(),
        './warn.tsx': readFileSync(
          join(cwd(), 'app', 'components/plugins/Warn.tsx')
        ).toString(),
        // './tip.tsx': readFileSync(
        //   join(cwd(), 'app', 'components/plugins/Tip.tsx')
        // ).toString(),
        './heading.tsx': readFileSync(
          join(cwd(), 'app', 'components/plugins/Heading.tsx')
        ).toString(),
        './details.tsx': readFileSync(
          join(cwd(), 'app', 'components/plugins/Details.tsx')
        ).toString(),
        './Editor.tsx': readFileSync(
          join(cwd(), 'app', 'components/plugins/Editor.tsx')
        ).toString(),
        './snippet.tsx': readFileSync(
          join(cwd(), 'app', 'components/plugins/Snippet.tsx')
        ).toString(),
      },
      mdxOptions(options) {
        options.rehypePlugins = [...(options.rehypePlugins || []), role, slug]
        options.remarkPlugins = [
          ...(options.remarkPlugins || []),
          checkbox,
          highlight,
          toc,
          gfm,
          emoji,
        ]

        return options
      },
    })

    return {
      code,
      frontmatter: {
        ...frontmatter,
        toc: frontmatter.toc ?? true,
        hidden: frontmatter.hidden ?? false,
        alternateTitle: frontmatter.alternateTitle ?? frontmatter.title,
      },
    }
  } catch (err) {
    console.error(err)
    throw err
  }
}
