// 参考: https://www.jb51.net/article/172121.htm
// 漫画设置
// 包括:
// - 历史访问
// - 收藏的漫画

import { comicInterface } from '../types'
import { MutationTree } from 'vuex'

const state: comicInterface = {
  searchData: {
    url: ``,
    page: 1,
    total_page: 1,
    isNext: false
  },
  history_aviews: [],
  collect_lists: []
}

const mutations: MutationTree<any> = {
  resetPage(state) {
    state.searchData.page = 1
  },
  addPage(state) {
    state.searchData.page++
  }
}

export default {
  state,
  mutations,
  namespaced: true
}