export const importToC = async () => import('../remark/toc')
export const importRole = async () => import('../rehype/role')
export const importCheckbox = async () => import('../rehype/checkbox')
export const importHighlighter = async () => import('../remark/highlight')
export const importGfm = async () => import('remark-gfm')
// @ts-expect-error
export const importEmoji = async () => import('remark-emoji')
export const importSlug = async () => import('rehype-slug')

export const imports = {
  // importPrism: async () => import('rehype-prism-plus/common'),
  // importPrismOG: async () => import('rehype-prism'),
}
