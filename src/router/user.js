const User = r => require.ensure([], () => r(require('../components/User.vue')), 'user')
module.exports = {
  'user': {
    name: 'user',
    component: User
  }
}
