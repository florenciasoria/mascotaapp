<template>
  <div class="form-adopciones">
    <div class="datos-mascota">  
      <p>{{mascotaForm.nombre}}</p>
      <p>{{mascotaForm.edad}}</p>
      <p>{{mascotaForm.especie}}</p>
      <p>{{mascotaForm.color}}</p>
    </div>
    <div class="form">  
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-nombre">Nombre:</label>
        </b-col>
        <b-col sm="3">
          <b-form-input id="input-nombre" v-model="nombre" size="sm" placeholder=""></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-apellido">Apellido:</label>
        </b-col>
        <b-col sm="3">
          <b-form-input id="input-apellido" size="sm" placeholder=""></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-edad">Edad:</label>
        </b-col>
        <b-col sm="3">
          <b-form-input id="input-edad" size="sm"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-personas">Con cuántas personas vive:</label>
        </b-col>
        <b-col sm="3">
          <b-form-input id="input-personas" size="sm" placeholder=""></b-form-input>
        </b-col>
      </b-row>
    </div>      
    <div>
      <b-col>    
        <b-button variant="success" @click="enviarform()">
           Enviar Formulario
        </b-button>
      </b-col>  
   </div>
  </div>

</template>

<script>
import mascotas from '../assets/js/mascotas';

export default {
  name: "form-adopcion",
  data() {
    return { 
        text: '',
        nombre: '',

    }
  },
  computed: {
    mascotaForm() {
        console.log(this.$route.params.id);
      return mascotas.find((mascota) => mascota.id == this.$route.params.id)
    },
  },
  methods:{
    enviarform(){
        alert("Formulario enviado, " + this.nombre);
    }
  }
};
</script>