<template>
  <div class="home">

      <Filtros/>

  </div>
</template>

<script>
// @ is an alias to /src

import Filtros from '@/components/Filtros.vue'

export default {
  name: 'Buscar',
  components: {
    Filtros 
  }
}
</script>

<style>
.home {
    background-color: #eecee6;
    /* min-height: 80%; */
}
</style>
