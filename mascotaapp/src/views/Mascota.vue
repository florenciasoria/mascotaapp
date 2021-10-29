<template>
  <div class="mascota">
        <Mascota/>
  </div>
</template>

<script>
// @ is an alias to /src
import Mascota from '@/components/Mascota.vue'

export default {
  name: 'Mascotax',
  components: {
    Mascota
  }
}
</script>

<style>
.mascota {
    background-color: #e2aee4;
}
</style>
