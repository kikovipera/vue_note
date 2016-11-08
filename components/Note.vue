<template>
<div id="bar">
  <div class="start">
    <i class="iconfont icon-sign-for"></i>我的笔记本
    <i class="iconfont icon-jiahao fr" @click="addNote"></i>
    <span @click="delNote">删除</span>
  </div>
  <ul>
    <li v-for="v in note" @click="selectNote(v)" :class="{ 'active': v === noteActive }">
      <i class="iconfont icon-tubiaotubiao fl"></i>
      <span class="fl over">{{ v && v.title }}</span>
      <span class="fr num">{{ v.total | maxNumber }}</span>
    </li>
  </ul>
</div>
</template>
<!--
<div class="start">
  <i class="iconfont icon-lajitong"></i>回收站 <span>10</span>
</div>
-->
<script>
// import { note, noteActive } from '../vuex/getters'
import { addNote, delNote, selectNote, getNote } from '../vuex/actions'

export default {
  vuex: {
    getters: {
      // note,
      // noteActive
    },
    actions: {
      addNote,
      delNote,
      selectNote,
      getNote
    }
  },
  created() {
    // this.getNote()
  }
}
</script>
<style lang="less">
@borderColor: #232426;
#bar{
  min-width: 180px;
  height: 100%;
  color: #B8B8B8;
  float: left;
  line-height: 26px;
  padding-right: 10px;
  ul{
    padding: 2px 0;
  }
  li{
    height: 26px;
    border-bottom: 1px solid @borderColor;
    border-radius: 3px;
    padding-right: 4px;
    &:hover{
        color: #fff;
        cursor: pointer;
    }
  }
  li.active{
    color: #fff;
    background: #000;
    border-color: #35383A;
  }
  .start{
    font-size: 13px;
  }
  .over{
    width: 120px;
  }
  .num{
    width: 13px;
  }
  .icon-tubiaotubiao{
    font-size: 12px;
    padding: 0 6px;
    color: #444;
  }
  .icon-sign-for{
    font-size: 15px;
    margin-left: 6px;
    margin-right: 3px;
    color: #1B71E3;
  }
  .icon-jiahao{
    margin-top: 1px;
    margin-right: 5px;
    font-size: 12px;
    &:hover{
        color: #fff;
    }
  }
  .icon-lajitong{
    font-size: 20px;
    margin-left: 2px;
    margin-right: 2px;
  }
}
</style>