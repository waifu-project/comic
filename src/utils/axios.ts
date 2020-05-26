import config from '@/config'
import { isDev as debug } from '@/config'
import { postBodyFace } from '@/interface/tool'

const axios = require('@/plugins/axios')

const { baseUrl } = config

axios.setConfig({ baseUrl, debug })

axios.interceptor.request = (req: any)=> {
  uni.showLoading()
  return req
}

axios.interceptor.response = (res: any) => {
  uni.hideLoading()
  if (res.code === 0) res.success = true
  return res
}

export default ins

export const get = (url: string)=> axios.get({ url })
export const post = (data: postBodyFace)=> axios.post(data)