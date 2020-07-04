/**
 * 缓存
 */

import { cacheInterface, themeConcatInterface } from "../types";
import { MutationTree } from 'vuex';
import { shareIndexComicData } from '@/interface';

const state: cacheInterface = {
  index: null,
  theme: null
}

const mutations: MutationTree<cacheInterface> = {
  /**
   * 修改 `index` 数据
   */
  CHANGE_INDEX_DATA(state, data: shareIndexComicData[]) {
    state.index = data
  },
  /**
   * 主题数据
   */
  CHANGE_THEME_DATA(state, data: themeConcatInterface) {
    state.theme  = data
  }
}

export default {
  state,
  mutations,
  namespaced: true
}