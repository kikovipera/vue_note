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
//     component: Login
//   },
//   'user': {
//     name: 'user',
//     component: User
//   },
//   'home': {
//     name: 'user',
//     component: Home
//   }
// }
