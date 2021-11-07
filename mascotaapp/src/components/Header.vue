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
          <router-link to="/" class="px-2">Quiero</router-link> |
          <router-link to="/misSolicitudes" class="px-2"
            >Solicitudes</router-link
          >
          |
          <router-link to="/misPublicaciones" class="px-2"
            >Publicaciones</router-link
          >
          |

          <button v-on:click="verUsuarioLogueado">A ver si carga</button>
          <p v-if="usuario"> {{usuario.nombre}}  {{usuario.email}} </p>

          <b-navbar-nav class="ms-auto">
            <b-nav-form class="py-2">
              <div v-if="show">
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
    ...mapGetters(["getusuariosLog"]),

    async verUsuarioLogueado() {
      const usuario = this.getusuariosLog().find((usuario) => usuario.id != null );
      console.log(usuario)
      this.usuario = usuario
      return usuario != null ? (this.show = false) : (this.show = true);
    },
  },
  watch: {
    getusuariosLog: {
      handler() {
        console.log(this.show);
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
</style>
