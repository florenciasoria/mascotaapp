<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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
              size="sm"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Contraseña:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              size="sm"
              v-model="form.pass"
              placeholder="Ingresar Contraseña:"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Nombre:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="form.nombre"
              placeholder="Ingresar Nombre:"
              size="sm"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Apellido:"
            label-for="input-4"
          >
            <b-form-input
              id="input-4"
              v-model="form.apellido"
              placeholder="Ingresar Apellido:"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-5" label="Genero:" label-for="input-5">
            <b-form-select
              id="input-5"
              v-model="form.Genero"
              :options="Genero"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group id="input-group-6" v-slot="{ ariaDescribedby }">
            <b-form-radio-group
              v-model="form.rol"
              id="radios-5"
              :aria-describedby="ariaDescribedby"
              :options="roles"
            ></b-form-radio-group>
          </b-form-group>

          <b-button type="submit" variant="primary" v-on:click="onSubmit"
            >Submit</b-button
          >
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
        <b-card class="mt-3" header="Form Data Result">
          <pre class="m-0">{{ form }}</pre>
        </b-card>
      </div>
    </div>
  </div>
</template>


<script>
//import { mapActions } from "vuex";
import apiPersonas from "../services/personas";
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
        { text: "Select One", value: null },
        { value: "f", text: "femele" },
        { value: "m", text: "Male" },
        { value: "nb", text: "No Binarie" },
      ],
      roles: [
        { value: "p", text: "Postulante" },
        { value: "z", text: "Administrador" },
        { value: "a", text: "Adoptante" },
      ],
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      //this.agregarusuario(this.form);
      try {
        this.agregarPersona(this.form);
        this.$router.push("/Login");
      } catch {
        alert("error en el put");
      }
    },

    async agregarPersona(persona) {
      try {
        await apiPersonas.post(persona);
      } catch (error) {
        console.log(error.message);
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
</style>