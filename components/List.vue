<template>
<div id="list">

  <div class="start">
    <span @click="addList" class="iconfont icon-tianjia fl icon1"></span>
    <span @click="delList" class="iconfont icon-jianshao fl"></span>
    <span class="fr">{{ noteActive && noteActive.title }}</span>
  </div>

  <div class="node">
    <ul>
      <li v-for="v in list"
          @click="_setListActive(v)"
          :class="{'active': listActive == v}">
        <div class="title">{{ v.title | maxLength 20 }}</div>
        <div class="main">
          <span class="blue">{{ v.createtime }}</span>{{ v.main | maxLength 50 }}
        </div>
      </li>
    </ul>
  </div>

  <div class="empty" v-if="list.length === 0">
    <i class="iconfont icon-sign-for"></i>
  </div>

</div>
</template>

<script>
import { addList, delList, setListActive } from '../vuex/actions'
import { list, listActive, note, noteActive } from '../vuex/getters'

export default {
  vuex: {
    getters: {
      list,
      listActive,
      note,
      noteActive
    },
    actions: {
      addList,
      delList,
      setListActive
    }
  },
  data() {
    return {
      selected: ''
    }
  },
  methods: {
    del() {
      if (confirm('确定删除当前选中的笔记吗?')) {
        this.delList()
      }
    },
    _setListActive(v) {
      this.setListActive(v)
    }
  }
}
</script>

<style lang="less">
.line{
  border-top: 1px solid #F5F5F5;
  border-bottom: 1px solid #C5C5C5;
}
#list{
  float: left;
  width: 300px;
  background: #fff;
  height: 100%;
  line-height: 16px;
  overflow: hidden;
  position: relative;
  border-right: 1px solid #ddd;
  border-radius: 3px 0 0 3px;
  .iconfont{
    cursor: pointer;
    color: #666;
    &:hover{
      color: #000;
    }
  }
  .start{
    height: 30px;
    line-height: 30px;
    padding-right: 12px;
    background: #BEBEBE;
  }
  .item {
    color: #6D6D6D;
    height: 16px;
    padding: 0 6px;
    line-height: 18px;
    background: #E0E0E0;
  }
  li{
    padding: 0 8px;
    &:extend(.line);
    transition:background .06s linear;
  }
  li.active{
    opacity: 1;
    box-shadow: 0px 0px 3px #666;
    background: #ccc;
  }
  .node{
    width: 100%;
    position: absolute;
    left: 0;
    top: 30px;
    bottom: 0;
    overflow-y: auto;
    border-radius: 0 0 0 3px;
  }
  .title{
    font-size: 14px;
    height: 26px;
    line-height: 26px;
  }
  .main{
    height: 52px;
    word-break: break-all;
  }
  .blue{
    margin-right: 6px;
  }
  .icon-jianshao{
    margin-top: -1px;
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
    height: 80px;
    text-align:center;
    .icon-sign-for{
      color: #ddd;
      font-size: 120px;
    }
  }
}
</style>

