<template>
  <div class="solicitudes">
    <h1>{{ msg }}</h1>
    <div class="container">
      <div class="row" style="margin-top: 50px">
        <div class="col">
          <!-- <img alt="gatitoSolicitud" src="../assets/gatitoSolicitud.jpg" /> -->
        </div>
        <b-col class="col-lg-10">
          <div class="">
            <b-row>
              <b-card
                v-for="solicitud in buscarSolicitudes"
                :key="solicitud.id"
                :title="solicitud.nombremascota"
                :img-src="solicitud.mascotafoto"
                style="max-width: 20rem"
                class="m-2"
              >
                <p>{{ solicitud.mascotaedad }}</p>
                <p>{{ solicitud.mascotaespecie }}</p>
                <p>{{ solicitud.mascotacolor }}</p>
                <p>{{ solicitud.mascotasexo }}</p>

                <b-button variant="success" @click="cancelar(solicitud)"
                  >cancelar</b-button
                >
              </b-card>
            </b-row>
          </div>
        </b-col>
        <!-- 
        <div class="col">
          <h1>Pelusa</h1>
          <p>2 años</p>
          <p>Descripcion de la mascota</p>
          <button>Cancelar Solicitud</button>
        </div>
        <div class="col">
          <h1>Refugio</h1>
          <p>Proyecto 4 patas</p>
          <p>Descripcion refugio</p>
          <button>Ver perfil</button>
        </div>
        <div class="row" style="margin-top: 50px">
          <div class="col">
            <img alt="pelusa" v-bind="mainProps" src="../assets/pelusa.jpg" />
          </div>
          <div class="col">
            <h1>Pichicho</h1>
            <p>6 meses</p>
            <p>Descripcion de la mascota</p>
            <button>Cancelar Solicitud</button>
          </div>
          <div class="col">
            <h1>Refugio</h1>
            <p>Proyecto 4 patas</p>
            <p>Descripcion refugio</p>
            <button>Ver perfil</button>
          </div> -->
      </div>
    </div>
  </div>
</template>



<script>
import { mapGetters } from "vuex";
import apiSolicitudes from "../services/solicitudes";
import apiMascotas from "../services/mascotas";
export default {
  name: "Solicitudes",
  props: {
    msg: String,
  },
  data() {
    return {
      solicitud: {
        id: "",
        nombremascota: "",
        mascotafoto: "",
        mascotaedad: "",
        mascotaespecie: "",
        mascotacolor: "",
        mascotasexo: "",
      },
      //usuarioLog:"",
      missolicitudes: [],
    };
  },
  computed: {
    buscarSolicitudes() {
      const usuarioLog = this.buscarUsuario();
      console.log("hola matias ");
      console.log(usuarioLog);
      console.log(this.missolicitudes);
      const solisFiltradasapi = this.missolicitudes.filter(
        (soli) => (soli.idAdoptante = usuarioLog.id)
      );
      const solisFiltradas = this.buscarMascotas(solisFiltradasapi);

      return solisFiltradas;
    },
  },

  
  methods: {
    ...mapGetters(["getusuariosLog"]),

    buscarUsuario() {
      return this.getusuariosLog()[0];
    },

    async getSolicitudes() {
      const apisoli = await apiSolicitudes.get();
      const arraysoli = apisoli.data;
      return arraysoli;
    },
    async buscarMascotas(lista) {
      const listaAdevolver = [];

      for (const i of lista) {
        console.log("rozic NOOOOO a esta hora no discuto");
        console.log(i)
        const mascotaApi = await apiMascotas.getById(i.idMascota)
        const mascota =  mascotaApi.data;
        console.log(mascota)
        listaAdevolver.push({
          id: mascota.id,
          nombremascota: mascota.nombre,
          mascotafoto: mascota.foto,
          mascotaedad: mascota.edad,
          mascotaespecie: mascota.especie,
          mascotacolor: mascota.color,
          mascotasexo: mascota.sexo,
        });
      }
      console.log(" Rozic a cuantos te llevaste");
console.log(listaAdevolver)
console.log(listaAdevolver.length);
      return listaAdevolver;
    },
  },

  async created() {
    //llama a la API para traer la lista de mascotas y la guarda en variable local
    console.log("matias no mires");
    this.missolicitudes = await this.getSolicitudes();

    console.log(this.missolicitudes.length);
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
</style>
