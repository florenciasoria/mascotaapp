<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <b-form  @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Nombre:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.nombre"
              type="text"
              placeholder="Ingresar Nombre:"
              size="sm"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Edad:" label-for="input-2">
            <b-form-select
              id="input-2"
              v-model="form.edad"
              :options="edad"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group id="input-group-3" v-slot="{ ariaDescribedby }">
            <b-form-radio-group
              v-model="form.especie"
              id="radios-3"
              :aria-describedby="ariaDescribedby"
              :options="especie"
            ></b-form-radio-group>
          </b-form-group>

          <b-form-group id="input-group-4" label="Color:" label-for="input-4">
            <b-form-select
              id="input-4"
              v-model="form.color"
              :options="color"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group id="input-group-5" v-slot="{ ariaDescribedby }">
            <b-form-radio-group
              v-model="form.sexo"
              id="radios-5"
              :aria-describedby="ariaDescribedby"
              :options="sexo"
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
import { mapGetters } from "vuex";
import service from '../services/mascotas'
export default {
  name: "Home",
  props: {
    msg: String,
  },
  data() {
    return {
    //   otroid: 6,
  
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
      especie: [
        { value: "perro", text: "perro" },
        { value: "gato", text: "gato" },
      ],
      color: [
        { text: "Select One", value: null },
        { value: "negro", text: "negro" },
        { value: "blanco", text: "blanco" },
        { value: "marron", text: "marron" }
      ],
      edad: [
        { text: "Select One", value: null },
        { value: "cachorro", text: "cachorro" },
        { value: "joven", text: "joven" },
        { value: "adulto", text: "adulto" }
      ],      
      sexo: [
        { value: "hembra", text: "hembra" },
        { value: "macho", text: "macho" },
      ],

      show: true,
    };
  },
  methods: {
    // ...mapActions(["agregarusuario"]),
    ...mapGetters(["getusuariosLog"]),


    async onSubmit(event) {
      event.preventDefault();
      //this.agregarusuario(this.form);
      try {
        const publicador = await this.getusuariosLog()
        const id = publicador.id;
        this.form.idPublicador = id
        this.agregarMascota(this.form)
        // this.otroid++;
        this.$router.push("/");
      } catch {
        alert('error en el put')
      }
      
      
    },

    async agregarMascota(mascota){
      await service.post(mascota)
    },

    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.nombre = "";
      this.form.edad = null;
      this.form.especie = "";
      this.form.color = null;
      this.form.sexo = "";
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