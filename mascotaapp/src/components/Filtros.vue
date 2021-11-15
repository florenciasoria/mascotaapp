<template>
  <div class="container altura">
    <b-row>
      <b-col class="col-lg-2">
        <b-row>
          <h3>Especie</h3>
          <b-form-checkbox-group
            v-model="filtro.especie"
            :options="valores.especie"
          >
          </b-form-checkbox-group>
        </b-row>

        <b-row>
          <h3>Color</h3>
          <b-form-checkbox-group
            v-model="filtro.color"
            :options="valores.color"
          >
          </b-form-checkbox-group>
        </b-row>

        <b-row>
          <h3>Edad</h3>
          <b-form-checkbox-group v-model="filtro.edad" :options="valores.edad">
          </b-form-checkbox-group>
        </b-row>

        <b-row>
          <h3>Sexo</h3>
          <b-form-checkbox-group v-model="filtro.sexo" :options="valores.sexo">
          </b-form-checkbox-group>
        </b-row>
      </b-col>

      <b-col class="col">
        <div class="">
          <b-row>
            <b-card
              v-for="mascota in mascotasFiltradas"
              :key="mascota.id"
              :title="mascota.nombre"
              :img-src="mascota.foto"
              img-top
              style="width: 18rem"
              class="m-2"
            >
              <p>{{ mascota.edad }}</p>
              <p>{{ mascota.especie }}</p>
              <p>{{ mascota.color }}</p>
              <p>{{ mascota.sexo }}</p>

              <b-button

                v-b-modal.my-modal
                class="w-100"
                @click="asignarMascota(mascota)"
                >¡Quiero adoptarlo!</b-button
              >
            </b-card>
          </b-row>
          <b-modal id="my-modal" title="Confirmar?" :data="modalData">
            <p class="my-4">{{ modalData.nombre }}</p>

            <template #modal-footer>
              <div class="w-100 ">
              <b-button @click="confirmarAdopcion(modalData)"            class="float-right">
              Enviar solicitud de adopción
            </b-button>
              </div>
            </template>
          </b-modal>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
//import mascotas from "../assets/js/mascotas";

import apiMascotas from "../services/mascotas";
import apiSolicitudes from "../services/solicitudes";
import { mapGetters } from "vuex";
import { valoresData } from "../assets/js/valoresData.js";

export default {
  name: "Grilla",
  props: {
    msg: String,
  },
  data() {
    return {
      solicitud: {
        idMascota: "",
        idAdoptante: "",
        idPublicador: "",
        estado: "Pendiente",
      },
      filtro: {
        especie: [],
        edad: [],
        sexo: [],
        color: [],
      },
      mascotasInicial: [],
      mascotas: [],
      valores: {},

      modalVisible: false,
      modalData: "",
    };
  },
  computed: {
    mascotasFiltradas() {
      let mascotasF = this.mascotasInicial;
      //Filter por estado publicado (no ADOPTADO) y q no sean del usuario logueado
      mascotasF = mascotasF.sort(() => 0.5 - Math.random());

      return  this.filtrarAnimalesPorEspecie(
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
    //llama a la API para traer la lista de mascotas y la guarda en variable local
    this.mascotasInicial = await this.traerMascotasDeApi();
    this.valores = valoresData;
    console.log("Valores Data", valoresData);
    //Filtrar por estado
  },

  methods: {
    ...mapGetters(["getusuariosLog"]),

    confirmarAdopcion(mascota) {
      const usuario = this.getusuariosLog();
      console.log("Usuario logueado ", usuario.id)
      if (usuario.id != undefined){
      const soli = {
        idMascota: mascota.id,
        idAdoptante: usuario.id,
        idPublicador: mascota.idPublicador,
        estado: "Pendiente",
      };
      console.log("Se crea la solicitud",soli)
      //this.agregarAdopcion(soli);
        this.$router.push("/misSolicitudes");
      } else {
        this.$router.push("/LoginU");
      }

    },

    asignarMascota(mascota) {
      this.modalData = mascota;
    },

    async agregarAdopcion(soli) {
      await apiSolicitudes.post(soli);
    },

    async traerMascotasDeApi() {
      const resuGet = await apiMascotas.get();
      const arrayMascotas = resuGet.data;
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

    openModal(mascota) {
      console.log("Abre el modal");
      console.log(mascota);
      this.modalData = mascota;
      this.modalVisible = true;
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
  width: 100%;
  height: 15vw;
  object-fit: cover;
}

.row {
  --bs-gutter-x: 0 !important;
}

button {
  background-color: #8969D3;
  border-color: #8969D3;
  text-align: center;
}

button:hover{
    background-color: #00B497;
  border-color: #00B497;
}
.btn-secondary:focus{
    background-color: #00B497;
  border-color: #00B497;
  box-shadow:0 180 151 0.2rem rgb(0 180 151 / 50%) !important
}
</style>
