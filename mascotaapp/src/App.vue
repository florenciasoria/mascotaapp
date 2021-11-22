<template>
  <div id="app">
    <div id="nav">
      <Header />
    </div>
    <router-view />
  </div>
</template>
<script>
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>
<style>
#app {
  font-family: "Work Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #faf5f7;
  height: 100%;
  min-height: 100vh;
}

#nav a {
  font-weight: bold;
  color: #ffffff;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body,
html {
  height: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

h1 {
  padding-top: 30px;
}
img {
  object-fit: cover;
}
</style>
