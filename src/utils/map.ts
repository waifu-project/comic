import { shareComicFace } from '@/interface';

/**
 * @description 将搜索的数格式化一次
 * @param  {shareComicFace[]} lists
 * @returns shareComicFace
 */
export const _coverSearchItem = (lists: shareComicFace[]): shareComicFace[]=> {
  return lists.map(item=> {
    let { title } = item
    // flag: 标题只取 `18` 个词
    const maxWordLength = 18
    if (title.length >= maxWordLength) {
      title = title.replace(/\[(.+?)\]/, '')
    }
    if (title.length >= maxWordLength) {
      title = title.substring(0, maxWordLength)
    }
    // debugger
    item.title = title
    const maxTagLength = 4
    const tags = item.tags.filter(tag=> { 
      if (tag.length <= maxTagLength) return true
    })
    item.tags = tags.slice(0, maxTagLength)
    return item
  })
}