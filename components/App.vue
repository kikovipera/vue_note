<template>
<div id="app">
  <note></note>
  <router-view transition="fadeInDown"></router-view>
</div>
</template>
<script>
import Note from './Note.vue'
import store from '../vuex/store.js'
export default {
  store,
  components: { Note }
}
</script>
<style>
#app {
  width: 100%;
  height: 100%;
  font-size: 16px;
  background: #232426;
  font-size: 12px;
  box-sizing: border-box;
  padding: 10px;
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
