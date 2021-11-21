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
  background-color: #ffffff;
  height: 100vh;
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
  margin: 0;
  padding: 0;
  height: 100%;
}

img {
  object-fit: cover;
}
</style>
