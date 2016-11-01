<template>
<div id="main">
  <div class="start">
    <span class="iconfont icon-jiantou-copy fl icon1" @click="_page('')"></span>
    <span class="iconfont icon-jiantou fl" @click="_page"></span>
  </div>

  <div v-if="ifList">
    <div class="left" @click="selector('#titleMain').select()">
        <input id="titleMain" :value="title" @blur="_setTitle" @keyup.enter="_setTitle" />
    </div>
  </div>

  <div v-if="ifList"
    id="textMain"
    class="main"
    @blur="_setMain"
    placeholder="拖放文件或开始输入"
    contenteditable="true">{{main}}</div>

  <div class="empty btn" v-if="!ifList">
    <i class="iconfont icon-sign-for"></i>
  </div>
</div>
</template>
<script>
import { setTitle, setMain, selector, setListActive } from '../vuex/actions'
import { list, listActive, listIndex, listLength } from '../vuex/getters'

export default {
  vuex: {
    getters: {
      list,
      listActive,
      listIndex,
      listLength
    },
    actions: {
      setTitle,
      setMain,
      setListActive
    }
  },
  computed: {
    ifList() {
      return this.listActive.title ? true : false
    },
    title() {
      if (this.listActive && typeof this.listActive.title === 'string') {
        return this.listActive.title
      } else {
        return ''
      }
    },
    main() {
      const m = selector('#textMain')
      if (this.listActive.main) {
        if (m) m.innerHTML = this.listActive.main
        return ''
      } else {
        if (m) m.innerHTML = ''
        return ''
      }
    }
  },
  methods: {
    _page() {
      let i = this.listIndex // 不可以直接操作listIndex
      let list = null
      if (arguments[0]) {
        list = i < this.listLength - 1 ? this.list[++i] : this.list[0]
      } else {
        list = i > 0 ? this.list[--i] : this.list[this.list.length - 1]
      }
      this.setListActive(list)
    },
    _setTitle(e) {
      const v = e.target.value.trim()
      if (v && this.listActive.title !== v) this.setTitle(v)
      e.target.blur()
    },
    _setMain(e) {
      const v = e.target.innerHTML.trim()
      if (v && this.listActive.main !== v) this.setMain(v)
    }
  }
}
</script>

<style lang="less">
#main{
  height: 100%;
  overflow: hidden;
  background: #fff;
  border-radius: 0 5px 5px 0;
  position: relative;
  .start{
    height: 30px;
    line-height: 30px;
    background: #BEBEBE;
  }
  .iconfont{
    cursor: pointer;
    font-size: 13px;
    color: #666;
    &:hover{
        color: #000;
    }
  }
  .left{
    margin: 0 16px;
    border-bottom: 1px solid #ddd;
  }
  input{
    font-size: 18px;
    height: 26px;
    width: 100%;
    line-height: 26px;
    border: 0 none;
    padding: 6px 0;
  }
  .main{
    padding: 12px 18px;
    min-height: 80px;
    outline: none;
  }
  .main:empty:before{
    color: #ddd;
    content: attr(placeholder);
  }
  .main:focus:before{
    content: none;
  }
  .icon-jiantou{
    padding: 0 8px;
  }
  .empty{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 120px;
    text-align:center;
    .icon-sign-for{
      color: #ddd;
      font-size: 200px;
    }
  }
}
</style>

