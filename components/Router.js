const Home = r => require.ensure([], () => r(require('./Home.vue')), 'home')
const Login = r => require.ensure([], () => r(require('./Login.vue')), 'login')
const User = r => require.ensure([], () => r(require('./User.vue')), 'user')
export default function (router) {
  router.map({
    '': {
      name: 'User',
      component: User
    },
    'home': {
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
}
