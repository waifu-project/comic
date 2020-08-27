import { get } from '@/utils/axios'

// 参考: https://developer.hitokoto.cn
export interface sayWordInterface {
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
    // console.error(error)
    /**
     * 网抑云: https://music.163.com/song?id=462523121&userid=266341607
     * 附言: 这首电子音乐意境很高
     */
    const defaultSayWord: sayWordInterface = {
      hitokoto: "登高极目知天地之大，置己苍茫知寸身之微。",
      from: "网抑云"
    }
    return defaultSayWord
  }
}