<template>
<div id="user" class="user">
  <div class="user_tab">
    <span>登录</span>
    <span>注册</span>
  </div>
  <div class="user_login">

  </div>
  <div class="user_register"></div>
</div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style lang="less">
#user{
  position: fixed;
  left: 50%;
  top: 50%;
  width: 50%;
  min-height: 300px;
  background: #fff;
  .user_tab{
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: flex;
    span{
      flex: 1;
    }
  }
  .user_login{

  }
  .user_register{

  }
}
</style>