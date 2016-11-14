<template>
<div id="app">
  <router-view></router-view>
</div>
</template>
<script>
import store from '../vuex/store.js'
export default {
  store
}
</script>
<style>
#app {
  width: 100%;
  height: 100%;
  padding: 10px;
  font-size: 16px;
  font-size: 12px;
  background: #232426;
  box-sizing: border-box;
}
/*main note公用*/
.icon1{
  margin-left: 4px;
  padding: 0 8px;
}
@-webkit-keyframes fadeInDown {
    0% {
        opacity: 0;
        -webkit-transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        -webkit-transform: translateY(0);
    }
}
@keyframes fadeInDown {
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.fadeInDown-transition {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
}
.fadeInDown-enter {
    display: block;
}
.fadeInDown-leave {
    display: none;
}
</style>
