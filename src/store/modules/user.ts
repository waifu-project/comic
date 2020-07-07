/**
 * 用户相关
 */

import { userFace } from '../types'
import { MutationTree } from 'vuex'

export const state: userFace = {
  hasLogin: false,
  token: ""
}

export const mutations: MutationTree<userFace> = {
  /**
   * 修改登录状态
   */
  CHANGE_LOGIN_STATUS(state, token: string) {
    state.hasLogin = true
    state.token = token
  }
}

export default {
  state,
  mutations,
  namespaced: true,
}