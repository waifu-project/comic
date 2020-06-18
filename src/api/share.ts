import { get } from '@/utils/axios'

// 参考: https://developer.hitokoto.cn
interface sayWordInterface {
  created_at?: string // 创建时间
  creator?: string // 未知
  creator_uid?: number // 创建id
  from?: string // 来自
  from_who?: string // 未知
  hitokoto?: string // say
  id?: number
  reviewer?: number // 阅读量
  type?: number // lei'xi
  uuid?: string
}

// 一言
export const getWord = async (): Promise<sayWordInterface>=> {
  try {
    const data: sayWordInterface = await get('https://v1.hitokoto.cn/')
    return data
  } catch (error) {
    console.error(error)
    return {}
  }
}