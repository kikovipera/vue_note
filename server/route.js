// require("babel-polyfill") 可以不用的
const log = str => console.log(str)
const url = require('url')
const uuid = require('uuid') // 没有用mongodb自带的_id
const router = require('koa-router')()
const db = require('./db')
const wrap = require('co-monk') //
const note = wrap(db.get('note'))
const list = wrap(db.get('list'))

// 入口
router.get('/login', function*() {
  yield this.render('index', {
    staticTag: 'app'
  })
})
router.get('/user', function*() {
  yield this.render('index', {
    staticTag: 'app'
  })
})
router.get('/home', function*() {
  yield this.render('index', {
    staticTag: 'app'
  })
})

/*------note------*/
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

/*------list------*/
router.get('/list', function*(next) { // 查询 list
  const _query = url.parse(this.request.url, true).query
  const data = yield list.find({ type: _query.type })
  this.body = { status: 1, data: data }
})
.post('/list', function*(next) { // 添加 list
  let type = this.request.body.type
  if (type !== null) {
    const data = { // 自动加上了_id
      id: uuid.v4(),
      type: type,
      title: '我的笔记',
      main: '',
      createTime: new Date().getTime()
    }
    yield list.insert(data)
    this.body = { status: 1, data: data }
  } else {
    this.body = { status: -1, msg: '类型为空' }
  }
})
.put('/list', function*(next){
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
  // yield list.
})
.del('/list', function*(next){
  const _query = url.parse(this.request.url, true).query
  yield list.remove({ id: _query.id }) // 有没有真正删除不清楚 ？
  this.body = { status: 1 }
})

module.exports = router

// GET（SELECT）：从服务器取出资源（一项或多项）。
// POST（CREATE）：在服务器新建一个资源。
// PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
// PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
// DELETE（DELETE）：从服务器删除资源。

// get: {method: 'GET'},
// save: {method: 'POST'},
// query: {method: 'GET'},
// update: {method: 'PUT'},
// remove: {method: 'DELETE'},
// delete: {method: 'DELETE'}

/*
ar payload = {
    a: 1,
    b: 2
};
var data = new FormData();
data.append( "json", JSON.stringify( payload ) );
fetch("/echo/json/",{
    method: "POST",
    body: data
})
*/