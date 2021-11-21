<template>
  <div class="solicitudes">
    <Cargando v-if="yaCargo == false"></Cargando>
    <Solicitudes msg="Mis Solicitudes" v-on:estamosOk="mostrar" />
  </div>
</template>

<script>
// @ is an alias to /src
import Solicitudes from '@/components/Solicitudes.vue'
import Cargando from '@/components/Cargando.vue'

export default {
  name: 'Home',
  components: {
    Solicitudes, 
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

