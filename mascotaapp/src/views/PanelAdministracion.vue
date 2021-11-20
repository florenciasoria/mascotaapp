<template>
  <div>
    <h3>Datos MascotaAPP</h3>
    <div class="container">
      <b-row>
        <h4 class="mx-auto">Publicaciones</h4>
      </b-row>
      <b-row>
        <b-col class="col-6">
          <grafico-linea v-if="datosCargados" v-bind:datos="datosMascotaAlta"></grafico-linea>
        </b-col>
        <b-col class="col-6">
          <grafico-torta v-if="datosCargados3" v-bind:datos="datosMascotaEspecie"></grafico-torta>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import GraficoLinea from "@/components/graficos/GraficoLinea.vue";
import GraficoTorta from "@/components/graficos/GraficoTorta.vue";

import apiMascotas from "../services/mascotas";

export default {
  components: {
    GraficoLinea,
    GraficoTorta
  },

  data() {
    return {
      datosMascotaAlta: {
        tituloGrafico: "",
        arrayDatos: [],
      },

      datosMascotaEspecie: {
        tituloGrafico: "",
        arrayDatos: [],
      },

      datosCargados: false,
      datosCargados3: false,
    };
  },

  async created() {
    this.mascotasInicial = await this.traerMascotasDeApi();
    await this.cargarGraficoPorMesPublicacion();
    await this.cargarGraficoEspecie();
  },

  methods: {
    async cargarGraficoPorMesPublicacion() {
      const arrayGrafico = [];

      for (const mascota of this.mascotasInicial) {
        //Guardamos el mes
        const mes = new Date(mascota.createdAt);
        const mes2 = ("0" + (mes.getMonth() + 1)).slice(-2);

        //Guardamos el año de publicacion
        const anio = mes.getFullYear();

        const fecha = `${anio}-${mes2}`;

        const objeto = arrayGrafico.find((objeto) => objeto.nroMes == fecha);

        if (objeto === undefined) {
          arrayGrafico.push({ nroMes: fecha, cant: 1 });
        } else {
          const indice = arrayGrafico.findIndex((obj) => obj.nroMes == fecha);
          let cantidadNueva = objeto.cant + 1;
          const nuevoObjeto = { nroMes: objeto.nroMes, cant: cantidadNueva };
          arrayGrafico[indice] = nuevoObjeto;
        }
      }

      arrayGrafico.sort(function sort(a, b) {
        const aa = a.nroMes.split("-"),
          bb = b.nroMes.split("-");
        return aa[0] - bb[0] || aa[1] - bb[1];
      });

      this.datosMascotaAlta.arrayDatos = arrayGrafico;
      this.datosMascotaAlta.tituloGrafico = "Mascotas publicadas Por Mes";
      this.datosCargados = true;
    },

    async cargarGraficoEspecie() {
      const arrayGrafico = [];
      for (const mascota of this.mascotasInicial) {
        const especie = mascota.especie;
        const objeto = arrayGrafico.find((objeto) => objeto.especie == especie);

        if (objeto === undefined) {
          arrayGrafico.push({ especie: especie, cant: 1 });
        } else {
          const indice = arrayGrafico.findIndex(
            (obj) => obj.especie == especie
          );
          let cantidadNueva = objeto.cant + 1;
          const nuevoObjeto = { especie: objeto.especie, cant: cantidadNueva };
          arrayGrafico[indice] = nuevoObjeto;
        }
      }

      this.datosMascotaEspecie.arrayDatos = arrayGrafico;
      this.datosMascotaEspecie.tituloGrafico = "Mascotas publicadas por Especie";
      this.datosCargados3 = true;

    },

    async traerMascotasDeApi() {
      try {
        const resuGet = await apiMascotas.get();
        const arrayMascotas = resuGet.data;
        return arrayMascotas;
      } catch (error) {
        console.log(error.message);
      }

    },
  },
};
</script>