const sutil = {
  success() {
    ctx.body = {
      code: 200,
      data: value
    }
    return false
  },
  failed() {
    ctx.body = {
      code: code,
      message: message[code] || ''
    }
    return false
  }
}

export default sutil