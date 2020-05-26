import Vue from 'vue'
import App from './App.vue'

// #######
import glass from '@/components/glass.vue'
import dialog from '@/components/dialog.vue'
import xList from '@/components/list.vue'
// #######

Vue.component('glass', glass)
Vue.component('dialog-box', dialog)
Vue.component('x-list', xList)

Vue.config.productionTip = false

new App().$mount()
