import { copy } from '.'

export const isObject = (x: any): boolean => {
  return typeof x === 'object' && x !== null
}

export const isString = (x: any): boolean => {
  return typeof x === 'string'
}

export const isNumber = (data: number | string, isReturn?: boolean): boolean | number=> {
  const newVal = copy(data)
  const newVal1 = +newVal
  if (Number.isNaN(newVal1)) return false
  if (typeof newVal1 === 'number') {
    if (isReturn) return newVal
    return true
  }
  return false
}

// https://stackoverflow.com/a/5717133/10272586
export const isURL = (str: string): boolean=> {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

// 判断全屏
export const isFullScreen = (): boolean=> {
  return plus.navigator.isFullscreen()
}

export const isIos = (): boolean=> {
  return uni.getSystemInfoSync().platform === 'ios'
}

export const isAndroid = (): boolean=> {
  return uni.getSystemInfoSync().platform === 'android'
}