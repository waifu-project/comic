import config from '@/config'
import { isDev as debug } from '@/config'
import { postBodyFace } from '@/interface/tool'

const axios = require('@/plugins/axios')

const { baseUrl } = config

axios.setConfig({
  baseUrl,
  debug,
  skipInterceptorResponse: false
})

axios.interceptor.request = (req: any)=> {
  uni.showLoading()
  return req
}

// TODO 取消响应拦截器
axios.interceptor.response = (res: any) => {
  uni.hideLoading()
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

export const _get = (url: string)=> axios.get({ url })
export const _post = (data: postBodyFace)=> axios.post(data)