import { readerFace } from "../types";
import { MutationTree, GetterTree, ActionTree } from 'vuex';
import { shareComicFace } from '@/interface';

const state: readerFace = {
  currentData: null,
  current_id: ''
}

const mutations: MutationTree<readerFace> = {
  /**
   * 设置当前阅读的数据
   */
  SET_CURRENT_READER_DATA(state, data: shareComicFace) {
    state.currentData = data
  },
  /**
   * 设置当前阅读的数据的 `id`
   */
  SET_CURRENT_READER_DATA_ID(state, id: number | string) {
    state.current_id = id
  }
}

const actions: ActionTree<readerFace, any> = {
  /**
   * 下一话
   */
  changeNextReader(ctx, flag: boolean) {
    const { commit, getters, state } = ctx
    const idx: number = getters.current_index
    if (idx === 0 && !flag) return
    const data = state.currentData
    if (!data) return
    const { episode } = data
    if (!episode) return
    if (+episode.length === 1) return
    const index = flag ? (idx + 1) : (idx - 1)
    commit('SET_CURRENT_READER_DATA_ID', episode[index].id)
  }
}

const getters: GetterTree<readerFace, any> = {
  /**
   * 当前索引
   */
  current_index(ctx): number | null {
    const data = ctx.currentData
    if (!data) return null
    const { episode } = data
    if (!episode) return null
    const current_id = ctx.current_id
    let index = null
    episode.forEach((item, i)=> {
      const flag = (item.id == current_id)
      if (flag) index = i
    })
    // debugger
    return index
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}