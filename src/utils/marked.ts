/**
 * markdown 富文本转为 `rich-text` | `nodes`
 */

import marked from 'marked'
import { faq } from '@/config'

const hpjs = require('@/plugins/html_parse')

const md2Nodes = (md: string): any=> {
  const textContent = marked(md)
  return hpjs(textContent)
}

export const helpTextContent = md2Nodes(faq)

export default md2Nodes