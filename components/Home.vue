<template>
<div class="parent">
  <list></list>
  <main></main>
</div>
</template>

<script>
import List from './List.vue'
import Main from './Main.vue'

export default {
  components: {
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