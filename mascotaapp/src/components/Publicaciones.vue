<template>
  <div class="publicaciones">
    <h1>{{ msg }}</h1>
    <div class="container">
      <div class="row" style="margin-top: 50px">
        <div class="col"></div>
        <b-col class="col-lg-10">
          <div class="">
            <b-row>
              <b-card
                v-for="mascota in mascotasMostrar"
                :key="mascota.id"
                :title="mascota.nombre"
                :img-src="mascota.foto"
                img-left
                class="m-2 cardSolicitud"
              >
                <div class="row">
                  <div class="col">
                    <p>{{ mascota.edad }}</p>
                    <p>{{ mascota.especie }}</p>
                    <p>{{ mascota.color }}</p>
                    <p>{{ mascota.sexo }}</p>
                  </div>
                  <div class="col">
                    <h5>Solicitudes</h5>

                    <div v-for="solicitud in mascota.solis" :key="solicitud.id">
                      <div
                        v-if="
                          solicitud.estado == 'pendiente' ||
                          solicitud.estado == 'aceptada'
                        "
                      >
                        <p>Nombre: {{ solicitud.nombre }}</p>
                        <p>Estado: {{ solicitud.estado }}</p>
                        <div v-if="solicitud.estado == 'pendiente'">
                          <b-button
                            variant="success"
                            @click="aceptar(solicitud)"
                            >aceptar</b-button
                          >
                          <b-button
                            variant="danger"
                            @click="rechazar(solicitud)"
                            >rechazar
                          </b-button>
                        </div>
                      </div>
                    </div>
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
import apiPersonas from "../services/personas";
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
      usuarioLog: "",
      missolicitudes: [],
      misMascotas: [],
      mascotasMostrar: [],
    };
  },
  computed: {},

  methods: {
    ...mapGetters(["getusuariosLog"]),

    async buscarUsuario() {
      //buscamos el usuario que está loggeado en la base de datos y nos quedamos con ese
      this.usuarioLog = await this.getUsuario(this.getusuariosLog().id);
    },

    // busca las solicitudes por el Id y las devuelve filtradas si coinciden con el id param.
    buscarSolicitudes(idMascota) {
      let solis = this.missolicitudes;
      const soliDeLaMascota = solis.filter((s) => s.idMascota == idMascota);
      return soliDeLaMascota;
    },

    async getSolicitudes() {
      try {
        const apisoli = await apiSolicitudes.get();
        return apisoli.data;
      } catch (error) {
        //alert("Por favor, refresque la página")
        console.log("holis");
      }
    },

    async getUsuario(id) {
      try {
        const apiPers = await apiPersonas.getById(id);
        return apiPers.data;
      } catch (error) {
        console.log(error.message);
      }
    },

    async getMisMascotas() {
      const misMascotas = [];
      try {
        for (let i = 0; i < this.usuarioLog.mascoPubli.length; i++) {
          misMascotas.push(
            await (
              await apiMascotas.getById(this.usuarioLog.mascoPubli[i])
            ).data
          );
        }
        await this.buscarSolicitudesFiltradas(misMascotas);
      } catch (error) {
        console.log(error.message);
      }
    },

    async buscarSolicitudesFiltradas(mascotasFiltradas) {
      try {
        for (const m of mascotasFiltradas) {
          //esto nos trae todas las solicitudes de una mascota
          const solicitudes = await (
            await apiSolicitudes.getByMascota(m.id)
          ).data;

          let solis = await this.cargarDatosSolicitud(solicitudes);

          // MascotasMostrar: Agrega la mascota y solicitudes que posee
          this.mascotasMostrar.push({
            // ... carga todos los datos de la mascota
            ...m,
            solis,
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    },

    // para cada solicitud, busca el estado, nombre de la persona y ID de la solicitud
    async cargarDatosSolicitud(solicitudes) {
      let solis = [];

      for (const s of solicitudes) {
        const persona = await this.getUsuario(s.idAdoptante);
        solis.push({
          nombre: persona.nombre,
          estado: s.estado,
          soliId: s.idSolicitud,
        });
      }

      return solis;
    },

    async getSolicitudById(id) {
      try {
        const apisoli = await apiSolicitudes.getById(id);
        return apisoli.data;
      } catch (error) {
        console.log(error.message);
      }
    },

    // Rechaza las solicitudes de los usuarios.
    async rechazar(solicitud) {
      const soli = await this.getSolicitudById(solicitud.soliId);
      soli.estado = valoresData.estadoSolicitud.rechazada;
      await this.actualizarSolicitud(soli);
    },

    async aceptar(solicitud) {
      const soli = await this.getSolicitudById(solicitud.soliId);
      soli.estado = valoresData.estadoSolicitud.aceptada;

      await this.cambiarEstadoMascota(soli);
      await this.agregarMascotasAdoptante(soli);
      await this.rechazarRemanentes(soli);
      await this.actualizarSolicitud(soli);
    },

    async cambiarEstadoMascota(soli) {
      // cambio el estado de la mascota a adoptado
      try {
        const masco = await apiMascotas.getById(soli.idMascota);
        masco.data.estado = valoresData.estadoMascota.adoptado;
        await apiMascotas.put(masco.data);
      } catch (error) {
        console.log(error.message);
      }
    },

    async agregarMascotasAdoptante(soli) {
      // obtengo adoptante y le actualizo la lista de mascotas propias
      try {
        const adoptante = await apiPersonas.getById(soli.idAdoptante);
        adoptante.data.mascoPropias.push(soli.idMascota);
        await apiPersonas.put(adoptante.data);
      } catch (error) {
        console.log(error.message);
      }
    },

    async rechazarRemanentes(soli) {
      try {
        const solicitudesARechazar = await apiSolicitudes.getByMascota(
          soli.idMascota
        );
        //obtengo el indice de la solicitud que acepte
        const indiceSoli = solicitudesARechazar.data.findIndex(
          (s) =>
            s.idMascota == soli.idMascota && s.idAdoptante == soli.idAdoptante
        );
        // slice: te devuelve todas menos la que le estas pasando.
        solicitudesARechazar.data.slice(indiceSoli);

        // cancelo todas los solicitudes menos la que acepte
        for (const soliR of solicitudesARechazar.data) {
          soliR.estado = valoresData.estadoSolicitud.rechazada;
          await this.actualizarSolicitud(soliR);
        }
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
        this.mascotasMostrar = [];
        this.misMascotas = await this.getMisMascotas();
      } catch (error) {
        console.log(error.message);
      }
    },
  },

  async created() {
    //llama a la API para traer la lista de mascotas y la guarda en variable local
    await this.buscarUsuario();
    this.misMascotas = await this.getMisMascotas();
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
  width: 70vw;
  /* height: 15vw; */
}
</style>
