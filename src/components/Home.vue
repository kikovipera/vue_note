<template>
<note></note>
<div class="parent">
  <list></list>
  <Main></Main>
</div>
</template>
<script>
import Note from './Note.vue'
import List from './List.vue'
import Main from './Main.vue'
import Store from '../vuex/store'
export default {
  Store,
  components: {
    Note,
    List,
    Main
  }
}
</script>
<style>
.parent{
  overflow:hidden;
  height:100%;
}
</style>
