require('./iconfont/iconfont.css')
require('./common/filter.js')
// import { sync } from 'vuex-router-sync'
import vueCommon from './common/vue_common.js'
import App from './components/App.vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import User from './components/User.vue'
// import store from './vuex/store'
const r = vueCommon.router()

r.map({
  '': {
    name: 'home',
    component: Home
  },
  'index': {
    name: 'home',
    component: Home
  },
  'login': {
    name: 'login',
    component: Login
  },
  'user': {
    name: 'user',
    component: User
  }
})

r.start(App, '.mod-note')

// sync(store, r)
// r.redirect({
//   '*': ''
// })