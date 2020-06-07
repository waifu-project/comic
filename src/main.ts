import Vue from 'vue'
import App from './App.vue'
import store from '@/store'

// #######
import topbar from '@/components/topbar.vue'
import glass from '@/components/glass.vue'
import dialog from '@/components/dialog.vue'
import xList from '@/components/list.vue'
import wrapper from '@/components/wrapper.vue'
// #######

Vue.component('topbar', topbar)
Vue.component('glass', glass)
Vue.component('dialog-box', dialog)
Vue.component('x-list', xList)
Vue.component('wrapper', wrapper)

Vue.config.productionTip = false

new App({
  store
}).$mount()
