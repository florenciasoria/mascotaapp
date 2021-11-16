<template>
  <div class="container">
    <div class="row">
      <div class="col-6 my-2">
        <b-form @reset="onReset" v-if="show" @submit.stop.prevent>
          <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.nombre"
              type="text"
              placeholder="Ingresar Nombre:"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validation">
              Debes ingresar el nombre de la mascota
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="input-group-3" label="Especie:" label-for="input-3">
            <b-form-radio-group
              v-model="form.especie"
              id="radios-3"
              :options="especie"
            ></b-form-radio-group>
          </b-form-group>
          <b-form-group id="input-group-2" label="Edad:" label-for="input-2">
            <b-form-select
              id="input-2"
              v-model="form.edad"
              :options="edad"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group id="input-group-4" label="Color:" label-for="input-4">
            <b-form-select
              id="input-4"
              v-model="form.color"
              :options="color"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group id="input-group-5" label="Sexo:" label-for="input-4">
            <b-form-radio-group
              v-model="form.sexo"
              id="radios-5"
              :options="sexo"
            ></b-form-radio-group>
          </b-form-group>

          <b-form-group
            id="input-group-6"
            label="Link a imagen:"
            label-for="input-6"
          >
            <b-form-input
              id="input-6"
              v-model="form.foto"
              type="text"
              placeholder="Link a la imagen"
            ></b-form-input>
          </b-form-group>

          <b-button type="reset" variant="danger">Borrar formulario</b-button>

          <b-button type="submit" variant="primary" v-on:click="onSubmit"
            >Enviar</b-button
          >
        </b-form>
        <b-card class="mt-3" header="Form Data Result">
          <pre class="m-0">{{ form }}</pre>
        </b-card>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import apiMascotas from "../services/mascotas";
import apiPersonas from "../services/personas";
import { valoresData } from "../assets/js/valoresData.js";
export default {
  name: "Home",
  props: {
    msg: String,
  },
  data() {
    return {
      //   otroid: 6,
      validation: true,
      form: {
        // id: this.otroid,
        nombre: "",
        edad: "",
        especie: "",
        color: "",
        sexo: "",
        foto: "",
        idPublicador: "",
        estado: "publicado",
      },
      especie: valoresData.especie,
      color: [
        { text: "Seleccionar color", value: "", disabled: true },
        ...valoresData.color,
      ],
      edad: [
        { text: "Selecionar edad", value: "", disabled: true },
        ...valoresData.edad,
      ],
      sexo: [...valoresData.sexo],

      show: true,
    };
  },
  created() {
    const usuario = this.getusuariosLog();
    console.log("Usuario logueado ", usuario.id);
    if (usuario.id == undefined) {
      this.$router.push("/LoginU");
    }
  },
  methods: {
    // ...mapActions(["agregarusuario"]),
    ...mapGetters(["getusuariosLog"]),

    async onSubmit(event) {
      event.preventDefault();
      if (this.form.nombre.length < 1) {
        this.validation = false;
      } else {
        try {
          const publicador = await this.getusuariosLog();
          const id = publicador.id;
          this.form.idPublicador = id;

          if (this.form.foto == "") {
            this.form.foto = "https://i.ibb.co/fHF2BS9/relleno-foto-02.png";
          }

          const mascota = await this.agregarMascota(this.form);

          const usuario = await apiPersonas.getById(id);
          console.log("Usuario", usuario);
          usuario.data.mascoPubli.push(mascota.data.id);
          console.log("Usuario despues del Push", usuario.data);
          const resultadoPut = await apiPersonas.put(usuario.data);
          console.log(resultadoPut);
          this.$router.push("/");
        } catch {
          alert("error en el put");
        }
      }
      //this.agregarusuario(this.form);
    },

    async agregarMascota(mascota) {
      const resu = await apiMascotas.post(mascota);
      console.log("resu agregar mascota", resu.data);
    },

    onReset(event) {
      event.preventDefault();
      this.form.nombre = "";
      this.form.edad = null;
      this.form.especie = "";
      this.form.color = null;
      this.form.sexo = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
