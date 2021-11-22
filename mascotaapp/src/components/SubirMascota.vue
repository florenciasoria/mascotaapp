<template>
  <div class="container">
    <div class="row">
      <div class="col-6 pt-5 mx-auto">
        <b-form @reset="onReset" v-if="show" @submit.stop.prevent class="p-4 border rounded cajaBlanca">
          <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.nombre"
              type="text"
              placeholder="Ingresar Nombre:"
              required
            ></b-form-input>
            <b-form-invalid-feedback
              :state="validationNombre"
            >Debes ingresar el nombre de la mascota</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="input-group-3" label="Especie:" label-for="input-3">
            <b-form-radio-group v-model="form.especie" id="radios-3" :options="especie"></b-form-radio-group>
            <b-form-invalid-feedback
              :state="validationEspecie"
            >Debes ingresar la especie de la mascota</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="input-group-2" label="Edad:" label-for="input-2">
            <b-form-select id="input-2" v-model="form.edad" :options="edad" required></b-form-select>
            <b-form-invalid-feedback :state="validationEdad">Debes ingresar la edad de la mascota</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="input-group-4" label="Color:" label-for="input-4">
            <b-form-select id="input-4" v-model="form.color" :options="color" required></b-form-select>
            <b-form-invalid-feedback :state="validationColor">Debes ingresar el color de la mascota</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="input-group-5" label="Sexo:" label-for="input-5">
            <b-form-radio-group v-model="form.sexo" id="radios-5" :options="sexo"></b-form-radio-group>
            <b-form-invalid-feedback :state="validationSexo">Debes ingresar el sexo de de la mascota</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="input-group-6" label="Link a imagen:" label-for="input-6">
            <b-form-input
              id="input-6"
              v-model="form.foto"
              type="text"
              placeholder="Link a la imagen"
            ></b-form-input>
          </b-form-group>

          <b-button type="reset" class="px-3 mx-2 "  variant="outline-danger">Borrar formulario</b-button>

          <b-button type="submit" class="botonVioleta mx-2 px-3 " v-on:click="onSubmit">Enviar</b-button>
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
      validationNombre: true,
      validationColor: true,
      validationEdad: true,
      validationSexo: true,
      validationEspecie: true,
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

    if (usuario.id == undefined) {
      this.$router.push("/Login");
    }
  },
  methods: {
    // ...mapActions(["agregarusuario"]),
    ...mapGetters(["getusuariosLog"]),

    async onSubmit(event) {
      event.preventDefault();


      //Validamos que todos los campos salvo la foto (se autocompleta si no mandamos nada) estén completos.
      this.form.nombre.length < 1 ? this.validationNombre = false : this.validationNombre = true
      this.form.color.length < 1 ? this.validationColor = false : this.validationColor = true
      this.form.sexo.length < 1 ? this.validationSexo = false : this.validationSexo = true
      this.form.edad.length < 1 ? this.validationEdad = false : this.validationEdad = true
      this.form.especie.length < 1 ? this.validationEspecie = false : this.validationEspecie = true


      //Si no hubo ningun error, hacemos el PUT
      if (this.validationNombre && this.validationColor && this.validationEdad && this.validationEspecie && this.validationSexo) {

        try {
          //Busca el usuario logueado para obtener su ID
          const publicador = await this.getusuariosLog();
          const id = publicador.id;
          this.form.idPublicador = id;

          //Si no se ingreso una foto, la actualizamos
          if (this.form.foto == "") {
            this.form.foto = "https://i.ibb.co/fHF2BS9/relleno-foto-02.png";
          }

          //publicamos la mascota
          const mascota = await this.agregarMascota(this.form);

          //traemos el usuario completo para agregar mascota y actualizarlo
          const usuario = await apiPersonas.getById(id);
          usuario.data.mascoPubli.push(Number(mascota.id));
          await apiPersonas.put(usuario.data);

          this.$router.push("/");
        } catch (error) {
          console.log(error.message);
        }
      }
    },


    async agregarMascota(mascota) {
      try {
        const resu = await apiMascotas.post(mascota);
        return resu.data;
      } catch (error) {
        console.log(error.message);
      }
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
  }

};
</script>

<style >

.botonVioleta {
  background-color: #8969d3;
  border-color: #8969d3;
  text-align: center;
  width: 30%
}

</style>
