<template>
  <div class="container">
    <div class="row ">
      <div class="col-6 pt-5 mx-auto ">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show"  class="p-4 border rounded">
          <b-form-group
            id="input-group-1"
            label="Direccion de Email:"
            label-for="input-1"
            description="Su mail nunca sera distribuido con nadie."
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Ingresar Mail:"
              required
            ></b-form-input>

            <b-form-invalid-feedback :state="validationEmail">Debes ingresar un email</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="input-group-2" label="Contraseña:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.pass"
              type="password"
              placeholder="Ingresar Contraseña:"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationPass">Debes ingresar una contraseña</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="input-group-3" label="Nombre:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="form.nombre"
              placeholder="Ingresar Nombre:"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationNombre">Debes ingresar un nombre</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="input-group-4" label="Apellido:" label-for="input-4">
            <b-form-input
              id="input-4"
              v-model="form.apellido"
              placeholder="Ingresar Apellido:"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-5" label="Genero:" label-for="input-5">
            <b-form-select id="input-5" v-model="form.Genero" :options="Genero" required></b-form-select>
          </b-form-group>

          <b-form-group id="input-group-6" label="Rol: " label-for="radios-5">
            <b-form-radio-group v-model="form.rol" id="radios-5" :options="roles"></b-form-radio-group>
            <b-form-invalid-feedback :state="validationRol">Debes ingresar un rol</b-form-invalid-feedback>
          </b-form-group>

          <b-button type="reset" variant="outline-danger" class="mx-2">Limpiar formulario</b-button>
          <b-button
            type="submit"
            variant="primary"
            class="mx-2 botonVioleta"
            v-on:click="onSubmit"
          >¡Registrar mi usuario!</b-button>
        </b-form>
        <b-card class="mt-5" header="Form Data Result">
          <pre class="m-0">{{ form }}</pre>
        </b-card>
      </div>
    </div>
  </div>
</template>


<script>

import apiPersonas from "../services/personas";
import { valoresData } from "../assets/js/valoresData.js";

export default {
  name: "Home",
  props: {
    msg: String,
  },
  data() {
    return {
      form: {
        email: "",
        pass: "",
        nombre: "",
        apellido: "",
        genero: "",
        rol: "",
        mascoPropias: [],
        mascoPubli: [],
      },
      Genero: [
        { text: "Elegí uno ", value: "", disabled: true },
        ...valoresData.genero,
      ],
      roles: [
        ...valoresData.rol,
      ],
      show: true,
      validationEmail: true,
      validationPass: true,
      validationNombre: true,
      validationGenero: true,
      validationRol: true,

    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      try {
        this.agregarPersona(this.form);

      } catch {
        alert("error en el put");
      }
    },

    async agregarPersona(persona) {
      this.form.email.length < 1 ? this.validationEmail = false : this.validationEmail = true
      this.form.pass.length < 1 ? this.validationPass = false : this.validationPass = true
      this.form.nombre.length < 1 ? this.validationNombre = false : this.validationNombre = true
      this.form.rol.length < 1 ? this.validationRol = false : this.validationRol = true

      //Si no hubo ningun error, hacemos el PUT
      if (this.validationEmail && this.validationPass && this.validationNombre && this.validationRol) {

        try {
          await apiPersonas.post(persona);
          this.$router.push("/Login"); //Redirecciona a login para iniciar sesión con el nuevo usuario
        } catch (error) {
          console.log(error.message);
        }
      }
    },

    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.pass = "";
      this.form.nombre = "";
      this.form.apellido = "";
      this.form.Genero = null;
      this.form.rol = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
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
  color: #a3e3dc;
}

.botonVioleta {
  background-color: #8969d3;
  border-color: #8969d3;
  text-align: center;
}
</style>