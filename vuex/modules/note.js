// const note = {
//   id: '',
//   type: '', // 唯一标识
//   title: '标题',
//   total: '0'
// }

import {
  SET_NOTE,
  ADD_NOTE,
  DEL_NOTE,
  SET_NOTE_ACTIVE,
  SET_TITLE,
  SET_TOTAL
} from '../mutation-types'

const state = {
  note: [],
  note_active: {}
}

const mutations = {
  [SET_NOTE] (state, note) {
    state.note = note
  },
  [ADD_NOTE] (state, note) {
    state.note.unshift(note)
    state.note_active = note
  },
  [DEL_NOTE] (state) {
    // 删除当前active的note对象
    state.note.splice(state.note.indexOf(state.note_active), 1)
    // 删除后默认选中第一个
    if (state.note.length !== 0) {
      state.note_active = state.note[0]
    }
  },
  [SET_NOTE_ACTIVE] (state, note) {
    state.note_active = note
  },
  [SET_TITLE] (state, title) {
    state.note_active.title = title
  },
  [SET_TOTAL] (state, len) {
    state.note.note_active.total = len
  }
}

export default {
  state,
  mutations
}
