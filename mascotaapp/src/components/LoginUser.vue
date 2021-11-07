<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <b-form v-if="show" @submit.prevent="onSubmit()">
          <b-form-group
            id="input-group-1"
            label="Direccion de Email:"
            label-for="input-1"
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
              type="password"
              required
            ></b-form-input>
          </b-form-group>

          <!-- <b-button type="submit" variant="primary" @click="onSubmit()"> -->
          <b-button type="submit" variant="primary" >
            Submit</b-button
          >
          <b-button type="reset" variant="danger">Reset</b-button>
          <b-button type="" variant="success"
            ><router-link :to="'/LoginF'">Crear Usuario</router-link></b-button
          >
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

import service from '../services/personas'

export default {
  name: "LoginUser",
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
      arrayPers:[],
      nomTest:""
    };
  },

  // computed: {
  //   ...mapGetters(["getusuarios"]),
  // },



  methods: {
      ...mapActions(["agregarusuarioLog"]),

    // onSubmit(event) {
    async onSubmit() {
    alert('llegaaaaa?')
    try {
      const usuario = await this.buscarUser()
      if ( usuario != null 
      // && usuario.pass == this.form.pass
      ) {
        //console.log('usuario ', usuario)
        //console.log('usuario.pass ', usuario.pass)
  
        //console.log('usuario email', usuario.email)
        //console.log('form pass ', this.form.pass)

        //this.nomTest = usuario.nombre
        this.agregarusuarioLog(usuario)
        alert("bienvenido ", this.nomTest);
        this.$router.push("/");
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
      const array = resuGet.data
      this.arrayPers = resuGet.data
      const persona  = array.find((usuario) => usuario.email == this.form.email);
      return persona
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

.margenes {
  padding-top: 100px;
  padding-bottom: 100px;
}
</style>