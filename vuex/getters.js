//获取列表
export const list = state => state.list.list
export const listActive = state => state.list.list_active
export const listIndex = state => state.list.list.indexOf(state.list.list_active)
export const listLength = state => state.list.list.length

//获取集合
export const note = state => state.note.note
export const noteActive = state => state.note.note_active

//route
export const paths = state => state.route.path
export const params = state => state.route.params
export const query = state => state.route.query
