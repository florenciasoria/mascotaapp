<template>
  <div id="app">
    <div id="nav">  
      <Header />
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/quieroAdoptar">Quiero</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script >

import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
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
  color: #2c3e50;
  background-color: #A3E3DC;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body, html {
  height: 100%;
}

img {
  object-fit: cover;
}

</style>
