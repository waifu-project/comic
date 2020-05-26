import { text, covers } from './data'
import { isNumber } from '@/utils/is'

interface mockCoverData {
  title: string
  cover: string
}

const createData = (len: number): mockCoverData[]=> {
  let result: mockCoverData[] = []
  const maxIndex = len - 1
  covers.forEach((item, index)=> {
    if (index < maxIndex) {
      let title = text[index] ? text[index] :''
      const data: mockCoverData = {
        title,
        cover: item
      }
      result.push(data)
    } else if (index == maxIndex) {
      return
    }
  })
  return result
}

export const getDataList = (len: number): mockCoverData[]=> {
  if (isNumber(len) && len > 0) return createData(len)
  return []
}