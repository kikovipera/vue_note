require('../iconfont/iconfont.css')
require('../common/filter.js')
import vueCommon from '../common/common.js'
import App from './App.vue'
const Home = r => require.ensure([], () => r(require('./Home.vue')), 'home')
const Login = r => require.ensure([], () => r(require('./Login.vue')), 'login')
const User = r => require.ensure([], () => r(require('./User.vue')), 'user')
// import { sync } from 'vuex-router-sync'
// import Home from './Home.vue'
// import Login from './Login.vue'
// import User from './User.vue'
// import store from './vuex/store'
const r = vueCommon.router()

r.map({
  '': {
    name: 'home',
    component: Login
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