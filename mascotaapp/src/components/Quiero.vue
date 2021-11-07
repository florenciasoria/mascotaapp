<template>
  <div class="quiero">
    <b-container fluid class="m-auto margenes">
      <b-row class="m-auto">
        <b-col>
          <img
            alt="chihuahua_1"
            v-bind="mainProps"
            rounded="circle"
            class="rounded-circle"
            src="../assets/chihuahua_1.jpg"
          />
        </b-col>
        <b-col>
          <img
            alt="gatito_1"
            v-bind="mainProps"
            rounded="circle"
            class="rounded-circle"
            src="../assets/gatito_1.jpg"
          />
        </b-col>
      </b-row>
      <b-row style="margin-top: 50px">
        <b-col>
          <b-button variant="success"
            ><router-link :to="'/buscar'"
              >Quiero adoptar
            </router-link></b-button
          >
        </b-col>
        <b-col>
          <b-button variant="success"><router-link :to="'/subir-mascota'"
              >Quiero Dar en Adopción
            </router-link></b-button>
          
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Grilla",
  props: {
    msg: String,
  },
  data() {
    return {
      mainProps: {
        blank: true,
        blankColor: "#777",
        width: 175,
        height: 175,
        class: "m1",
      },
    };
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
