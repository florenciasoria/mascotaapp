<template>
  <div class="home">
      <Cargando v-if="yaCargo == false"> </Cargando>
      <Filtros v-on:estamosOk="mostrar"/>

  </div>
</template>

<script>
// @ is an alias to /src

import Filtros from '@/components/Filtros.vue'
import Cargando from '@/components/Cargando.vue'

export default {
  name: 'Buscar',
  components: {
    Filtros , 
    Cargando
  },
    data() {
      return {
        yaCargo: false
      }
  },
  methods: {
    mostrar(){

      this.yaCargo = true
    }
  }
}
</script>

<style scoped>
/* .home {
    background-color: #eecee6; 
    height: 100%;  
} */
</style>
