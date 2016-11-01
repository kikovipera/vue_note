import VueRouter from 'vue-router'
Vue.use(VueRouter)
// Vue.http.options.timeout = 5000 //VueResource
// Vue.http.options.emulateJSON = true;
const common = {
  router(params) {
    const options = {
      root: window.pageConfig.siteUrl,
      mode: 'html5',
      history: true,
      saveScrollPosition: true
    }
    if (params === 'string') {
      options.root = pageConfig.siteUrl + params
    }
    return new VueRouter(options)
  }
  // pullupLoadFunc(uuid, _this, getListFuncName, end) {
  //   let self = _this;
  //   if (end || self.hasNext || self.end) {
  //     self.$broadcast('pullup:done', uuid)
  //   } else {
  //     self[getListFuncName](function() {
  //       //获取数据之后需要reset一下
  //       self.$nextTick(() => {
  //         self.$refs.scroller.reset()
  //       })
  //     });
  //     //下面这段代码必须在外面reset，否则，第二次加载之后会出现需要拉取两次才能展示信息到底的bug
  //     self.$nextTick(() => {
  //       setTimeout(function() {
  //         self.$broadcast('pullup:reset', uuid)
  //       }, 50)
  //     })
  //   }
  // },
  // pulldownLoadFunc(uuid, _this, getListFuncName) {
  //   let self = _this;
  //   self.$refs.scroller.pullup.render();
  //   self.$broadcast('pullup:reset', uuid)
  //   self[getListFuncName](function() {
  //     //获取数据之后需要reset一下
  //     self.$nextTick(() => {
  //       setTimeout(() => {
  //         self.$refs.scroller.reset()
  //       }, 50)
  //     })
  //   });
  //   //下面这段代码必须在外面reset，否则，第二次加载之后会出现需要拉取两次才能展示信息到底的bug
  //   self.$nextTick(() => {
  //     setTimeout(function() {
  //       self.$broadcast('pulldown:reset', uuid)
  //     }, 50)
  //   })
  // }
}

module.exports = common

// window.addEventListener('orientationchange', createOrientationChangeProxy(function() {
//     alert(window.innerWidth); // 无论是Safari还是Android浏览器都能正确的输出屏宽
// }, window), false);

// (function(dc, win) {
//     var docEl = dc.documentElement,
//         resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
//         recalc = function() {
//             var clientWidth = docEl.clientWidth;
//             if (!clientWidth) return;
//             docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
//         };

//     if (!doc.addEventListener) return;
//     win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);
