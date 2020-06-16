import { settingsFace } from '../types'
import { MutationTree } from 'vuex'

const state: settingsFace = {
  showDev: false,
  isDark: false,
  showIndexAD: true,
  firstRun: true
}

const mutations: MutationTree<settingsFace> = {
  CHANGE_DEV_FLAG(state, flag) {
    state.showDev = flag
  },
  /**
   * 取反设置 `showDev`
   */
  REVERRSE_DEV_FLAG(state) {
    state.showDev = !state.showDev
  },
  /**
   * 修改 `ui` 主题
   */
  CHANGE_UI_THEME(state, themeFlag: boolean) {
    let style = {
      backgroundColor: 'rgba(0, 0, 0, .8)',
      color: '#fff',
      selectedColor: 'rgb(60, 197, 31)'
    }
    if (!themeFlag) style = {
      backgroundColor: `rgba(255, 255, 255, 0.4)`,
      color: '#333',
      selectedColor: 'rgb(60, 197, 31)'
    }
    // fixbug: setTimeout is work.
    setTimeout(() => {
      uni.setTabBarStyle(style)
    }, 120)
    state.isDark = themeFlag
  },
  CHANGE_INDEX_AD_FLAG(state, flag: boolean) {
    state.showIndexAD = flag
  },
  CHANGE_RUN_FLAG(state, flag: boolean) {
    state.firstRun = flag
  }
}

export default {
  namespaced: true,
  state,
  mutations
}