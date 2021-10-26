<template>
  <div class="container">
    <b-row>
      <b-col>
        <b-row>
                  <h3>Especie</h3>
          <b-form-radio-group v-model="filtro.especie" :options="especie">
          </b-form-radio-group>
        </b-row>
      <b-row >
<h3> Color </h3>
  
          <b-form-radio-group v-model="filtro.color" :options="color">
          </b-form-radio-group>
        </b-row>
      </b-col>

      <b-col>
        <div class="px-3 py-2">
          <b-row>
            <b-col
              class="m-4 cajamascota"
              v-for="mascota in mascotasFiltradas"
              :key="mascota.id"
            >
              <p>{{ mascota.nombre }}</p>
              <p>{{ mascota.edad }}</p>
              <p>{{ mascota.especie }}</p>
              <p>{{ mascota.color }}</p>
              <b-button variant="success"
                ><router-link :to="'/mascotas/' + mascota.id"
                  >Ver ficha</router-link
                ></b-button
              >
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      filtro: {
        especie: "",
        edad: "",
        sexo: "",
        color: "",
      },

      especie: [
        { text: "Perro", value: "perro" },
        { text: "Gato", value: "gato" },
      ],

      color: [
        { text: "Negro", value: "negro" },
        { text: "Blanco", value: "blanco" },
      ],

      mascotas: [
        {
          id: 1,
          nombre: "beethoven",
          edad: "3 meses",
          especie: "perro",
          color: "blanco",
        },
        {
          id: 2,
          nombre: "nala",
          edad: "3 meses",
          especie: "gato",
          color: "negro",
        },
        {
          id: 3,
          nombre: "alf",
          edad: "6 meses",
          especie: "perro",
          color: "negro",
        },
        {
          id: 4,
          nombre: "arya",
          edad: "2 años",
          especie: "gato",
          color: "blanco",
        },
        {
          id: 5,
          nombre: "arya",
          edad: "2 años",
          especie: "gato",
          color: "negro",
        },
      ],

      sexos: ["macho", "hembra"],
      colores: ["negro", "blanco", "naranja", "gris"],
    };
  },
  computed: {
    mascotasFiltradas() {
      let mascotasF = this.mascotas;
      if (this.filtro != "") {
        mascotasF = this.mascotas.filter(
          (p) =>
            p.especie == this.filtro.especie && p.color == this.filtro.color
        );
      }
      return mascotasF;
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
.cajamascota {
  background-color: rgb(255, 255, 255);
  width: 250px;
  height: 150px;
}
</style>
