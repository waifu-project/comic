// 参考: https://www.jb51.net/article/172121.htm
// 漫画设定
// 包括:
// - 历史访问
// - 收藏的漫画

import { comicInterface } from '../types'
import { MutationTree } from 'vuex'

const state: comicInterface = {
  searchData: {
    barTitle: '',
    url: ``
  },
  history_aviews: [],
  collect_lists: []
}

const mutations: MutationTree<comicInterface> = {
  // 修改搜索 `url`
  CHANGE_SEARCH_URL(state, url: string) {
    state.searchData.url = url
  },
  // 修改 `bar` 标题
  CHANGE_SEARCH_BAR_TITLE(state, title: string) {
    state.searchData.barTitle = title
  }
}

export default {
  state,
  mutations,
  namespaced: true
}