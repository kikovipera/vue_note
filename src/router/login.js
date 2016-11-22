const Login = r => require.ensure([], () => r(require('../components/Login.vue')), 'login')
module.exports = {
  'login': {
    name: 'login',
    component: Login
  }
}
