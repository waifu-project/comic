import ghCDN from 'github-to-cdn'
import { shareComicFace } from '@/interface';
import { githubStaticProfile } from '@/config/profile';
import { copy } from '.';

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

interface pushDiyInterface {
  /**
   * 数组
   */
  lists: any[]
  /**
   * 最大长度
   */
  maxLen: number
  /**
   * 当前 `push` 的数据
   */
  data: any
}

/**
 * 重组数据
 */
export const _push = (args: pushDiyInterface)=> {
  const { lists, maxLen, data } = args
  const _list = copy(lists)
  const _now_len = _list.length
  if (maxLen && _now_len >= maxLen) {
    _list.pop()
  }
  _list.push(data)
  return _list
}

/**
 * 获取指定范围随机数
 * https://www.cnblogs.com/starof/p/4988516.html
 */
function randomNum(minNum: number,maxNum: number): string {
  const x = Math.random()
  const y = x * ( maxNum - minNum + 1 ) + minNum
  const b = Number.parseInt(`${ y }`)
  return `${ b }`
} 

/**
 * 生成随机id
 * 生成的可能有错误
 * 2020-08-28
 */
export const createRandomID = (): string=> {
  // 因为没有接口, 所以只能把最大值写死了...
  const maxID20200828 = 211914
  // 从 `2` 开始算起, 因为测试 `1` 会跳转到 `4`, 不知道这是什么操作..
  const minID20200828 = 2
  return randomNum(minID20200828, maxID20200828)
}