<template>
  <div class="home">
        <Quiero/>
  </div>
</template>

<script>
// @ is an alias to /src
import Quiero from '@/components/Quiero.vue'

export default {
  name: 'Home',
  components: {
    Quiero
  }
}
</script>

<style>
.home {
    background-color: #e1cde7;
    /* height: 100%; */

}


</style>
