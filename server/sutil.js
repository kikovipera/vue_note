const msg = require('./message')
module.exports = {
  success(ctx, value) {
    ctx.body = {
      status: 1,
      data: value
    }
    return false
  },
  failed(ctx, code) {
    ctx.body = {
      status: code,
      msg: msg[code]
    }
    return false
  }
  // *checkLogin() {
  //
  // }
}