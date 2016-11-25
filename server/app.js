import path from 'path'
import koa from 'koa'
import bodyParser from 'koa-bodyparser'
import koaRouter from 'koa-router'
import cookie from 'koa-cookie'
import server from 'koa-static'
import render from 'koa-ejs'
import entry from './router/routeEntry'
import note from './router/routeNote'
import list from './router/routeList'
import login from './router/routeLogin'
import wrap from 'co-monk'
import db from './db'

const app = koa()
const router = koaRouter()
render(app, {
  root: path.join(__dirname, '/'), // 静态模板指向目录
  layout: 'index',
  viewExt: 'html',
  cache: false,
  debug: true
})
app.use(server(path.join(__dirname, '../'))) //静态文件指向目录
app.use(bodyParser())
app.keys = ['im a newer secret', 'i like turtle']

const user = wrap(db.get('user'))

app.use(router.routes())
entry(app, router)
login(app, router, wrap(db.get('user')))
note(app, router, wrap(db.get('note')))
list(app, router, wrap(db.get('list')))

app.on('error', function(err) {
  console.log('sent error %s to the cloud', err.message)
  console.log(err)
})

module.exports = app
global.log = str => console.log(str)
