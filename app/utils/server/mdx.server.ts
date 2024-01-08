import { bundleMDX } from 'mdx-bundler'
import { join } from 'path'
import { cwd } from 'process'

import type { FrontMatterType } from '~/types/mdx'

export async function mdxToHtml(source: string) {
  // const { default: gfm } = await importGfm();
  // const { default: emoji } = await importEmoji();
  // const { default: slug } = await importSlug();
  // const { default: highlight } = await importHighlighter();
  // const { default: role } = await importRole();
  // const { default: checkbox } = await importCheckbox();
  // const { default: toc } = await importToC();

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

  try {
    const { code, frontmatter } = await bundleMDX<FrontMatterType>({
      source,
      // mdxOptions(options, frontmatter) {
      //   options.rehypePlugins = [...(options.rehypePlugins || []), slug, role];
      //   options.remarkPlugins = [...(options.remarkPlugins || []), gfm, highlight, emoji, checkbox, toc];

      //   return options;
      // }
    })

    return { code, frontmatter }
  } catch (err) {
    console.error(err)
    throw err
  }
}
