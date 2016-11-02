require('../iconfont/iconfont.css')
require('../common/filter.js')
import { sync } from 'vuex-router-sync'
import Router from 'vue-router'
import Store from '../vuex/store'
import RouterMap from './Router'
import App from './App.vue'
Vue.use(Router)
const route = new Router({
  root: window.pageConfig.siteUrl || '/',
  mode: 'html5',
  history: true,
  saveScrollPosition: true
})
RouterMap(route)
sync(Store, route)
route.start(App, '.mod-note')
