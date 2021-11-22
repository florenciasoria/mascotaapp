<template>
  <div class="publicaciones">
    <h1>{{ msg }}</h1>
    <div class="container">
      <div class="row" style="margin-top: 50px">
        <div class="col"></div>
        <b-col class="col-lg-10 mb-5">
          <div class>
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
                    <div v-if="mascota.solis.length > 0">
                      <div
                        v-for="solicitud in mascota.solis"
                        :key="solicitud.id"
                      >
                        <div
                          class="w-100"
                          v-if="
                            solicitud.estado == 'pendiente' ||
                            solicitud.estado == 'aceptada'
                          "
                        >
                          <p>Nombre: {{ solicitud.nombre }}</p>
                          <p>Estado: {{ solicitud.estado }}</p>
                          <div
                            v-if="solicitud.estado == 'pendiente'"
                            class="mb-4 mx-3"
                          >
                            <div class="row">
                              <b-button
                                variant="outline-danger"
                                class="px-3 mr-3"
                                @click="rechazar(solicitud)"
                                >rechazar</b-button
                              >
                              <b-button
                                variant="success"
                                class="px-3 ml-3"
                                @click="aceptar(solicitud)"
                                >aceptar</b-button
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      {{ mascota.nombre }} todavía no tiene solicitudes
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
      return await this.getUsuario(this.getusuariosLog().id);
    },

    async getMisMascotas() {
      try {
        const mascotasCompletas = await (await apiMascotas.get()).data;
        for (let i = 0; i < this.usuarioLog.mascoPubli.length; i++) {
          this.misMascotas.push(
            mascotasCompletas.find((m) => m.id == this.usuarioLog.mascoPubli[i])
          );
        }
        await this.buscarSolicitudesFiltradas(this.misMascotas);
      } catch (error) {
        console.log(error.message);
      }
    
    },

    // filtro solicitudes para cada mascota
    async buscarSolicitudesFiltradas(mascotasFiltradas) {
      try {
        for (const m of mascotasFiltradas) {
          const soliFiltradas = this.buscarSolicitudes(m.id);

          let solis = await this.cargarDatosSolicitud(soliFiltradas);

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

    // busca las solicitudes por el Id y las devuelve filtradas si coinciden con el id param.
    buscarSolicitudes(idMascota) {
      const soliDeLaMascota = this.missolicitudes.filter(
        (s) => s.idMascota == idMascota
      );
      return soliDeLaMascota;
    },

    async getSolicitudes() {
      try {
        const apisoli = await apiSolicitudes.get();
        return apisoli.data;
      } catch (error) {
        console.log("Mensaje de error ", error);
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
      const soli = this.missolicitudes.find(
        (s) => s.idSolicitud == solicitud.soliId
      );
    

      soli.estado = valoresData.estadoSolicitud.rechazada;
      await this.actualizarSolicitud(soli);
      this.misMascotas = [];
      this.mascotasMostrar = [];
      await this.getMisMascotas();
    },

    async aceptar(solicitud) {
      const soli = this.missolicitudes.find(
        (s) => s.idSolicitud == solicitud.soliId
      );
     
      if (soli == undefined || soli == null) {
        console.log("no funciona!!!!");
      } else {
        soli.estado = valoresData.estadoSolicitud.aceptada;

        // cambia el estado mascota
        await this.cambiarEstadoMascota(soli);
        // agrega a la Mascotas al array del Adoptante
        await this.agregarMascotasAdoptante(soli);
        // le agrego fecha a las solicitudes
        await this.actualizarSolicitud(soli);

        // rechazo solicitudes Remanentes
        await this.rechazarRemanentes(soli);

       //inicializo arrays para mostrar
        this.misMascotas = [];
        this.mascotasMostrar = [];
        await this.getMisMascotas();
      }
    },

    async cambiarEstadoMascota(soli) {
      // cambio el estado de la mascota a adoptado
      try {
        const masco = this.misMascotas.find((m) => m.id == soli.idMascota);
  
        masco.estado = valoresData.estadoMascota.adoptado;
        await apiMascotas.put(masco);
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
        const solicitudesARechazarFiltradas = this.missolicitudes.filter(
          (s) => s.idMascota == soli.idMascota
        );


        //obtengo el indice de la solicitud que acepte

        const indiceSoli = solicitudesARechazarFiltradas.findIndex(
          (s) =>
            s.idMascota == soli.idMascota && s.idAdoptante == soli.idAdoptante
        );
  

        // splice: te devuelve todas menos la que le estas pasando.
        solicitudesARechazarFiltradas.splice(indiceSoli, 1);

   

        // cancelo todas los solicitudes menos la que acepte
        for (const soliR of solicitudesARechazarFiltradas) {
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
        solicitud.fechaRespuesta = hoy.toJSON();
        await apiSolicitudes.put(solicitud);
      } catch (error) {
        console.log(error.message);
      }
    },
  },

  async created() {
    //llama a la API para traer la lista de mascotas y la guarda en variable local
    this.missolicitudes = await this.getSolicitudes();
    this.usuarioLog = await this.buscarUsuario();
    await this.getMisMascotas();
  
    this.$emit("estamosOk", true);
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

p {
  margin-bottom: 0.5rem !important;
}

.cardSolicitud {
  text-align: left;
  width: 70vw;
  /* height: 15vw; */
}

.publicaciones {
  height: 100%;
  background-color: #faf5f7;
}
</style>
