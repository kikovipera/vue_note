const Home = r => require.ensure([], () => r(require('../components/Home.vue')), 'home')
module.exports = {
  'home': {
    name: 'home',
    component: Home
  }
}
