import { isDev as debug } from '@/config'
import { postBodyFace } from '@/interface/tool'
import { getMirror } from './mirror'
import URL from 'url-parse'

const axios = require('@/plugins/axios')

// fixbug: 解决傻逼的多重引用 `bug`
// const { baseUrl } = config
// import config from '@/config'
const baseUrl = getMirror()

axios.setConfig({
  baseUrl,
  debug,
  skipInterceptorResponse: false
})

/**
 * 修改镜像
 */
const dynamicMirror = (req: any): string => {
  let _defalut = req.url
  if (_defalut.search('18comic') >= 0) {
    const baseUrl = getMirror()
    // axios.setConfig({ baseUrl })
    const baseURL = new URL(baseUrl)
    const url = new URL(req.url)
    url.set('hostname', baseURL.hostname)
    const _r = url.toString()
    return _r
  }
  return _defalut;
}

axios.interceptor.request = (req: any)=> {
  const _url = dynamicMirror(req)
  req.url = _url
  // uni.showLoading()
  return req
}

// TODO 取消响应拦截器
axios.interceptor.response = (res: any) => {
  // uni.hideLoading()
  // if (res.code === 0) res.success = true
  // res.success = true
  // res.result = res
  return res
}

export default axios

export const get = (url: string): Promise<any>=> new Promise(res=> {
  _get(url).then(null, (fastData: any)=> {
    const { data } = fastData
    res(data)
  })
})

export const post = (data: postBodyFace): Promise<any>=> new Promise(res=> {
  _post(data).then(null, (fastData: any)=> {
    const { data } = fastData
    res(data)
  })
})

export const _get = (url: string)=> axios.get({ url })
export const _post = (data: postBodyFace)=> axios.post(data)