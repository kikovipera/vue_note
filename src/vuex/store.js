import Vuex from 'vuex'
import note from './modules/note'
import list from './modules/lists'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    note,
    list
  }
})
