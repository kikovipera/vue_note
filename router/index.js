import Login from './login'
import User from './user'
import Home from './home'
module.exports = {
  Login,
  User,
  Home
}

// const Home = r => require.ensure([], () => r(require('../components/Home.vue')), 'home')
// const Login = r => require.ensure([], () => r(require('../components/Login.vue')), 'login')
// const User = r => require.ensure([], () => r(require('../components/User.vue')), 'user')
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
