import Vue from 'vue'
import Vuex from 'vuex'

import fs from './fs'
import comic from './modules/comic'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  mutations: {
    
  },
  modules: {
    comic
  },
  plugins: [
    fs()
  ]
})