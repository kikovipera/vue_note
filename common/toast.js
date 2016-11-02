require('./toast.css')
let conf = {
  bg: '', // 背景色
  icon: false, // scuess✅, cancel❌, warning⚠️
  name: 'opacity', // 动画名opacity scale
  time: '4000', // 显示时间
  hide: false, // loading
  text: '', // 内容
  mask: true, // 遮罩
  className: '',
  position: 'middle' // 位置top, middel, bottom
}
let assign = function() {
  let target = Object()
  for (let index = 0; index < arguments.length; index++) {
    let source = arguments[index]
    if (source != null) {
      for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
  }
  return target
}
const ele = function(tag, opt, r) {
  if (!opt) {
    return document.querySelector(arguments[0])
  } else {
    const note = document.createElement(tag)
    opt.id && (note.id = opt.id)
    opt.cla && (note.className = opt.cla)
    opt.text && (note.innerHTML = opt.text)
    opt.r && (document.body.appendChild(note))
    return note
  }
}
const insert = (obj, note, r) => {
  if (obj.children.length === 0) {
    obj.appendChild(note)
  } else {
    r ? obj.appendChild(note) : obj.insertBefore(note, obj.firstChild)
  }
}

const base = function(opt) {
  this.config = assign(conf, opt || {})
}
base.prototype = {
  _:{},
  mask: null,
  timer: null,
  toast() {
    const mask = ele('#fe-toast-mask')
    const p = this.config.position
    if (this.config.mask) {
      if (mask) {
        this.mask = mask
      } else {
        this.mask = ele('div', { id: 'fe-toast-mask', cla: 'fe-toast-mask', r: true })
      }
    }
    this._[p] = ele('div', { id:  'fe-toast-' + p, cla: 'fe-toast fe-toast-' + p, r: true })
  },
  list(name, text) {
    const list = ele('span', { cla:  'animated ' + name, text: text })
    list.style.background = this.config.bg
    if (this.config.icon) list.innerHTML = '<i class="' + this.config.icon + '"></i>' + list.innerHTML
    return list
  },
  remove(p) {
    clearTimeout(this.timer)
    if (p) { // 删除_中的toast对象
      const toast = this._[p]
      if (toast.children.length === 0) {
        document.body.removeChild(toast)
        delete this._[p]
      }
    } else { // 删除_中全部对象
      for (let i in this._) {
        this._[i] && document.body.removeChild(this._[i])
        delete this._[i]
      }
    }
    if (Object.keys(this._).length !== 0) return
    this.timer = setTimeout(() => {
      this.mask && (document.body.removeChild(this.mask)) // 三个元素同时调用会报错,遮罩已不存在
      this.mask = null
    }, 0)
  },
  event(list, p, time) {
    list.addEventListener('animationend', () => {
      setTimeout(() => {
        list.className = 'animated'
        list.addEventListener('animationend', () => {
          this._[p].removeChild(list)
          if (p === 'middle') {
            this.computed()
          }
          this.remove(p)
        })
      }, time)
    })
  },
  computed() {
    const toast = this._['middle']
    const h = toast.offsetHeight / 2
    toast.style.transform = 'translateY(' + (-h + 'px') + ')'
  }
}
const Toast = function() {
  const arg = arguments[0]
  if (arg) {
    const opt = typeof arg === 'string' ? { text: arg } : arg
    base.call(this, opt || {})
  } else {
    base.call(this)
  }
}

Toast.prototype = Object.create(base.prototype)
Toast.prototype.init = function(opt) {
  const self = this
  this.remove()
  this.config = assign(this.config, opt || {})
  if (!this._[this.config.position]) this.toast()
  const list = this.list('fe-' + this.config.name + ' ' + this.config.className, this.config.text)
  if (!this.config.hide) this.event(list, this.config.position, this.config.time)
  if (this.config.position === 'bottom') {
    insert(this._[this.config.position], list, true)
  } else {
    insert(this._[this.config.position], list)
  }
  if (this.config.position === 'middle') self.computed()
}

function merge(arg) {
  if (typeof arg === 'string') {
    return assign(conf, { text: arg })
  } else {
    return assign(conf, arg)
  }
}
Toast.prototype.error = function() {
  const cf = merge(arguments[0])
  cf.position = 'top'
  cf.className = 'fe-error'
  cf.mask = false
  this.init(cf)
}
Toast.prototype.success = function() {
  const cf = merge(arguments[0])
  cf.position = 'top'
  cf.className = 'fe-text'
  cf.mask = false
  this.init(cf)
}
Toast.prototype.loading = function() {
  const cf = merge(arguments[0] || '')
  cf.className = 'fe-loading'
  cf.text = '' +
  '<div class="mask-loading">' +
  '  <div class="spinner">' +
  '    <div class="double-bounce1"></div>' +
  '    <div class="double-bounce2"></div>' +
  '  </div>' +
  '</div><div>正在加载</div>'
  // cf.icon = 'loader'
  cf.hide = true
  this.init(cf)
}
Toast.prototype.close = function() {
  this.remove()
}

module.exports = new Toast()
