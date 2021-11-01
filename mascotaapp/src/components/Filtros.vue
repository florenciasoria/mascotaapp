<template>
  <div class="container altura">
    <b-row>
      <b-col class="col-lg-3">
        <b-row>
          <h3>Especie</h3>
          <b-form-checkbox-group v-model="filtro.especie" :options="especie">
          </b-form-checkbox-group>
        </b-row>

        <b-row>
          <h3>Color</h3>
          <b-form-checkbox-group v-model="filtro.color" :options="color">
          </b-form-checkbox-group>
        </b-row>        
        
        <b-row>
          <h3>Edad</h3>
          <b-form-checkbox-group v-model="filtro.edad" :options="edad">
          </b-form-checkbox-group>
        </b-row>   
        
        <b-row>
          <h3>Sexo</h3>
          <b-form-checkbox-group v-model="filtro.sexo" :options="sexo">
          </b-form-checkbox-group>
        </b-row>

      </b-col>

      <b-col>
        <div class="px-3 py-2">
          <b-row>
            <b-col
              class="col-lg-3 m-4 px-3 py-4 cajamascota"
              v-for="mascota in mascotasFiltradas"
              :key="mascota.id"
            >
              <h5 class="pb-2">{{ mascota.nombre }}</h5>
              <p>{{ mascota.edad }}</p>
              <p>{{ mascota.especie }}</p>
              <p>{{ mascota.color }}</p>
              <p>{{ mascota.sexo }}</p>
              <img :src="mascota.foto" > 
              <b-row>
                <b-col>
                  <b-button variant="primary">
                    <router-link :to="'/mascotas/' + mascota.id"
                      >Ver ficha</router-link
                    >
                  </b-button>
                </b-col>
                <b-col>
                  <b-button variant="success"
                    ><router-link :to="'/form-adopcion/' + mascota.id"
                      >¡Quiero adoptarlo!</router-link
                    ></b-button
                  >
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import mascotas from "../assets/js/mascotas";


import { mapGetters } from 'vuex'; 

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      filtro: {
        especie: [],
        edad: [],
        sexo: [],
        color: [],
      },

      especie: [
        { text: "Perro", value: "perro" },
        { text: "Gato", value: "gato" },
      ],

      color: [
        { text: "Negro", value: "negro" },
        { text: "Blanco", value: "blanco" },
      ],

      edad: [
        { text: "Cachorro", value: "cachorro" },
        { text: "Joven", value: "joven" },
        { text: "Adulto", value: "adulto" },
      ], 
      
      sexo: [
        { text: "Macho", value: "macho" },
        { text: "Hembra", value: "hembra" },
      ],

      sexos: ["macho", "hembra"],
      colores: ["negro", "blanco", "naranja", "gris"],

      mascotas,
    };
  },
  computed: {
    mascotasFiltradas() {
      let mascotasF = this.getmascotas;
      return  this.filtrarAnimalesPorEspecie(
              this.filtrarAnimalesPorColor(
              this.filtrarAnimalesPorEdad(
              this.filtrarAnimalesPorSexo(mascotasF))))
    },
    ...mapGetters([
      'getmascotas',
    ]),
  },




  methods: {
    filtrarAnimalesPorEspecie: function (mascotas) {
      if (this.filtro.especie != "")
        return mascotas.filter(m => this.filtro.especie.includes(m.especie));
      else return mascotas;
    },
    filtrarAnimalesPorColor: function (mascotas) {
      if (this.filtro.color != "")
        return mascotas.filter(m => this.filtro.color.includes(m.color));
              else return mascotas;
    },
    
    filtrarAnimalesPorEdad: function (mascotas) {
      if (this.filtro.edad != "")
        return mascotas.filter(m => this.filtro.edad.includes(m.edad));
      else return mascotas;
    },    
    
    filtrarAnimalesPorSexo: function (mascotas) {
      if (this.filtro.sexo != "")
        return mascotas.filter(m => this.filtro.sexo.includes(m.sexo));
      else return mascotas;
    },
  },
};
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
  color: #a3e3dc;
}
* { text-align: left;}
.cajamascota {
  background-color: rgb(255, 255, 255);
  border-radius: 5%;
}
.altura {
  min-height: 80%;
}

img {
  width: 100px;
  height: 80px;
}
</style>
