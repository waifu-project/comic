// 参考: https://www.jb51.net/article/172121.htm
// 漫画设定
// 包括:
// - 历史访问
// - 收藏的漫画

import { comicInterface } from '../types'
import { MutationTree, GetterTree } from 'vuex'
import { history_views_max_length } from '@/const'
import { shareComicFace } from '@/interface'
import { copy } from '@/utils'
import timediff from '@/utils/time'
import { searchOptionTimeEnum, searchOptionTypeEnum } from '@/interface/enum'
import { searchOptions } from '@/interface/tool'

const state: comicInterface = {
  searchData: {
    barTitle: '',
    url: ``,
    query: {
      page: 1,
      t: searchOptionTimeEnum.all,
      o: searchOptionTypeEnum.new
    },
  },
  history_views: [],
  collect_lists: []
}

/**
 * 中间方法类型
 */
export enum extType {

  /**
   * 收藏
   */
  collect,

  /**
   * 历史
   */
  history,

}

/**
 * 中间处理方法
 * @param {shareComicFace[]} [fullLists] - 拿到的总数组
 * @param {shareComicFace} [data] - 当前存储的数组
 */
const ext = (fullLists: shareComicFace[], data: shareComicFace, type: extType): shareComicFace[] => {
  const list: shareComicFace[] = copy(fullLists)
  const isCollect = type == extType.collect
  let idx = -1
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    if (element.id === data.id) {
      idx = index
      break
    }
  }
  if (idx >= 0) list.splice(idx, 1)
  const date = Date.now()
  const _now_len = list.length
  if (history_views_max_length && _now_len >= history_views_max_length) {
    list.pop()
  }
  data['reader_time'] = date
  if (!isCollect) list.unshift(data)
  if (isCollect && idx < 0) list.unshift(data)
  try {
    if (isCollect) {
      const ctx = list.length
      plus.runtime.setBadgeNumber(ctx)
    }
  } catch (error) {
    throw new Error(error)
  }
  return list
}

/**
 * 中间处理方法(get获取)
 */
const ext_get = (data: shareComicFace[]): shareComicFace[] => {
  const lists = data.map(item => {
    const text = item.reader_time
    if (text) {
      item['reader_time_text'] = timediff(text) || ""
    }
    return item
  })
  // debugger
  return lists
}

const mutations: MutationTree<comicInterface> = {
  /**
   * 历史记录相关
   */
  CHANGE_HISTORY_VIEWS(state, data: shareComicFace) {
    state.history_views = ext(state.history_views, data, extType.history)
  },
  /**
   * 收藏相关
   */
  CHANGE_COLLECT_LISTS(state, data: shareComicFace) {
    state.collect_lists = ext(state.collect_lists, data, extType.collect)
  },
  /**
   * 清空历史记录
   */
  CLEAN_HISTORY_VIEWS(state) {
    state.history_views = []
  },
  /**
   * 清空收藏
   */
  CLEAN_COLLECT_LISTS(state) {
    state.collect_lists = []
  },
  // 修改搜索 `url`
  CHANGE_SEARCH_URL(state, url: string) {
    state.searchData.url = url
  },
  // 修改 `bar` 标题
  CHANGE_SEARCH_BAR_TITLE(state, title: string) {
    state.searchData.barTitle = title
  },
  /**
   * 修改 `query` 数据
   */
  CHANGE_QUERY_DATA(state, data: searchOptions) {
    Object.assign(state.searchData.query, data)
  }
}

export const getters: GetterTree<comicInterface, any> = {
  /**
   * 历史列表
   */
  historyViews(state): shareComicFace[] {
    return ext_get(state.history_views)
  },
  /**
   * 收藏列表
   */
  collectLists(state): shareComicFace[] {
    return ext_get(state.collect_lists)
  },
  /**
   * 判断是否收藏
   */
  checkFavorite(...args): boolean {
    const lists = args[0].collect_lists
    const id = args[2].reader.currentData.id
    const flag = lists.some(item => item.id === id)
    return flag
  }
}

export default {
  state,
  mutations,
  getters,
  namespaced: true
}