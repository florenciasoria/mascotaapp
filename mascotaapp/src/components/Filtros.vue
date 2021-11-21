<template>
  <div class="container altura">
    <b-row>
      <b-col class="col-lg-2">
        <b-row>
          <h3>Especie</h3>
          <b-form-group stacked>
            <b-form-checkbox-group
              v-model="filtro.especie"
              :options="valores.especie"
            >
            </b-form-checkbox-group>
          </b-form-group>
        </b-row>

        <b-row>
          <b-form-group stacked>
            <h3>Color</h3>
            <b-form-checkbox-group
              v-model="filtro.color"
              :options="valores.color"
            >
            </b-form-checkbox-group>
          </b-form-group>
        </b-row>

        <b-row>
          <b-form-group stacked>
            <h3>Edad</h3>
            <b-form-checkbox-group
              v-model="filtro.edad"
              :options="valores.edad"
            >
            </b-form-checkbox-group>
          </b-form-group>
        </b-row>

        <b-row>
          <h3>Sexo</h3>
          <b-form-group stacked>
            <b-form-checkbox-group
              v-model="filtro.sexo"
              :options="valores.sexo"
            >
            </b-form-checkbox-group>
          </b-form-group>
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
              style="width: 17rem"
              class="m-2"
              body-class="d-flex flex-column "
            >
              <p>{{ mascota.edad }}</p>
              <p>{{ mascota.especie }}</p>
              <p>{{ mascota.color }}</p>
              <p>{{ mascota.sexo }}</p>

              <b-button
                v-b-modal.my-modal
                v-if="mascota.sexo == 'hembra'"
                class="mt-auto pt-2"
                @click="asignarMascota(mascota)"
                >¡Quiero adoptarla!</b-button
              >
              <b-btn
                v-b-modal.my-modal
                v-else
                class="mt-auto"
                @click="asignarMascota(mascota)"
                >¡Quiero adoptarlo!</b-btn
              >
            </b-card>
          </b-row>
          <b-modal id="my-modal" title="Confirmar?" :data="modalData">
            <p class="my-4">{{ modalData.nombre }}</p>

            <template #modal-footer>
              <div class="w-100">
                <b-button
                  @click="confirmarAdopcion(modalData)"
                  class="float-right"
                >
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

      return this.filtrarAnimalesPorEspecie(
        this.filtrarAnimalesPorColor(
          this.filtrarAnimalesPorEdad(this.filtrarAnimalesPorSexo(mascotasF))
        )
      );
    },
  },

  async created() {
    //llama a la API para traer la lista de mascotas y la guarda en variable local
    this.mascotasInicial = await this.traerMascotasDeApi();
    this.valores = valoresData;
    //Filtrar por estado
  },

  methods: {
    ...mapGetters(["getusuariosLog"]),

    confirmarAdopcion(mascota) {
      const usuario = this.getusuariosLog();
      if (usuario.id != undefined) {
        const soli = {
          idMascota: mascota.id,
          idAdoptante: usuario.id,
          idPublicador: mascota.idPublicador,
          estado: "pendiente",
          fechaRespuesta: "",
        };
        this.agregarAdopcion(soli);
        this.$router.push("/misSolicitudes");
      } else {
        this.$router.push("/Login");
      }
    },

    asignarMascota(mascota) {
      this.modalData = mascota;
    },

    async agregarAdopcion(soli) {
      try {
        await apiSolicitudes.post(soli);
      } catch (error) {
        console.log(error.message);
      }
    },

    async traerMascotasDeApi() {
      try {
        const resuGet = await apiMascotas.get();
        const arrayMascotas = resuGet.data;
        const usuario = this.getusuariosLog();

        let arrayDevolver = arrayMascotas;
        if (usuario.id != undefined) {
          arrayDevolver = arrayMascotas.filter(
            (m) => m.idPublicador != usuario.id
          );
        }
        //sacar mascotas con solicitudes del usuario logueado

        //pasar a valores data
        arrayDevolver = arrayDevolver.filter((m) => m.estado == "publicado");
        this.$emit('estamosOk', true)
        return arrayDevolver;
      } catch (error) {
        console.log(error.message);
      }
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
p {
  margin-bottom: 0.2rem !important;
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
  background-color: #8969d3;
  border-color: #8969d3;
  text-align: center;
  margin-top: 1em;
}

button:hover {
  background-color: #00b497;
  border-color: #00b497;
}
.btn-secondary:focus {
  background-color: #00b497;
  border-color: #00b497;
  box-shadow: 0 180 151 0.2rem rgb(0 180 151 / 50%) !important;
}
</style>
