<template>
  <div class="publicaciones">
    <Cargando v-if="yaCargo == false"></Cargando>
    <Publicaciones msg="Mis Publicaciones" v-on:estamosOk="mostrar" />
  </div>
</template>

<script>
// @ is an alias to /src
import Publicaciones from '@/components/Publicaciones.vue'
import Cargando from '@/components/Cargando.vue'

export default {
  name: 'Home',
  components: {
    Publicaciones, 
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