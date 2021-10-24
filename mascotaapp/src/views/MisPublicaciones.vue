<template>
  <div class="publicaciones">
    <Publicaciones msg="Mis Publicaciones"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Publicaciones from '@/components/Publicaciones.vue'

export default {
  name: 'Home',
  components: {
    Publicaciones
  }
}
</script>