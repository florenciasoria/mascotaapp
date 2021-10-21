<template>
  <div class="home">
        <Quiero msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Quiero from '@/components/Quiero.vue'

export default {
  name: 'Home',
  components: {
    Quiero
  }
}
</script>

<style>
.home {
    background-color: #e2aee4;
}
</style>
