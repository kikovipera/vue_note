require('./iconfont/iconfont.css')
require('./common/filter.js')
import { sync } from 'vuex-router-sync'
import Router from 'vue-router'
import Store from './vuex/store'
import RouteMap from './router'
import App from './components/App.vue'
Vue.use(Router)
const route = new Router({
  root: window.pageConfig.siteUrl || '/',
  mode: 'html5',
  history: true,
  saveScrollPosition: true
})
route.map(RouteMap)
route.redirect({
  '*': '/login'
})
sync(Store, route)
route.start(App, '.mod-app')
// store.state.route.path   // current path (string)
// store.state.route.params // current params (object)
// store.state.route.query  // current query (object)