<template>
  <div class="container">
    <div class="row">
      <div class="col-6 pt-5 mx-auto">
        <b-form v-if="show" @submit.prevent="onSubmit()" class="p-4 border rounded">
          <b-form-invalid-feedback :state="validationUser">Usuario o contraseña incorrectos</b-form-invalid-feedback>
          <b-form-group id="input-group-1" label="Direccion de Email:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Ingresar Mail:"
            ></b-form-input>
            <b-form-invalid-feedback :state="validationEmail">Debes ingresar un email</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="input-group-2" label="Contraseña:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.pass"
              placeholder="Ingresar Contraseña:"
              type="password"
            ></b-form-input>
            <b-form-invalid-feedback :state="validationPass">Debes ingresar una contraseña</b-form-invalid-feedback>
          </b-form-group>

          <b-button type="reset" class="mx-2" variant="outline-danger">Limpiar formulario</b-button>
          <b-button type="submit" variant="primary" class="mx-2 botonVioleta">Iniciar Sesión</b-button>
          <b-row>
            <router-link :to="'/Registrar'" class="mx-auto mt-5">Crear Usuario</router-link>
          </b-row>
        </b-form>
        <b-card class="mt-3" header="Form Data Result">
          <pre class="m-0">{{ form }}</pre>
          <pre class="m-0">{{ this.resp }}</pre>
          <pre class="m-0">{{ this.arrayPers }}</pre>
        </b-card>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions } from "vuex";

import apiPersonas from "../services/personas";

export default {
  name: "Login",
  props: {
    msg: String,
  },

  data() {
    return {
      form: {
        email: "",
        pass: "",
      },
      user: {
      
        email: "",
        pass: "",
      },
      show: true,
      acceso: true,


      resp: "",
      arrayPers: [],
      nomTest: "",
      validationEmail: true,
      validationPass: true,
      validationUser: true,
    };
  },



  methods: {
    ...mapActions(["agregarusuarioLog"]),

    
    async onSubmit() {
      this.form.email.length < 1 ? this.validationEmail = false : this.validationEmail = true
      this.form.pass.length < 1 ? this.validationPass = false : this.validationPass = true

      //Si no hubo ningun error, hacemos el PUT
      if (this.validationEmail && this.validationPass) {
        try {
          const usuario = await this.buscarUser();

          if (usuario && usuario.pass == this.form.pass) {
            this.agregarusuarioLog(usuario);
            alert("bienvenido");
            this.$router.push("/");
          } else {
            //agrego el else acá porque si encuentra el mail y la pass es incorrecta no lo estamos
            //agarrando
            this.validationUser = false
          }
        } catch (error) {
          this.validationUser = false
        }
      }
    },

    async buscarUser() {
      try {
        const resuGet = await apiPersonas.get();
        const array = resuGet.data;
        this.arrayPers = resuGet.data;
        const persona = array.find(
          (usuario) => usuario.email == this.form.email
        );
        return persona;
      } catch (error) {
        console.log(error.message);
      }
    },
    async verUser() {
      try {
        this.resp = await apiPersonas.get();
        this.arrayPers = JSON.parse(this.resp);
      } catch (error) {
        console.log(error.message);
      }
    },
  },

  onReset(event) {
    event.preventDefault();
    // Reset our form values
    this.form.email = "";
    this.form.pass = "";

    // Trick to reset/clear native browser form validation state
    this.show = false;
    this.$nextTick(() => {
      this.show = true;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.botonVioleta {
  background-color: #8969d3;
  border-color: #8969d3;
  text-align: center;
}
</style>