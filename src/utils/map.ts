import ghCDN from 'github-to-cdn'
import { shareComicFace } from '@/interface';
import { githubStaticProfile } from '@/config/profile';

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

/**
 * 创建静态资源(CDN)
 */
export const createStaticByCDN = (path: string): string=> {
  const res = { ...githubStaticProfile, path }
  return ghCDN(res)
}