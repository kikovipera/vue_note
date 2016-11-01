const Fetch = require('../common/fetch')
import * as types from './mutation-types'
export const selector = id => document.querySelector(id)
if (!log) log = str => console.log(str)

/*------note------*/
export const getNote = ({ dispatch, state }) => { // 查询 note
  Fetch('note')
  .then(res => {
    dispatch(types.SET_NOTE, res.data)
    selectNote({ dispatch, state }, res.data[0])
  })
}
export const selectNote = ({ dispatch, state }, note) => { // 选中 note
  if (state.note.note_active === note) return
  dispatch(types.SET_NOTE_ACTIVE, note)
  getList({ dispatch }, note.type)
}
export const addNote = ({ dispatch }) => { // 添加 note
  Fetch('note', { method: 'post' })
  .then(res => dispatch(types.ADD_NOTE, res.data))
}
export const delNote = ({ dispatch, state }) => { // 删除 note
  const type = state.note.note_active.type
  Fetch('note', {
    method: 'delete',
    body: { type }
  })
  .then(res => dispatch(types.DEL_NOTE))
}

/*------list------*/
export const getList = ({ dispatch }, type) => { // 查询 list
  Fetch('list', { body: { type }})
  .then(res => {
    if (res.data.length >= 1) {
      dispatch(types.SET_LIST, res.data)
      setListActive({ dispatch }, res.data[0])
    } else {
      emptyList({ dispatch })
    }
  })
}
export const addList = ({ dispatch, state }) => { // 添加 list
  Fetch('list', {
    method: 'post',
    body: { type: state.note.note_active.type }
  })
  .then(res => {
    dispatch(types.ADD_LIST, res.data)
    setListActive({ dispatch }, res.data[0])
  })
}
export const delList = ({ dispatch, state }) => { // 删除 list
  if (state.list.list.length === 0) return console.log('没list了')
  if (confirm('确定删除当前笔记吗?')) {
    const id = state.list.list_active.id // mongo自带的id
    Fetch('list', {
      method: 'delete',
      body: { id }
    })
    .then(res => dispatch(types.DEL_LIST))
  }
}
export const setTitle = ({ dispatch, state }, title) => {
  Fetch('list', {
    method: 'put',
    body: {
      title,
      main: state.list.list_active.main,
      id: state.list.list_active.id }
  })
  .then(res => {
    dispatch(types.SET_LIST_TITLE, title)
  })
}
export const setMain = ({ dispatch, state }, main) => {
  Fetch('list', {
    method: 'put',
    body: {
      main,
      title: state.list.list_active.title,
      id: state.list.list_active.id }
  })
  .then(res => {
    dispatch(types.SET_LIST_MAIN, main)
  })
}
export const setListActive = ({ dispatch }, list) => dispatch(types.SET_LIST_ACTIVE, list)
export const emptyList = ({ dispatch }) => dispatch(types.EMPTY_LIST)

/*
//第二种调用方式,缺点是不能用mutation的方法
const makeAction = type => ({ dispatch }, ...args) => dispatch(type, ...args)
export const addNote = makeAction('ADD_NOTE')
function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
*/
