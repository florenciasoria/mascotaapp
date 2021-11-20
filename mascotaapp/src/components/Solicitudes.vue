<template>
  <div class="solicitudes">
    <h1>{{ msg }}</h1>
    <div class="container">
      <div class="row" style="margin-top: 50px">
        <div class="col"></div>
        <b-col class="col-lg-10">
          <div class="">
            <b-row>
              <b-card
                v-for="solicitud in soliMostrar"
                :key="solicitud.id"
                :title="solicitud.nombremascota"
                :img-src="solicitud.mascotafoto"
                img-left
                class="m-2 cardSolicitud"
              >
                <div class="row">
                  <div class="col">
                    <p>{{ solicitud.mascotaedad }}</p>
                    <p>{{ solicitud.mascotaespecie }}</p>
                    <p>{{ solicitud.mascotacolor }}</p>
                    <p>{{ solicitud.mascotasexo }}</p>
                  </div>
                  <div class="col">
                    <h5>Estado de la solicitud</h5>
                    <p>Estado: {{ solicitud.estado }}</p>
                    <b-button
                      v-if="solicitud.estado == 'pendiente'"
                      variant="success"
                      @click="cancelar(solicitud)"
                      >cancelar</b-button
                    >
                  </div>
                </div>
              </b-card>
            </b-row>
          </div>
        </b-col>
      </div>
    </div>
  </div>
</template>



<script>
import { mapGetters } from "vuex";
import apiSolicitudes from "../services/solicitudes";
import apiMascotas from "../services/mascotas";
import { valoresData } from "../assets/js/valoresData.js";
export default {
  name: "Solicitudes",
  props: {
    msg: String,
  },
  data() {
    return {
      soliMostrar: [],
      solicitud: {
        id: "",
        nombremascota: "",
        mascotafoto: "",
        mascotaedad: "",
        mascotaespecie: "",
        mascotacolor: "",
        mascotasexo: "",
        estado: "",
      },
    };
  },
  computed: {},

  methods: {
    ...mapGetters(["getusuariosLog"]),

    buscarUsuario() {
      return this.getusuariosLog();
    },

    async buscarSolicitudes() {
      try {
        const usuarioLog = this.buscarUsuario();
        const soliDelSolicitante = await apiSolicitudes.getBySolicitante(
          usuarioLog.id
        );
        const solisFiltradas = await this.buscarMascotas(
          soliDelSolicitante.data
        );
        return solisFiltradas;
      } catch (error) {
        console.log(error.message);
      }
    },

    async getSolicitudes() {
      try {
        const apisoli = await apiSolicitudes.get();
        return apisoli.data;
      } catch (error) {
        console.log(error.message);
      }
    },
    async buscarMascotas(lista) {
      try {
        const listaAdevolver = [];
        let idx = 0;
        for (const i of lista) {
          const mascotaApi = await apiMascotas.getById(i.idMascota);
          const mascota = mascotaApi.data;
          listaAdevolver.push({
            id: idx,
            nombremascota: mascota.nombre,
            mascotafoto: mascota.foto,
            mascotaedad: mascota.edad,
            mascotaespecie: mascota.especie,
            mascotacolor: mascota.color,
            mascotasexo: mascota.sexo,
            estado: i.estado,
            idApi: i.idSolicitud,
          });
          idx++;
        }
        return listaAdevolver;
      } catch (error) {
        console.log(error.message);
      }
    },

    async cancelar(solicitud) {
      const soli = await this.getSolicitudById(solicitud.idApi);
      soli.estado = valoresData.estadoSolicitud.cancelada;
      await this.actualizarSolicitud(soli);
      this.soliMostrar = [];
      this.soliMostrar = await this.buscarSolicitudes();
    },

    async getSolicitudById(id) {
      try {
        const apisoli = await apiSolicitudes.getById(id);
        return apisoli.data;
      } catch (error) {
        console.log(error.message);
      }
    },

    async actualizarSolicitud(solicitud) {
      try {
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        solicitud.fechaRespuesta = hoy.toLocaleDateString();
        await apiSolicitudes.put(solicitud);
      } catch (error) {
        console.log(error.message);
      }
    },
  },

  async created() {
    //llama a la API para traer la lista de mascotas y la guarda en variable local
    this.soliMostrar = await this.buscarSolicitudes();
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
  color: #42b983;
}

img {
  height: 100%;
  width: 20vw;
  object-fit: cover;
}

.cardSolicitud {
  text-align: left;
  width: 50vw;
  height: 15vw;
}
</style>
