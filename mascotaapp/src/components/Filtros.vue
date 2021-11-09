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
        <!-- <b-modal
          id="modal-1"
          title="Confirmar?"
          :data="modalData"
          v-if="modalVisible"
          @close="modalVisible = false"
        >         -->

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
              <img :src="mascota.foto" />
              <b-row>
                <b-col>
                  <!-- <b-button variant="success" v-on:click="openModal(mascota)" -->
                  <b-button
                    variant="success"
                    v-b-modal.my-modal
                    @click="asignarMascota(mascota)"
                    >¡Quiero adoptarlo!</b-button
                  >
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-modal id="my-modal" title="Confirmar?" :data="modalData">
            <p class="my-4">{{modalData.nombre}}</p>
            <b-button variant="success" @click="confirmarAdopcion(mascota)"
              >Confirmar adopción</b-button
            >
          </b-modal>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
//import mascotas from "../assets/js/mascotas";

import service from "../services/mascotas";
import { mapGetters } from "vuex";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      solicitud: {
        idMascota: "",
        idAdoptante: "",
        idPublicador: "",
        estado: "Pendiente"
      },

      filtro: {
        especie: [],
        edad: [],
        sexo: [],
        color: [],
      },
      mascotasInicial: [],
      mascotas: [],
      especie: [
        { text: "Perro", value: "perro" },
        { text: "Gato", value: "gato" },
      ],

      color: [
        { text: "Negro", value: "negro" },
        { text: "Blanco", value: "blanco" },
        { text: "Marron", value: "marron" },
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

      modalVisible: false,
      modalData: null,
    };
  },
  computed: {
    mascotasFiltradas() {
      let mascotasF = this.mascotasInicial;
      console.log("devuelve array de mascotas ", mascotasF);

      return this.filtrarAnimalesPorEspecie(
        this.filtrarAnimalesPorColor(
          this.filtrarAnimalesPorEdad(this.filtrarAnimalesPorSexo(mascotasF))
        )
      );
    },

    // mascotasFiltradas() {

    //   let mascotasF = this.traerMascotas();
    //   console.log("devuelve array de mascotas ", mascotasF)

    //   return  this.filtrarAnimalesPorEspecie(
    //           this.filtrarAnimalesPorColor(
    //           this.filtrarAnimalesPorEdad(
    //           this.filtrarAnimalesPorSexo(mascotasF))))
    // },
    //...mapGetters([
    //  'getmascotas',
    //]),
  },

  async created() {
    this.mascotasInicial = await this.traerMascotas();
  },

  methods: {
    ...mapGetters(["getusuariosLog"]),

    confirmarAdopcion(mascota) {
      const usuario = this.getusuariosLog()
      const soli = {
        idMascota : mascota.id,
        idAdoptante: usuario.id,
        idPublicador: mascota.idPublicador,
        estado: "Pendiente"
      }
        this.agregarAdopcion(soli)
    },

  asignarMascota(mascota){
          this.modalData = mascota;
  },


    openModal(mascota) {
      console.log("Abre el modal");
      console.log(mascota);
      this.modalData = mascota;
      this.modalVisible = true;
    },

    async traerMascotas() {
      const resuGet = await service.get();
      console.log(resuGet);
      const arrayMascotas = resuGet.data;
      console.log(arrayMascotas);
      return arrayMascotas;
    },

    filtrarAnimalesPorEspecie: function (mascotas) {
      if (this.filtro.especie != "")
        return mascotas.filter((m) => this.filtro.especie.includes(m.especie));
      else return mascotas;
    },
    filtrarAnimalesPorColor: function (mascotas) {
      if (this.filtro.color != "")
        return mascotas.filter((m) => this.filtro.color.includes(m.color));
      else return mascotas;
    },

    filtrarAnimalesPorEdad: function (mascotas) {
      if (this.filtro.edad != "")
        return mascotas.filter((m) => this.filtro.edad.includes(m.edad));
      else return mascotas;
    },

    filtrarAnimalesPorSexo: function (mascotas) {
      if (this.filtro.sexo != "")
        return mascotas.filter((m) => this.filtro.sexo.includes(m.sexo));
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
* {
  text-align: left;
}
.cajamascota {
  background-color: rgb(255, 255, 255);
  border-radius: 5%;
}
.altura {
  min-height: 100%;
}

img {
  width: 100px;
  height: 80px;
}
</style>
