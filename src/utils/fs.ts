import url from 'url-parse'
import { isObject } from './is'
import { mirror_key, mirror_default_key } from '@/const/key'
import { getMirror } from './mirror'

class fs {
  static Join(str: string): string {
    const now = getMirror()
    const __URL = new url(now)
    __URL.set('pathname', str)
    return __URL.toString()
  }

  static checkLocalStorage(): boolean {
    try {
      localStorage.setItem('x','1')
      localStorage.removeItem('x')
      return true
    } catch (error) {
      console.error('不支持 localStorage')
      return false
    }
  }
  
  static setData(key: string, value: any): boolean {
    try {
      if (isObject(value)) value = JSON.stringify(value)
      uni.setStorageSync(key, value)
      return true
    } catch (error) {
      console.error(`set item by ${ key } is error: `, error)
      return false
    }
  }

  static getData(key: string, defaultVal: any = []): any {
    let result = ""
    try {
      result = uni.getStorageSync(key) || ""
      if (!result) return defaultVal
      else return JSON.parse(result)
    } catch (error) {
      console.error('get the key item is error: ', error)
      result = defaultVal
    }
    return result
  }
}

export class io extends fs {
  static setMirror = (value: any): boolean=> {
    const time = Date.now()
    // flag: 临时改变为对象
    const flag = io.setData(mirror_key, {
      value,
      time
    })
    return flag
  }
  static getMirror = (): any => {
    // flag: 临时改变为对象
    const data = io.getData(mirror_key, {
      value: mirror_default_key
    })
    return data
  }
}

export default fs