const uuid = require('uuid')
const sutil = require('./sutil')
module.exports = function(app, router, user) {
  app.use(router.routes())

  router.post('/login', function*(next) {
    const body = this.request.body
    const username = body.username
    const password = body.password
    const info = yield user.findOne({ username, password })

    this.redirect('/home')

    // if (info && info.password === password) {
    //   sutil.success(this, { status: 1 })
    // } else {
    //   sutil.failed(this, 10002)
    // }
    // log(1)
    // this.cookies.set('username', username)
    // log(this.cookies.get('username'))

  })

  router.post('/register', function*(next) {
    const body = this.request.body
    const username = yield user.findOne({ username: body.username })
    if (!body.username || !body.password) {
      sutil.failed(this, 10001)
    }
    if (username) {
      sutil.failed(this, 10003)
    } else {
      body.userId = uuid.v4()
      yield user.insert(body)
      sutil.success(this, { status: 1 })
    }
  })

  return router
}
