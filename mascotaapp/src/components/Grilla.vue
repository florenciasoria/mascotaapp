<template>
  <div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
   data() {
      return {
        mainProps: { },
            especie: '',
            color: ''
      }
    },
            computed:{
            mascotasFiltradas(){
                let mascotasF = this.mascotas
                if (this.especie != '') {
                    mascotasF = this.mascotas.filter(p => p.especie == this.especie)
                }
                return mascotasF
            }
        }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #A3E3DC;
}





</style>
