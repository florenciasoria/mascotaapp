<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Direccion de Email:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.mail"
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

          <b-button type="submit" variant="primary" v-on:click="onSubmit"
            ><router-link to="/">Submit</router-link></b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
          <b-button type="" variant="success"
            ><router-link :to="'/LoginF'">Crear Usuario</router-link></b-button
          >
        </b-form>
        <b-card class="mt-3" header="Form Data Result">
          <pre class="m-0">{{ form }}</pre>
        </b-card>
      </div>
    </div>
  </div>

  <!-- <div class="error-mensaje"></div>
    <div class="form-group">
      <label for="usuario">Usuario</label>
      <input name="usuario_nombre" type="text" class="form-control" />
    </div>
    <div class="form-group">
      <div class="form-row">
        <div class="col">
          <label for="password">Contraseña</label>
          <input
            name="usuario_password"
            type="password"
            value=""
            class="form-control"
            id="contrasena"
          />
        </div>
        <div class="col">
          <label for="password"></label> -->
  <!-- checkbox que nos permite activar o desactivar la opcion -->
  <!-- <div style="margin-top: 15px">
            <input
              style="margin-left: 20px"
              type="checkbox"
              id="mostrar_contrasena"
              title="clic para mostrar contraseña"
            />
            &nbsp;&nbsp;Mostrar Contraseña
          </div>
        </div>
      </div>
    </div>
    <div class="form-check">
      <input
        type="checkbox"
        name="remember"
        id="remember"
        class="form-check-input"
      />
      <label for="remember-me">Recordarme</label>
    </div>
    <div class="form-group">
      <input
        type="submit"
        name="login"
        value="Iniciar Sesión"
        class="btn btn-primary"
      />
    </div>
     -->
</template>


<script>
import { mapGetters } from "vuex";
export default {
  name: "LoginUser",
  props: {
    msg: String,
  },
  data() {
    return {
      acceso: true,
      form: {
        mail: "",
        pass: "",
      },
    };
  },
  methods: {
    ...mapGetters(["getusuarios"]),

    onSubmit(event) {
      event.preventDefault();
      this.agregarusuario(this.form);
      this.otroid++;
    },
   


   
    },

    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.mail = "";
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