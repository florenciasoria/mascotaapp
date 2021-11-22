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
          <router-link v-if="esAdoptante" to="/misSolicitudes" class="px-2"
            >Solicitudes
          </router-link>
          |
          <router-link to="/misPublicaciones" class="px-2" v-if="esPublicador"
            >Publicaciones
          </router-link>
          |

          <router-link to="/admin" class="px-2" v-if="esAdmin"
            >Panel de Administración</router-link
          >
          |

          <b-navbar-nav class="ml-auto" right>
            <p class="my-auto" v-if="usuario.nombre">
              {{ usuario.nombre }} {{ usuario.email }}
            </p>

            <b-nav-form class="py-2" align-h="end">
              <div v-if="usuario.nombre">
                <b-button
                  size="sm"
                  class="mx-4 my-sm-0 align-self-end"
                  type="submit"
                  v-on:click="cerrarSesion"
                  right
                >
                  <router-link to="/">Cerrar Sesión</router-link>
                </b-button>
              </div>
              <div v-else>
                <b-button size="sm" class="mx-4 my-sm-0" type="submit" right>
                  <router-link to="/Login">Iniciar Sesión</router-link>
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
  name: "Header",
  props: {},
  data() {
    return {
      show: true,
      usuario: {},
    };
  },

  methods: {
    //...mapGetters(["getusuariosLog"]),
    ...mapActions(["cerrarSesionStore"]),

    cerrarSesion() {
      this.cerrarSesionStore();
      //Inicializamos los datos del usuario (si no da error cuando buscamos el rol para seleccionar los links)
      this.usuario = {};
    },

    async verUsuarioLogueado() {
      //const usuario = this.getusuariosLog.find((usuario) => usuario.id != null );
      if (this.getusuariosLog.id != "") {
        this.usuario = this.getusuariosLog;
      }

      //Pendiente: chequear si el usuario no esta vacio?

      //return usuario != null ? (this.show = false) : (this.show = true);
    },
  },

  computed: {
    usuarioLogueado() {
      return this.usuario;
    },
    ...mapGetters(["getusuariosLog"]),
    esAdoptante() {
      return this.usuario === undefined
        ? false
        : this.usuario.rol == "a"
        ? true
        : false;
    },
    esAdmin() {
      return this.usuario === undefined
        ? false
        : this.usuario.rol == "z"
        ? true
        : false;
    },
    esPublicador() {
      return this.usuario === undefined
        ? false
        : this.usuario.rol == "p"
        ? true
        : false;
    },
  },

  watch: {
    getusuariosLog: {
      handler() {
        this.verUsuarioLogueado();
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
