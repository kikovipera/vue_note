Vue.filter('maxLength', (v, n) => {
  if (v && typeof v === 'string') {
    v = v.replace(/<\/?[^>]*>/g, '')
    v = v.replace(/&nbsp;/ig, '')
    return v.substr(0, n)
  } else {
    return '暂无内容'
  }
})

Vue.filter('maxNumber', v => {
  return v >= 99 ? 99 : v
})

const ScrollText = (s, fn, t) => {
  this.s = s.split('')
  this.fn = fn
  this.t = t || 300
}
ScrollText.prototype = {
  start() {
    //alert(this);//ScrollText Instance
    clearInterval(this.interval)
    const s = this.s
    const fn = this.fn
    this.interval = setInterval(() => {
      //this//window
      s.push(s.shift())
      fn(s.join(''))
    }, this.t)
  },
  stop() {
    clearInterval(this.interval)
  }
}
