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
                      <div v-if="solicitud.estado == 'Pendiente'">
                        <p>{{ solicitud.nombre }}</p>
                        <b-button variant="success" @click="aceptar(solicitud)"
                          >aceptar</b-button
                        >
                        <b-button variant="danger" @click="rechazar(solicitud)"
                          >rechazar
                        </b-button>
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
      console.log("id usuarioLog store:", this.getusuariosLog().id);
      console.log("usuario log: ", this.usuarioLog);
      console.log("mascotas:", this.usuarioLog.mascoPubli);
    },

    // busca las solicitudes por el Id y las devuelve filtradas si coinciden con el id param. 
    buscarSolicitudes(idMascota) {
      console.log(idMascota);
      let solis = this.missolicitudes;
      const soliDeLaMascota = solis.filter((s) => s.idMascota == idMascota);
      return soliDeLaMascota;
    },

    async getSolicitudes() {
      const apisoli = await apiSolicitudes.get();
      return apisoli.data;
    },

    async getUsuario(id) {
      const apiPers = await apiPersonas.getById(id);
      return apiPers.data;
    },

    async getMisMascotas() {
      const misMascotas = [];
      //     console.log("this: ", this.usuarioLog.mas);

      for (let i = 0; i < this.usuarioLog.mascoPubli.length; i++) {
        console.log("el id de masc:", i);
        misMascotas.push(
          await (
            await apiMascotas.getById(this.usuarioLog.mascoPubli[i])
          ).data
        );
      }
      // for (const idMascota of this.usuarioLog.mascoPubli) {
      //   console.log("el id de masc:", idMascota);
      //   misMascotas.push(await (await apiMascotas.getById(idMascota)).data)
      // }
      console.log("misMascotas: ", misMascotas);
      await this.buscarSolicitudesFiltradas(misMascotas);
    },

    async buscarSolicitudesFiltradas(mascotasFiltradas) {
      for (const m of mascotasFiltradas) {
        //esto nos trae todas las solicitudes de una mascota
        const solicitudes = await (
          await apiSolicitudes.getByMascota(m.id)
        ).data;
        console.log("Solicitudes filtradas", solicitudes);

        let solis = [];
        for (const s of solicitudes) {
          const persona = await this.getUsuario(s.idAdoptante);
          console.log("Persona solicitante", persona, s.id);
          console.log("este es s: ", s);
          solis.push({
            nombre: persona.nombre,
            estado: s.estado,
            soliId: s.idSolicitud,
          });
        }

        // MascotasMostrar: Agrega la mascota y solicitudes que posee
        this.mascotasMostrar = []
        this.mascotasMostrar.push({
          ...m,
          solis,
        });
      }

      console.log("Mascotas para mostrar ", this.mascotasMostrar);
    },

    async getSolicitudById(id) {
      console.log(id);
      const apisoli = await apiSolicitudes.getById(id);
      return apisoli.data;
    },

    // Rechaza las solicitudes de los usuarios.
    async rechazar(solicitud) {
      console.log("solo soli:", solicitud);
      console.log(solicitud.soliId);
      const soli = await this.getSolicitudById(solicitud.soliId);
      soli.estado = valoresData.estadoSolicitud.cancelada;
      await this.actualizarSolicitud(soli);
     // this.$forceUpdate();
    // con esto me duplica la mascota.
     this.misMascotas = await this.getMisMascotas();
    // solicitud.estado = valoresData.estadoSolicitud.cancelada;
    },

    async actualizarSolicitud(solicitud) {
      await apiSolicitudes.put(solicitud);
    },
  },

  async created() {
    //llama a la API para traer la lista de mascotas y la guarda en variable local
    //this.missolicitudes = await this.getByPublicante();
    await this.buscarUsuario();
    this.misMascotas = await this.getMisMascotas();
  }
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
