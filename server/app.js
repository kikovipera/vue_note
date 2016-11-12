const log = str => console.log(str)
const path = require('path')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const mount = require('koa-mount')
const server = require('koa-static')
const render = require('koa-ejs')
const note = require('./route')
const app = Koa()

render(app, {
  root: path.join(__dirname, '/'), //模板
  layout: 'index',
  viewExt: 'html',
  cache: false,
  debug: true
})

app.use(server(path.join(__dirname, '../'))) //静态
app.use(bodyParser())
app.use(note.routes())

app.on('error', function(err) {
    console.log('sent error %s to the cloud', err.message)
    console.log(err)
})

app.listen(7788, () => {
  console.log('localhost:' + 7788)
})

module.exports = app

// require('babel-core/register')({
//   presets: ['es2015-node5', 'stage-3']
// })