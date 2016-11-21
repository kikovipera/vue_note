const url = require('url')
const uuid = require('uuid') // 没有用mongodb自带的_id

module.exports = function(app, router, note) {
  app.use(router.routes())
  router.get('/note', function*(next) { // 查询 note
    let data = yield note.find({})
    if (data.length === 0) {
      data = { title: '默认笔记', total: '0', type: uuid.v1() }
      yield note.insert(data)
      this.body = { status: 1, data: [data] }
    } else {
      this.body = { status: 1, data: data }
    }
  })
  .post('/note', function*(next) { // 创建 note
    const defaultNote = { title: '默认笔记', total: '0', type: uuid.v1() }
    yield note.insert(defaultNote)
    this.body = { status: 1, data: defaultNote }
  })
  .del('/note', function*(next) { // 删除 note
    const _query = url.parse(this.request.url, true).query
    yield note.remove({ type: _query.type })
    this.body = { status: 1 }
  })
}