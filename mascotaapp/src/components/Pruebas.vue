<template>
  <div class="container">
    <div class="row">
      <div class="col-6">


    <button @click="buscarUser">traer animales</button>

        <b-card class="mt-3" header="Form Data Result">
          <pre class="m-0">{{ form }}</pre>
          <pre class="m-0">{{ this.resp }}</pre>
          <pre class="m-0">{{ this.arrayPers }}</pre>
        </b-card>

        <li v-for="persona in arrayPers" :key="persona.id">{{persona.nombre}}</li>

      </div>
    </div>
  </div>
</template>


<script>
// import { mapGetters } from "vuex";

import service from '../services/personas'

export default {
  name: "prueba",
  props: {
    msg: String,
  },

  data() {
    return {
      form: {
        email: "",
        pass: "",
      },
      user: {  //-> este hay q pasarlo al store
        email: "",
        pass: "",
      },
      show: true,
      acceso: true,

      //temporal para debug
      resp:"",
      arrayPers:[]
    };
  },

  // computed: {
  //   ...mapGetters(["getusuarios"]),
  // },



  methods: {
    //  ...mapGetters(["getusuarios"]),

    // onSubmit(event) {
    async onSubmit() {
    alert('llegaaaaa?')
    try {
      const usuario = await this.buscarUser()

      alert('llega?')

        console.log('usuario ', usuario)
        console.log('usuario.pass ', usuario.pass)
        console.log('usuario.email', usuario.email)
        console.log('form.pass ', this.form.pass)

      if ( usuario != null 
      // && usuario.pass == this.form.pass
      ) {
        console.log('usuario ', usuario)
        console.log('usuario.pass ', usuario.pass)
  
        console.log('usuario email', usuario.email)
        console.log('form pass ', this.form.pass)

        alert("bienvenido", usuario);
      } 
    } catch (error) {
      alert("Usuario o clave incorrectos");
    }
    },

    // buscarUser() {
    //   return this.getusuarios.find((usuario) => usuario.mail == this.form.mail);
    // },

    async buscarUser(){
      // //const responsex = await service.get()
      // const response = await service.getById(7)
      // console.log(response)
      // const array = response.data
      // this.arrayPers = array
      
      // // const persona  = array.find((usuario) => usuario.email == this.form.email);
      // // console.log(persona)
      // // return persona
      // return persona
      const resuGet = await service.get()
      this.arrayPers = resuGet.data
      return resuGet.data
    },
    async verUser(){
      this.resp = await service.get()
      console.log(this.resp)
      this.arrayPers = JSON.parse(this.resp)
      console.log(this.arrayPers)
    }
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

</style>