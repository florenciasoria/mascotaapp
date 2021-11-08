<template>
  <div class="header">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#" class="mx-4">
          <router-link to="/"
            ><img src="../assets/logo.png" class="loguito"
          /></router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- <router-link to="/" class="px-2">Quiero</router-link> | -->
          <router-link v-if="esAdoptante" to="/misSolicitudes" class="px-2"
            >Solicitudes</router-link
          >
          |
          <router-link to="/misPublicaciones" class="px-2" v-if="esPublicador"
            >Publicaciones</router-link
          >
          |

          <p v-if="usuario.nombre"> {{usuario.nombre}}  {{usuario.email}} </p>

          <b-navbar-nav class="ms-auto">
            <b-nav-form class="py-2">
              <div v-if="usuario.nombre">

                 <b-button size="sm" class="mx-4 my-sm-0" type="submit" v-on:click="cerrarSesion">
                  <router-link to="/">Cerrar Sesión</router-link>
                </b-button>
              </div>
              <div v-else>
                               <b-button size="sm" class="mx-4 my-sm-0" type="submit">
                  <router-link to="/LoginU">Iniciar Sesión</router-link>
                </b-button>
              </div>
            </b-nav-form>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "HelloWorld",
  props: {},
  data() {
    return {
      show: true,
      usuario:{}
    };
  },



  methods: {
    //...mapGetters(["getusuariosLog"]),
      ...mapActions(["eliminarusuarioLog"]),

    async cerrarSesion(){
      console.log("llega a cerrar sesion")
        await this.eliminarusuarioLog
        this.usuario = {}
        console.log(this.getusuariosLog)
        console.log(this.usuario)
    },

    async verUsuarioLogueado() {
      const usuario = this.getusuariosLog.find((usuario) => usuario.id != null );
      console.log("Encontro usuario?" , usuario)
      this.usuario = usuario
      
      console.log(this.usuario)
      //return usuario != null ? (this.show = false) : (this.show = true);
    },
  },

  computed: {
        ...mapGetters(["getusuariosLog"]),
        esAdoptante() {return this.usuario.rol == "a" || this.usuario.rol == "z"} ,
        esPublicador() {return this.usuario.rol == "p" || this.usuario.rol == "z"} ,  },
  watch: {

    getusuariosLog: {
      handler() {
        console.log(this.show);
        console.log(this.getusuariosLog)
        this.verUsuarioLogueado();
        console.log(this.show);
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 200px;
  height: auto;
}


p {
  color: white;
}
</style>
