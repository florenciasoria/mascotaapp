<template>
<div>
    hola, ficha de la mascota
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
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
  color: #A3E3DC;
}





</style>
