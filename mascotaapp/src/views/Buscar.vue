<template>
  <div class="home">
    <div class="col-3">
<Filtros/>
      </div>
      <div class="col-9">
            <Grilla/>
              </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Grilla from '@/components/Grilla.vue'
import Filtros from '@/components/Filtros.vue'

export default {
  name: 'Buscar',
  components: {
    Grilla,
    Filtros
  }
}
</script>

<style>
.home {
    background-color: #e2aee4;
}
</style>
