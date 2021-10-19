<template>
  <div id="app">
    <Header />
    <Quiero msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Quiero from './components/Quiero.vue'


export default {
  name: 'App',
  components: {
    Quiero,
    Header
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: aquamarine;
  /* margin-top: 60px; */
  height: 100%;
}

body, html {
  height: 100%;
}

img {
  object-fit: cover;
}
</style>
