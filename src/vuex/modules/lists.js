// const list = {
//   type: 'note.type', // 类型
//   title: '标题',
//   main: '内容',
//   createtime: '创建时间',
//   updatetime: '更新时间'
// }

import {
  SET_LIST,
  SET_LIST_ACTIVE,
  SET_LIST_TITLE,
  SET_LIST_MAIN,
  EMPTY_LIST,
  ADD_LIST,
  DEL_LIST
} from '../mutation-types'

const state = {
  list: [],
  list_active: {}
}

const mutations = {
  [SET_LIST] (state, list) {
    state.list = list
  },
  [SET_LIST_ACTIVE] (state, list) {
    state.list_active = list
  },
  [SET_LIST_TITLE] (state, title) {
    state.list_active.title = title
  },
  [SET_LIST_MAIN] (state, main) {
    state.list_active.main = main
  },
  [EMPTY_LIST] (state, list) {
    state.list = []
    state.list_active = {}
  },
  [ADD_LIST] (state, list) {
    state.list.unshift(list)
    state.list_active = list
  },
  [DEL_LIST] (state, list) {
    if (list) {
      const i = state.list.indexOf(list)
      if (i >= 0) {
        state.list.splice(i, 1)
      } else {
        console.log('你删除的啥玩意,不在state.list列表中')
      }
    } else {
      state.list.$remove(state.list_active)
    }
    state.list.length > 1 ? state.list_active = state.list[0] : state.list_active = {}
  }
}

export default {
  state,
  mutations
}
