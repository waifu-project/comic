import { getMirror } from '@/utils/mirror'

export const baseUrl: string = getMirror()

export default {
  baseUrl
}

export let version: string = ''
export let readme: string = ''
try {
  const _P: any = require('../../package.json')
  version = _P.version
} catch (error) {
  console.error('读取失败, 错误栈: ', error)
}

export const isDev = process.env.NODE_ENV === 'development'