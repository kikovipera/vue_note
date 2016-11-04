import Login from './login'
import User from './user'
import Home from './home'

export default Object.assign({},
  Login,
  User,
  Home
)

// const Login = r => require.ensure([], () => r(require('../components/Login.vue')), 'login')
// const User = r => require.ensure([], () => r(require('../components/User.vue')), 'user')
// const Home = r => require.ensure([], () => r(require('../components/Home.vue')), 'home')

// export default {
//   '': {
//     name: 'Login',
//     component: r => require.ensure([], () => r(require('../components/Login.vue')), 'login')
//   },
//   'user': {
//     name: 'user',
//     component: r => require.ensure([], () => r(require('../components/User.vue')), 'user')
//   },
//   'home': {
//     name: 'user',
//     component: r => require.ensure([], () => r(require('../components/Home.vue')), 'home')
//   }
// }
