import { getDataList } from '@/mock'

// 获取首页数据
export const getIndexData = (): Promise<any>=>{
  return Promise.resolve(getDataList(12))
}