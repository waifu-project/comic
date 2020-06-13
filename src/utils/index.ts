import dayjs from 'dayjs'
import { isNumber, isObject } from './is'
import { colors } from '@/const'
import { colorItemInterface } from '@/interface/tool'

const qs = require('@/plugins/qs2string')

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

export const createRandomLen = (len: number): number=> {
  return Math.floor(Math.random()*len)
}

// 返回随机的颜色
export const createRandomColor = (): colorItemInterface=> colors[createRandomLen(colors.length)]

/**
 * 获取域名后缀
 * @param domain 域名
 */
export const easyGetDomainSuffix = (domain: string): string=> {
  const index = domain.lastIndexOf('.')
  return index > 0 ? domain.substring(index + 1) : ""
}

// 路由
export const router = {
  push(url: string, query?: any, isFullPath?: boolean) {
    try {
      let _qs = ''
      if (query && isObject(query)) _qs = `?${ qs(query) }`
      let _c = `/views/${ url }${ _qs }`
      if (isFullPath) _c = `/${ url }${ _qs }`
      uni.navigateTo({
        url: _c
      })
    } catch (error) {
      uni.showModal({
        title: '跳转错误, 未知错误',
        content: error
      })
      throw new Error(error)
    }
  },
  back(delta: number = 1) {
    uni.navigateBack({ delta })
  },
  redirect(url: string) {
    uni.redirectTo({ url: `/views/${ url }` })
  },
  tab(url: string) {
    uni.switchTab({ url: `/views/${ url }` })
  },
  // https://blog.csdn.net/liuxin00020/article/details/104842217
  // 获取当前路由信息
  current() {
    let curRoute: any
    try {
      curRoute  = (this as any).$mp.page; // 直接获取当前页面路由
    } catch (error) {
      let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
      curRoute = routes[routes.length - 1]
    }
    return curRoute
  },
  reload() {
    // TODO 重新加载
  }
}