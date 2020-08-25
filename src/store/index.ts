import Vue from 'vue'
import Vuex from 'vuex'

import fs from './fs'
import comic from './modules/comic'
import settings from './modules/settings'
import reader from './modules/reader'
import cache from './modules/cache'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  modules: {
    comic,
    settings,
    reader,
    cache,
    user,
  },
  plugins: [
    fs()
  ]
})