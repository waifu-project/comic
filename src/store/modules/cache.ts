/**
 * 缓存
 */

import { cacheInterface, themeConcatInterface } from "../types";
import { MutationTree, ActionTree } from 'vuex';
import { shareIndexComicData, waifuItem } from '@/interface';
import { sayWordInterface } from '@/api/share';
import { getWaifuer } from '@/api/v1';

const state: cacheInterface = {
  index: null,
  theme: null,
  homeSayWord: null,
  waifus: null,
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
  },
  /**
   * 添加一言缓存
   */
  CHANGE_HOME_SAY_WORD(state, data: sayWordInterface) {
    state.homeSayWord = data
  },
  /**
   * 老婆们
   */
  CHANGE_WAIFU(state, data: waifuItem[]) {
    state.waifus = data
  }
}

const actions: ActionTree<cacheInterface, any> = {
  /**
   * 获取老婆们
   */
  async fetchWaifuer(ctx) {
    const { commit } = ctx
    const data = await getWaifuer()
    commit('CHANGE_WAIFU', data)
  }
}

export default {
  actions,
  state,
  mutations,
  namespaced: true
}