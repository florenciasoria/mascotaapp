<template>
  <div class="solicitudes">
    <Solicitudes msg="Mis Solicitudes"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Solicitudes from '@/components/Solicitudes.vue'

export default {
  name: 'Home',
  components: {
    Solicitudes
  }
}
</script>