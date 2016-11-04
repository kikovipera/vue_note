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
// const Login = r => require.ensure([], () => r(require('./components/Login.vue')), 'login')
route.map(RouteMap)
log(RouteMap)
// route.map(Login)
sync(Store, route)
route.start(App, '.mod-note')
