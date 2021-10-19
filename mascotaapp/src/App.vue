<template>
  <div id="app">
    <Quiero msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Quiero from './components/Quiero.vue'


export default {
  name: 'App',
  components: {
    Quiero
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
