const Login = r => require.ensure([], () => r(require('../components/Login.vue')), 'login')
module.exports = {
  '': {
    name: 'login',
    component: Login
  }
}
