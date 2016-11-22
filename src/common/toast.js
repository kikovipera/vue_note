require('./toast.css')
const ToastBase = function() {
  this.baseConf = {
    bg: 'rgba(000, 000, 000, 0.6)', // 背景色
    icon: false, // scuess✅, cancel❌, warning⚠️
    name: 'scale', // 动画名opacity scale
    time: '4000', // 显示时间
    hide: false, // 是否自动消失
    text: '', // 内容
    mask: true, // 遮罩
    click: true, // 点击消失
    position: 'middle' // 位置top, middel, bottom
  }
  this.config = {}
}
ToastBase.prototype = {
  // 存储当前集合对象
  _: {},
  // 遮罩对象
  mask: null,
  // 定时器
  timer: null,
  // 位置 和 遮罩
  toast() {
    const mask = document.querySelector('#fe-toast-mask')
    const position = this.config.position
    if (this.config.mask) {
      this.mask = mask ?
      mask : ToastCreate('div', {
        r: true,
        id: 'fe-toast-mask',
        cla: 'fe-toast-mask'
      })
    }
    this._[position] = ToastCreate('div', {
      id: `fe-toast-${position}`,
      cla: `fe-toast fe-toast-${position}`,
      r: true
    })
  },
  // 列表
  list(name, text, position) {
    const self = this
    const list = ToastCreate('span', {
      cla: `animated ${name}`,
      text: text
    })
    list.style.background = this.config.bg
    if (this.config.icon) list.innerHTML = `<i class="${this.config.icon}"></i>${list.innerHTML}`
    if (this.config.click) {
      list.addEventListener('click', function(){ // 点击消失 去掉动画执行默认的 消失的动画 ，之后销毁
        this.className = 'animated click' // 这是还没触发倒计时的销毁事件
        this.addEventListener('webkitAnimationEnd', () => { // 消失
          self._[position].removeChild(this.parentNode) // this 指向list
          if (position === 'middle') self.computed()
          self.remove(position)
        })
      })
    }
    return list
  },
  // 销毁
  remove(p) {
    if (p) { // 销毁指定位置模块
      const toast = this._[p]
      if (toast.children.length === 0) { // 位置 里没有列表 就可以干掉他了
        document.body.removeChild(toast)
        delete this._[p]
      }
    } else { // 销毁位置模块
      for (const i in this._) {
        this._[i] && document.body.removeChild(this._[i])
        delete this._[i]
      }
    }
    if (Object.keys(this._).length !== 0) return // 如果还要位置存在 不能消除遮罩层
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.mask && (document.body.removeChild(this.mask)) // 三个元素同时调用会报错,遮罩已不存在
    }, 100)
  },
  // 事件
  event(list, p, time) {
    list.addEventListener('webkitAnimationEnd', () => { // 出现
      setTimeout(() => {
        list.className = 'animated' // 触发消失动画
        list.addEventListener('webkitAnimationEnd', () => { // 消失
          this._[p].removeChild(list.parentNode) // 销毁位置里的列表
          if (p === 'middle') this.computed()
          this.remove(p) // 销毁列表每次都会触发 销毁位置
        })
      }, time) // 消失时间
    })
  },
  // 只有 middle 触发
  computed() {
    const _ = this._['middle']
    const h = _.offsetHeight / 2
    _.style.transform = 'translateY(' + (-h + 'px') + ')'
  }
}

const ToastAssign = function() {
  const target = Object() // 返回新对象 不改变最后一个对象
  for (let index = 0; index < arguments.length; index++) {
    const source = arguments[index]
    if (source != null) {
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
  }
  return target
}
const ToastCreate = (tag, conf = {}) => {
  const note = document.createElement(tag)
  conf.id && (note.id = conf.id)
  conf.cla && (note.className = conf.cla)
  conf.text && (note.innerHTML = conf.text)
  conf.r && (document.body.appendChild(note))
  return note
}
const Toast = function() {
  ToastBase.call(this)
}
Toast.prototype = Object.create(ToastBase.prototype)
Toast.prototype.init = function(opt) {
  // 重置conf
  const conf = this.config = ToastAssign(this.config, opt || {})
  const list = this.list(`fe-${conf.name}`, conf.text, conf.position)
  const par = ToastCreate('div')
  par.appendChild(list)
  // 不存在的位置 就重新创建位置
  if (!this._[conf.position]) this.toast()
  // 创建列表
  if (!conf.hide) this.event(list, conf.position, conf.time) // 不消失
  this._[conf.position].insertAdjacentElement('afterbegin', par)
  if (conf.position === 'middle') this.computed()
}
Toast.prototype.merge = (arg, base) => {
  return typeof arg === 'string' ? ToastAssign(base, { text: arg }) : ToastAssign(base, arg)
}

// 位置
Toast.prototype.top = function() {
  const cf = this.merge(arguments[0], this.baseConf)
  cf.position = 'top'
  this.init(cf)
}
Toast.prototype.middle = function() {
  const cf = this.merge(arguments[0], this.baseConf)
  cf.position = 'middle'
  this.init(cf)
}
Toast.prototype.bottom = function() {
  const cf = this.merge(arguments[0], this.baseConf)
  cf.position = 'bottom'
  this.init(cf)
}

// 文本
Toast.prototype.red = function() {
  const cf = this.merge(arguments[0], this.baseConf)
  cf.bg = 'red'
  this.init(cf)
}
Toast.prototype.green = function() {
  const cf = this.merge(arguments[0], this.baseConf)
  cf.bg = 'green'
  this.init(cf)
}
Toast.prototype.black = function() {
  const cf = this.merge(arguments[0], this.baseConf)
  cf.bg = 'rgba(000, 000, 000, 0.5)'
  this.init(cf)
}

// 图标
Toast.prototype.success = function() { // 成功
  const cf = this.merge(arguments[0], this.baseConf)
  cf.icon = 'iconfont icon-chenggong'
  this.init(cf)
}
Toast.prototype.fail = function() { // 失败
  const cf = this.merge(arguments[0], this.baseConf)
  cf.icon = 'iconfont icon-shibai'
  this.init(cf)
}
Toast.prototype.warning = function() { // 警告
  const cf = this.merge(arguments[0], this.baseConf)
  cf.icon = 'iconfont icon-shibai-copy'
  this.init(cf)
}
Toast.prototype.stop = function() { // 禁止
  const cf = this.merge(arguments[0], this.baseConf)
  cf.icon = 'iconfont icon-jinzhi'
  this.init(cf)
}
Toast.prototype.loading = function() {
  const cf = this.merge(arguments[0] || '', this.baseConf)
  cf.icon = 'loader'
  cf.click = false
  cf.hide = true
  this.init(cf)
}

module.exports = new Toast()
