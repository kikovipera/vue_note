<template>
<note></note>
<div class="parent">
  <list></list>
  <main></main>
</div>
</template>
<script>
import Note from './Note.vue'
import List from './List.vue'
import Main from './Main.vue'

export default {
  components: {
    Note,
    List,
    Main
  }
}
</script>

<style>
.parent{
  overflow:hidden;height:100%;
}
</style>