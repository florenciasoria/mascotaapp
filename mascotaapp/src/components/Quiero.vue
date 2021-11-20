<template>
  <div class="quiero">
    <b-container fluid class="m-auto margenes">
      <b-row class="m-auto">
        <b-col class="m-auto" v-if="esAdoptante">
          <b-row class="m-auto">
            <img
              alt="chihuahua_1"
              v-bind="mainProps"
              rounded="circle"
              class="rounded-circle m-auto"
              src="../assets/chihuahua_1.jpg"
            />
          </b-row>
          <b-row style="margin-top: 50px" class="m-auto py-5">
            <b-button class="boton m-auto" @click="irABuscar"
              >Quiero adoptar
            </b-button>
          </b-row>
        </b-col>
        <b-col class="m-auto" v-if="esPublicador">
          <b-row class="m-auto">
            <img
              alt="gatito_1"
              v-bind="mainProps"
              rounded="circle"
              class="rounded-circle m-auto"
              src="../assets/gatito_1.jpg" 
            />
          </b-row>
          <b-row style="margin-top: 50px" class="m-auto py-5">
              <b-button class="boton m-auto">
                <router-link :to="'/subir-mascota'"
                  >Quiero Dar en Adopción
                </router-link></b-button
              >
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  
  name: "Grilla",
  props: {
    msg: String,
  },
  data() {
    return {
      mainProps: {
        blank: true,
        blankColor: "#777",
        width: 175,
        height: 175,
        class: "m1",
      },
      usuario: {}
    };
  },
  methods: {
    ...mapGetters(["getusuariosLog"]),
    irABuscar() {
      this.$router.push("/buscar");
    },
    buscarUsuario(){
      return this.getusuariosLog()
    }
  },
    computed: {
    esAdoptante() {
      return this.usuario.rol === undefined
        ? true
        : this.usuario.rol == "a"
        ? true
        : false;
    },
    esPublicador() {
      return this.usuario.rol === undefined
        ? true
        : this.usuario.rol == "p"
        ? true
        : false;
    },
  },
  created() {
    this.usuario = this.buscarUsuario();
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
  color: #ffffff;
  text-decoration: none;
}

.margenes {
  padding-top: 100px;
  padding-bottom: 100px;
}

.boton {
  background-color: #8969d3;
  border-color: #8969d3;
}
</style>
