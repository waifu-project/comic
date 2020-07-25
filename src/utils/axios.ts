import { isDev as debug } from '@/config'
import { postBodyFace } from '@/interface/tool'
import { getMirror } from './mirror'
import URL from 'url-parse'
import store from '@/store'
import { userFace } from '@/store/types'

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
 * 镜像中间件
 */
const dynamicMirror = (req: any) => {
  let _defalut = req.url
  const temp = new URL(_defalut)
  const testFlag = temp.host.search('18comic') >= 0
  if (testFlag) {
    const baseUrl = getMirror()
    const baseURL = new URL(baseUrl)
    const url = new URL(req.url)
    url.set('hostname', baseURL.hostname)
    const _r = url.toString()
    req.url = _r
    return
  }
  req.url = _defalut
}

/**
 * 登录中间件
 */
const loginMiddleware = (req: any)=> {
  try {
    const user: userFace = (store.state as any).user
    const { hasLogin, token } = user
    if (hasLogin && token) {
      req['header']['cookie'] = `ipm5=${ token };`
    }
  } catch (error) {
    throw new Error(error)
  }
}

axios.interceptor.request = (req: any)=> {
  dynamicMirror(req)
  loginMiddleware(req)
  return req
}

// TODO 取消响应拦截器
axios.interceptor.response = (res: any) => {
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