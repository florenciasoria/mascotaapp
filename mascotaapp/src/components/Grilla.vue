<template>
  <div>

      <b-container fluid>
      </b-container>
      <div class="px-3 py-2">
          <b-row>

                <b-col class="m-4 cajamascota col-3" v-for="mascota in mascotasFiltradas" :key="mascota.id"> 

                <p>{{mascota.nombre}}</p>
                <p>{{mascota.edad}}</p>
                <p>{{mascota.especie}}</p>
                <!-- <router-link :to="'/car/' + car.id">{{ car.id }}</router-link> -->

                <b-button variant="success"><router-link :to="'/mascotas/' + mascota.id">Ver ficha</router-link></b-button>

                </b-col>

          </b-row> 
       
      </div>
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
            mascotas : [
                {id: 1, nombre: "beethoven", edad: "3 meses", especie: "perro"},
                {id: 2, nombre: "nala", edad: "3 meses", especie: "gato"},
                {id: 3, nombre: "alf", edad: "6 meses", especie: "perro"},
                {id: 4, nombre: "arya", edad: "2 años", especie: "gato"},
                {id: 5, nombre: "arya", edad: "2 años", especie: "gato"}
            ],
            especie: ''
        
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

.cajamascota {
    background-color:rgb(255, 255, 255);
    width: 250px;
    height: 150px;
}



</style>
