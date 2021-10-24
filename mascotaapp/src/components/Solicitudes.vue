<template>
  <div class="solicitudes">
    <h1>{{ msg }}</h1>
    <div class="container">
    <div class="row" style="margin-top:50px"> 
    <div class="col" >
       <img alt="gatitoSolicitud" v-bind="mainProps"  src="../assets/gatitoSolicitud.jpg">
    </div>
    <div class="col"> 
    <h1> Pelusa</h1>
    <p> 2 años </p>
    <p> Descripcion de la mascota </p>
    <button> Cancelar Solicitud </button>
    </div>   
    <div class="col"> 
    <h1> Refugio</h1>
    <p> Proyecto 4 patas </p>
    <p> Descripcion refugio </p>
    <button> Ver perfil </button>
    </div>   
    <div class="row" style="margin-top:50px">
    <div class="col">
       <img alt="pelusa" v-bind="mainProps" src="../assets/pelusa.jpg">
    </div>
    <div class="col"> 
    <h1> Pichicho</h1>
    <p> 6 meses </p>
    <p> Descripcion de la mascota </p>
    <button> Cancelar Solicitud </button>
    </div>  
        <div class="col"> 
    <h1> Refugio</h1>
    <p> Proyecto 4 patas </p>
    <p> Descripcion refugio </p>
    <button> Ver perfil </button>
    </div> 
    </div>
    </div> 
    </div>
  </div>
</template>



<script>
export default {
  name: 'Solicitudes',
  props: {
    msg: String
  },
     data() {
      return {
        mainProps: { blank: true, blankColor: '#777',  width: 175, height: 175, class: 'm1'}
      }
    }
}
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
  color: #42b983;
}
</style>
