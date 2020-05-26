import dayjs from 'dayjs'
import { isNumber } from './is'

// 获取网络状态
export const getNetwork = (): Promise<any> => {
  return new Promise((res, rej) => {
    uni.getNetworkType({
      success: r => res(r.networkType),
      fail: err => rej(err)
    })
  })
}

interface deviceWidthAndHeight {
  width: number
  height: number
}

// 获取设备宽高
export const getWidthAndHeight = (): deviceWidthAndHeight=> {
  const result: deviceWidthAndHeight = { width: 0, height: 0 }
  const data = uni.getSystemInfoSync()
  result.width = data['windowWidth'] || 0
  result.height = data['windowHeight'] || 0
  return result
}

interface jqueryArgsInterface {
  hack: Vue
  ele: string | string[]
}

export const jquery = (data: jqueryArgsInterface): Promise<any> => {
  try {
    const { hack, ele } = data
    const query = uni.createSelectorQuery().in(hack)
    const exec = (ele: string)=> new Promise((res=> {
      query.select(ele).boundingClientRect((data: any)=> {
        res(data)
      }).exec()
    }))
    return new Promise(async res=> {
      let result: any = null
      if (typeof ele === 'string') {
        result = await exec(ele)
      } else if (Array.isArray(ele)){
        let temp = ele
        const next = temp.map(async item=> {
          const data = await exec(item)
          return data
        })
        const sp = Promise.all(next)
        result = sp
      }
      res(result)
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const $ = jquery

// 格式化
// 参考: https://www.codota.com/web/assistant/code/rs/5c7cb0752ef5570001df2fd3#L97
export const toIpAddress = (ipAddress: any): string => {
  try {
    let x1 = ipAddress & 0xff, x2 = ipAddress >> 8 & 0xff, x3 = ipAddress >> 16 & 0xff, x4 = ipAddress >> 24 & 0xff
    return `${ x1 }.${ x2 }.${ x3 }.${ x4 }`
  } catch (error) {
    console.error(error)
    return ''
  }
}

// 浅拷贝, 主要为了解决 `ts` 语法问题和js内存机制
export const copy = (data: any): any=> {
  try {
    const newVal = data
    return JSON.parse(JSON.stringify(newVal))
  } catch (error) {
    throw new Error(error)
  }
}

// 生成空的数组
export const MockCreateArray = (len: number): any[]=> {
  if (!isNumber(len)) return []
  return Object.keys([...new Array(len)])
}

// 获取当前格式化好的时间
export const getCurrentTime = (): string=> {
  const now = dayjs().format('YYYY-MM-DD-HH:mm:ss')
  return now
}

// 生成一个uuid
// https://stackoverflow.com/a/46352326/10272586
export const createID = ()=> Math.random().toString(26).slice(2)

// 路由
export const router = {
  push(url: string) {
    try {
      // TODO 防止页面栈溢出, 存在该页之后, 将跳转过去
      const list = getCurrentPages()
      let redirectToFlag = false
      for (let index = 0; index < list.length; index++) {
        const element = list[index]
        if (element.route && element.route.search(url) > -1) {
          redirectToFlag = true
          break
        }
      }
      let key: any = redirectToFlag ? 'redirectTo' : 'navigateTo';
      (uni as any)[key]({ url: `/pages/${url}` })
    } catch (error) {
      throw new Error(error)
    }
  },
  back(delta: number = 1) {
    uni.navigateBack({ delta })
  },
  redirect(url: string) {
    uni.redirectTo({ url })
  }
}