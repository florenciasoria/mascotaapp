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
                v-for="solicitud in soliMostrar"
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
      soliMostrar : [],
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
    
  },

  
  methods: {
    ...mapGetters(["getusuariosLog"]),

    buscarUsuario() {
      return this.getusuariosLog()[0];
    },

    async buscarSolicitudes() {
      const usuarioLog = this.buscarUsuario();
      console.log("Metodo Buscar Solicitudes ");
      console.log("Usuario Logueado ",usuarioLog);
      console.log(this.missolicitudes);
      const solisFiltradasapi = this.missolicitudes.filter(
        (soli) => (soli.idAdoptante = usuarioLog.id)
      );
      const solisFiltradas = await this.buscarMascotas(solisFiltradasapi);

      return solisFiltradas;
    },

    async getSolicitudes() {
      const apisoli = await apiSolicitudes.get();
      const arraysoli = apisoli.data;
      return arraysoli;
    },
    async buscarMascotas(lista) {
      const listaAdevolver = [];
      let idx = 0;
      for (const i of lista) {
        const mascotaApi = await apiMascotas.getById(i.idMascota)
        const mascota =  mascotaApi.data;
        listaAdevolver.push({
          id: idx,
          nombremascota: mascota.nombre,
          mascotafoto: mascota.foto,
          mascotaedad: mascota.edad,
          mascotaespecie: mascota.especie,
          mascotacolor: mascota.color,
          mascotasexo: mascota.sexo,
        });
        idx++
      }
      console.log("Lista A Devolver ",listaAdevolver)
      console.log(listaAdevolver.length);
      return listaAdevolver;
    },
  },

  async created() {
    //llama a la API para traer la lista de mascotas y la guarda en variable local
    console.log("created");
    this.missolicitudes = await this.getSolicitudes();

    console.log(this.missolicitudes.length);

    this.soliMostrar = await this.buscarSolicitudes()
    console.log("Soli Mostrar ", this.soliMostrar)

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
