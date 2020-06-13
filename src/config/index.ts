import { getMirror } from '@/utils/mirror'

const injection = require('@/plugins/injection')

export const baseUrl: string = getMirror()

export default {
  baseUrl
}

export let faq: string = injection.faq.ctx
export let version: string = injection.packages.version
export let readme: string = ''

export const isDev = process.env.NODE_ENV === 'development'