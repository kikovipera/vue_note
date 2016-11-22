<template>
<div id="user" class="user">
  <div class="user_menu">
    <div class="img"></div>
    <div @click="this.menu='info'"
      :class="{'list active': menu === 'info', 'list': menu === 'password'}">基本信息</div>
    <div @click="this.menu='password'"
      :class="{'list active': menu === 'password', 'list': menu === 'info'}">密码修改</div>
  </div>
  <div class="user_main">
    <div v-show="menu === 'info'">
      <div class="start"><input type="text" name="name" v-model="nick" placeholder="别名" /></div>
      <div class="start"><input type="text" name="phone" v-model="phone" placeholder="手机号" /></div>
      <div class="start"><input type="text" name="mail" v-model="phone" placeholder="邮箱地址" /></div>
    </div>
    <div v-show="menu === 'password'">
      <div class="start"><input type="password" v-model="oldpwd" placeholder="旧密码" name="old" /></div>
      <div class="start"><input type="password" v-model="newpwd" placeholder="新密码" name="new" /></div>
      <div class="start"><input type="password" v-model="newpwd2" placeholder="再输入一次新密码" name="new" /></div>
    </div>
    <div style="padding-top:24px;" class="start"><a @click="save" class="btn">保存</a></div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      menu: 'info',
      nick: '',
      phone: '',
      mail: '',
      oldpwd: '',
      newpwd: '',
      newpwd2: ''
    }
  },
  ready() {
    Toast.success('呵呵')
  },
  methods: {
    save() {
      if (this.menu === 'info') {
        //
      } else {
        //
      }
    }
  }
}
</script>

<style lang="less">
#user{
  height: 100%;
  display: flex;
  margin: 0 auto;
  font-size: 14px;
  background: #fff;
  border: 1px solid #ddd;
  input{
    width: 66%;
    height: 46px;
    line-height: 46px;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ddd;
  }
  .img{
    width: 100px;
    height: 100px;
    overflow: hidden;
    background: #ddd;
    margin-top: 12px;
    margin-bottom: 12px;
    border-radius: 50%;
    display: inline-block;
  }
  .start{
    padding: 6px 0;
  }
  .list{
    display: block;
    cursor: pointer;
    line-height: 46px;
  }
  .list.active{
    color: #1B71E3;
  }
  .user_menu{
    flex: 1;
    text-align: center;
  }
  .user_main{
    padding-top: 124px;
    flex: 3;
    text-align: center;
    background: #f5f5f5;
  }
  .btn{
    cursor: pointer;
    color: #fff;
    width: 60%;
    height: 46px;
    line-height: 46px;
    display: inline-block;
    background-color: #1B71E3;
  }
}
</style>