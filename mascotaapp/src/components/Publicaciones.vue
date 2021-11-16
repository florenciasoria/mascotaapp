<template>
  <div class="publicaciones">
    <h1>{{ msg }}</h1>
    <div class="container">
      <div class="row" style="margin-top: 50px">
        <div class="col">
        </div>
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

                <p>{{ solicitud.nombre }}</p>
                <b-button v-if="solicitud.estado == 'Pendiente'" variant="success" @click="aceptar(solicitud)"
                  >aceptar</b-button
                >
                <b-button v-if="solicitud.estado == 'Pendiente'" variant="danger" @click="rechazar(solicitud)"
                  >rechazar</b-button
                >

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
export default {
  name: "Solicitudes",
  props: {
    msg: String,
  },
  data() {
    return {
      soliMostrar : [],
      solicitud: {
        id: "",
        nombremascota: "",
        mascotafoto: "",
        mascotaedad: "",
        mascotaespecie: "",
        mascotacolor: "",
        mascotasexo: "",
        estado:""
      },
      //usuarioLog:"",
      missolicitudes: [],
      misMascotas: [],
      mascotasMostrar: []
    };
  },
  computed: {
    
  },

  
  methods: {
    ...mapGetters(["getusuariosLog"]),

    buscarUsuario() {
      return this.getusuariosLog();
    },

    buscarSolicitudes(idMascota) {
      // const usuarioLog = this.buscarUsuario();
      // const solisFiltradasapi = this.missolicitudes.filter(
      //   (soli) => (soli.idAdoptante = usuarioLog.id)
      // );
      // const solisFiltradas = await this.buscarMascotas(solisFiltradasapi);

      // return solisFiltradas;
      console.log(idMascota)
      let solis = this.missolicitudes
      const soliDeLaMascota = solis.filter(s => s.idMascota == idMascota)
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
      const misMascotas = await apiMascotas.get();
      const usuarioLog = this.buscarUsuario();

      //capaz deberia ser con un for sobre el mascopubli de usuario
      const mascotasFiltradas = misMascotas.data.filter(m => m.idPublicador == usuarioLog.id)

      //console.log("Mascotas filtradas ", mascotasFiltradas)

      await  this.buscarSolicitudesFiltradas(mascotasFiltradas)
    },

    async buscarSolicitudesFiltradas(mascotasFiltradas){

        for (const m of mascotasFiltradas) {
        const solicitudes = this.buscarSolicitudes(m.id)
        console.log("Solicitudes filtradas", solicitudes)
        
        let solis = []
        for (const s of solicitudes) {
          const persona = await this.getUsuario(s.idAdoptante)
          console.log("Persona solicitante", persona)
          solis.push({nombre: persona.nombre, estado: s.estado, soliId: s.id})

        }

        this.mascotasMostrar.push({
          ...m,
          solis
        })
      }

    console.log("Mascotas para mostrar ", this.mascotasMostrar)

    },
    // async buscarMascotas(lista) {
    //   const listaAdevolver = [];
    //   let idx = 0;
    //   for (const i of lista) {
    //     const mascotaApi = await apiMascotas.getById(i.idMascota)
    //     const mascota =  mascotaApi.data;

    //     listaAdevolver.push({
    //       id: idx,
    //       nombremascota: mascota.nombre,
    //       mascotafoto: mascota.foto,
    //       mascotaedad: mascota.edad,
    //       mascotaespecie: mascota.especie,
    //       mascotacolor: mascota.color,
    //       mascotasexo: mascota.sexo,
    //       estado: i.estado
    //     });
    //     idx++
    //   }
    //   console.log("Lista A Devolver ",listaAdevolver)
    //   console.log(listaAdevolver.length);
    //   return listaAdevolver;
    // },
  },

  async created() {
    //llama a la API para traer la lista de mascotas y la guarda en variable local
    this.missolicitudes = await this.getSolicitudes()
    this.misMascotas = await this.getMisMascotas()
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
  width:  20vw;
  object-fit: cover;
}

.cardSolicitud{
  text-align: left;
  width: 70vw;
 /* height: 15vw; */
}

</style>
