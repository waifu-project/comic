import _url from 'url-parse'
const querystring = require('@/plugins/querystring')

/**
 * 将格式转为对象
 * 支持类型: **?search_query=人妻&b=test**
 */
export const decode = (qs: string): any => {
  let n = qs
  // fixbug: 去除 `?`
  if (qs[0] == '?') n = qs.substring(1)
  return querystring.parse(n)
}

/**
 * 将 `对象` 转为 `字符串`
 * 支持类型: **{ search_query: '人妻' }**
 * @returns [string]
 */
export const encode = (obj: any): string => {
  return '?' + querystring.stringify(obj)
}

/**
 * 合并查询字段
 * @param {String} [qs] - 查询字段
 * @param {Any} [obj] - 合并查询字段的对象
 */
export const mergeQueryString = (qs: string, obj: any) => {
  const URL = new _url(qs)
  const _b = URL.query as unknown as string
  const data = decode(_b)
  Object.assign(data, obj)
  const _R = encode(data)
  const _result: string = `${URL.pathname}${_R}`
  return _result
}

/**
 * 根据文本生成搜索接口
 */
export const createSearchUrl = (text: string): string => {
  return `/search/photos?search_query=${text}`
}

export default {
  decode,
  encode,
  mergeQueryString
}