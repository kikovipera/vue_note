const url = require('url')
const uuid = require('uuid')
module.exports = function(app, router, list) {
  app.use(router.routes())
  router.get('/list', function*(next) { // 查询 list
    const _query = url.parse(this.request.url, true).query
    const data = yield list.find({ type: _query.type })
    this.body = { status: 1, data: data }
  })
  .post('/list', function*(next) { // 添加 list
    let type = this.request.body.type // node _id
    if (type !== null) {
      const data = { // 自动加上了_id
        main: '',
        type: type,
        id: uuid.v4(), // 标识list的id
        title: '我的笔记',
        createTime: new Date().getTime()
      }
      yield list.insert(data)
      this.body = { status: 1, data: [data] }
    } else {
      this.body = { status: -1, msg: '类型为空' }
    }
  })
  .put('/list', function*(next) {
    const d = this.request.body
    const title = d.title
    const main = d.main
    const _id = d.id
    yield list.update({
      id: _id
    }, {
      $set: {
        title: title,
        main: main
      }
    })
    this.body = {
      status: 1
    }
  })
  .del('/list', function*(next){
    const _query = url.parse(this.request.url, true).query
    yield list.remove({ id: _query.id })
    this.body = { status: 1 }
  })

}
