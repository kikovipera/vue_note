<template>
<div id="login">
  <div class="user_tab">
    <span :class="{'active': menu === 'login'}" @click="setMenu('login')">登录</span>
    <span :class="{'active': menu === 'register'}" @click="setMenu('register')">注册</span>
  </div>
  <div v-show="menu === 'login'" class="user_login">
    <div class="start">
      <input type="text" placeholder="邮箱名" />
    </div>
    <div class="start">
      <input type="password" placeholder="密码" />
    </div>
    <div class="start">
      <a class="submit" @click="login">登录</a>
    </div>
  </div>
  <div v-show="menu === 'register'" class="user_register">
    <div class="start">
      <input type="text" placeholder="邮箱名">
    </div>
    <div class="start">
      <input type="password" placeholder="6-12位密码">
    </div>
    <div class="start">
      <a class="submit" @click="register">注册</a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      menu: 'login'
    }
  },
  ready() {
    Toast.top('1111')
  },
  methods: {
    login() {
      alert('登录')
    },
    register() {
      alert('注册')
    },
    setMenu(key) {
      this.menu = key
    }
  }
}
</script>

<style lang="less">
#login{
  font-size: 14px;
  left: 50%;
  top: 50%;
  width: 30%;
  position: fixed;
  background: #fff;
  min-height: 20%;
  border-radius: 5px 5px;
  transform: translate(-50%, -50%);
  .user_tab{
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: flex;
    border-bottom: 1px solid #ddd;
    span{
      cursor: pointer;
      flex: 1;
    }
    span:nth-child(1){
      border-right: 1px solid #ddd;
    }
    .active{
      color: #1B71E3;
      cursor: default;
      border-bottom: 1px solid #fff;
    }
  }
  input{
    width: 80%;
    height: 18px;
    border-radius: 5px;
    line-height: 18px;
    padding: 8px 12px;
    border: 1px solid #ddd;
  }
  .start{
    padding: 6px 0;
    text-align: center;
  }
  .submit{
    width: 80%;
    color: #fff;
    height: 36px;
    cursor: pointer;
    border-radius: 5px;
    padding: 0 12px;
    display: inline-block;
    line-height: 36px;
    background: #1B71E3;
  }
  .user_login{
    padding: 12px 0;
  }
  .user_register{
    padding: 12px 0;
  }
}
</style>