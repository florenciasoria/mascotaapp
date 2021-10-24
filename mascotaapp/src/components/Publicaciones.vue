<template>
  <div class="publicaciones">
    <h1>{{ msg }}</h1>
    <div class="container">
    <div class="row" style="margin-top:50px"> 
    <div class="col" >
       <img alt="gatitoPublicacion" v-bind="mainProps"  src="../assets/gatitoPublicacion.jpg">
    </div>
    <div class="col"> 
    <h1> Michifu</h1>
    <p> 2 meses </p>
    <p> Descripcion de la mascota </p>
    </div>   
    <div class="col"> 
    <h1> Solicitudes</h1>
    <p> Ana </p>
    <button> Ver perfil </button>
    <button> Aprobar </button>
    <button> Rechazar </button>
    </div>   
    <div class="row" style="margin-top:50px">
    <div class="col">
       <img alt="perritoPublicado" v-bind="mainProps" src="../assets/perritoPublicado.jpg">
    </div>
    <div class="col"> 
    <h1> Firulais</h1>
    <p> 3 año </p>
    <p> Descripcion de la mascota </p>
    </div>  
    <div class="col"> 
    <h1> Solicitudes</h1>
    <p> Fernando </p>
    <button> Ver perfil </button>
    <button> Aprobar </button>
    <button> Rechazar </button>
    </div> 
    </div>
    </div> 
    </div>
  </div>
</template>



<script>
export default {
  name: 'Publicaciones',
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
