<template>
  <div class="formulario">
      <form-adopcion/>
  </div>
</template>

<script>
// @ is an alias to /src
import formAdopcion from '@/components/formAdopcion.vue'

export default {
  name: 'formAdopcion',
  components: {
    formAdopcion
  }
}
</script>
