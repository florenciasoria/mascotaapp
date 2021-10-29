<template>
  <div class="form-adopciones">
    <img alt="Vue logo" src="../assets/logo.png">
    {{ $route.params.id }}
  </div>
</template>

<script>
import mascotas from '../assets/mascotas';

export default {
  name: "form-adopcion",
  data() {
    return { 
    }
  },
  computed: {
    mascotaForm() {
        console.log(this.$route.params.id);
      return mascotas.filter((mascota) => mascota.id == this.$route.params.id)
    },
  },
};
</script>