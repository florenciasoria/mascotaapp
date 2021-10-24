<template>
  <div>
    <b-button v-b-toggle.sidebar-1>Ver filtros</b-button>
    <b-sidebar id="sidebar-1" title="Sidebar" shadow>
      <div class="px-3 py-2">
          <b-row>
            <h3>
                Especie
            </h3>
            <div v-for="especie in especies" :key="especie"> 
                <p>{{especie}}</p>
            </div>
          </b-row> 
          <b-row>
            <h3>
                Edad
            </h3>
            <div v-for="edad in edades" :key="edad"> 
                <p>{{edad}}</p>
            </div>
          </b-row> 
          <b-row>
            <h3>                 
                Sexo            </h3>
            <div v-for="sexo in sexos" :key="sexo"> 
                <p>{{sexo}}</p>
            </div>
          </b-row>
          <b-row>
            <h3>                 
                Color            </h3>
            <div v-for="color in colores" :key="color"> 
                <p>{{color}}</p>
            </div>
          </b-row>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
   data() {
      return {
        mainProps: { blank: true, blankColor: '#777',  width: 175, height: 175, class: 'm1'},
            especies : [
                "gato",
                "perro"
            ],
            edades: [
                "0 - 3 meses",
                "3 - 6 meses",
                "6 - 12 meses",
                "+ 1 año",
                "+ 5 años"
            ],
            sexos: [
                "macho",
                "hembra",
            ] ,           
            colores: [
                "negro",
                "blanco",
                "naranja",
                "gris",
            ]
        
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
