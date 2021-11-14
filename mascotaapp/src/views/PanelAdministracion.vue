<template>
  <div>
    <h3>Datos MascotaAPP</h3>
    <div class="container">
      <b-row>
        <b-col class="col-6">
          <grafico-linea
            v-if="datosCargados"
            v-bind:datos="datosMascotaAlta"
          ></grafico-linea>
        </b-col>
        <b-col class="col-6">
          <grafico-torta
            v-if="datosCargados3"
            v-bind:datos="datosMascotaEspecie"
          ></grafico-torta>
        </b-col>
      </b-row>
    </div>

    <!-- <line-chart v-if="datosCargados2" v-bind:datos="datosMascotaEstado"></line-chart> -->

    <!--     -->
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
      datosCargados2: false,
      datosCargados3: false,
    };
  },

  async created() {
    //await this.cargarGraficoPorMesPublicacion()
    console.log("Llega a created");
    this.mascotasInicial = await this.traerMascotasDeApi();
    await this.cargarGraficoPorMesPublicacion();
    await this.cargarGraficoEspecie();
    console.log("Sale de cargar grafico");
  },

  methods: {
    async cargarGraficoPorMesPublicacion() {
      const arrayGrafico = [];

      for (const mascota of this.mascotasInicial) {
        const mes = new Date(mascota.createdAt);
        const mes2 = ("0" + (mes.getMonth() + 1)).slice(-2);
        //const mes2 = mes.getMonth() + 1;

        // MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/'
        //              + ('0' + (MyDate.getMonth()+1)).slice(-2) + '/'
        //              + MyDate.getFullYear();

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
        var aa = a.nroMes.split("-"),
          bb = b.nroMes.split("-");
        console.log("aa", aa, "bb", aa);

        return aa[0] - bb[0] || aa[1] - bb[1];
      });

      this.datosMascotaAlta.arrayDatos = arrayGrafico;
      this.datosMascotaAlta.tituloGrafico = "Mascotas publicadas Por Mes";
      console.log("Se devuelven ls datos: ", this.datosMascotaAlta);
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
      this.datosMascotaEspecie.tituloGrafico =
        "Mascotas publicadas por Especie";
      console.log("Se devuelven ls datos: ", this.datosMascotaAlta);
      this.datosCargados3 = true;

      console.log("Array Pie", arrayGrafico);
    },

    async traerMascotasDeApi() {
      console.log("Traer Mascotas de Api");
      const resuGet = await apiMascotas.get();
      const arrayMascotas = resuGet.data;
      console.log("array Mascotas de Api", arrayMascotas);
      return arrayMascotas;
    },
  },
};
</script>