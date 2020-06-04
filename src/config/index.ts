import { getMirror } from '@/utils/mirror'

export const baseUrl: string = getMirror()

export default {
  baseUrl
}

export const isDev = process.env.NODE_ENV === 'development'