require('../iconfont/iconfont.css')
require('../common/filter.js')
import Router from 'vue-router'
import RouteMap from '../router'
import App from './App.vue'
Vue.use(Router)
const route = new Router({
  root: window.pageConfig.siteUrl || '/',
  mode: 'html5',
  history: true,
  saveScrollPosition: true
})
route.map(RouteMap)
// route.redirect({
//   '*': '/home'
// })
route.start(App, '.mod-app')

// import Store from '../vuex/store'
// import { sync } from 'vuex-router-sync'
// sync(Store, route)
// store.state.route.path   // current path (string)
// store.state.route.params // current params (object)
// store.state.route.query  // current query (object)
