<template>
  <div>
    <h3>Datos MascotaAPP</h3>
    <div class="container">
      <b-row>
        <h4 class="mx-auto">Publicaciones</h4>
      </b-row>
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
  </div>
</template>

<script>
import GraficoLinea from "@/components/graficos/GraficoLinea.vue";
import GraficoTorta from "@/components/graficos/GraficoTorta.vue";

import apiMascotas from "../services/mascotas";

export default {
  components: {
    GraficoLinea,
    GraficoTorta,
  },

  data() {
    return {
      datosMascotaAlta: {
        mascotasDatos: {
          array: [],
          tituloGrafico: "",
        },

        perrosDatos: {
          array: [],
          tituloGrafico: "Perros publicadas Por Mes",
        },
        gatosDatos: {
          array: [],
          tituloGrafico: "Gatos publicadas Por Mes",
        },
        arrayFechas: [],
      },

      datosMascotaEspecie: {
        tituloGrafico: "",
        arrayDatos: [],
      },
      arrayFechas: [],
      datosCargados: false,
      datosCargados3: false,
    };
  },

  async created() {
    this.mascotasInicial = await this.traerMascotasDeApi();
    // obtengo mi array de fechas totales
    await this.obtenerArrayFechas();
    await this.obtenerArrayFechasCompleto();
    await this.cargarGraficoPorMesPublicacion();
    await this.cargarGraficoEspecieTorta();
    this.datosMascotaAlta.perrosDatos.array =
      this.cargarGraficoLineaPorEspecie("perro");
    console.log("gatosarr en panel", this.datosMascotaAlta.perrosDatos);
    this.datosMascotaAlta.gatosDatos.array =
      this.cargarGraficoLineaPorEspecie("gato");
    console.log(
      "perros arr en panel:",
      this.datosMascotaAlta.gatosDatos.gatosArr
    );
    this.datosCargados = true;
  },

  methods: {
    async obtenerArrayFechasCompleto() {
      const primerFecha = await apiMascotas.getPrimerFecha();
      let fechaPrueba = new Date(primerFecha);

      //console.log("Primer mascota en axios", primerFecha)

      const fechaActual = new Date();

      //console.log("Fecha prueba", fechaPrueba)
      //console.log("Fecha actual", fechaActual)

      while (fechaPrueba < fechaActual) {
        fechaPrueba = new Date(
          fechaPrueba.setMonth(fechaPrueba.getMonth() + 1)
        );
        //console.log("Funciona agregar un mes ?", fechaPrueba)
        const mesActual = ("0" + (fechaPrueba.getMonth() + 1)).slice(-2);
        const anioActual = fechaPrueba.getFullYear();
        const fecha = `${anioActual}-${mesActual}`;

        this.datosMascotaAlta.arrayFechas.push(fecha);
      }

      //console.log("Array de fechas sin vacios", this.datosMascotaAlta.arrayFechas)
    },

    async cargarGraficoPorMesPublicacion() {
      const arrayGrafico = this.arrayFechas;

      for (const mascota of this.mascotasInicial) {
        //Guardamos el mes
        const fechaCreacion = new Date(mascota.createdAt);
        const mes2 = ("0" + (fechaCreacion.getMonth() + 1)).slice(-2);

        //Guardamos el año de publicacion
        const anio = fechaCreacion.getFullYear();

        const fecha = `${anio}-${mes2}`;

        const objeto = arrayGrafico.find(
          (objeto) => objeto.fechaCreacion == fecha
        );

        if (objeto != undefined) {
          const indice = arrayGrafico.findIndex(
            (obj) => obj.fechaCreacion == fecha
          );
          let cantidadNueva = objeto.cant + 1;
          const nuevoObjeto = {
            fechaCreacion: objeto.fechaCreacion,
            cant: cantidadNueva,
          };
          arrayGrafico[indice] = nuevoObjeto;
        }
      }
      console.log("arraytotal", arrayGrafico);
      arrayGrafico.sort(function sort(a, b) {
        const aa = a.fechaCreacion.split("-"),
          bb = b.fechaCreacion.split("-");
        return aa[0] - bb[0] || aa[1] - bb[1];
      });

      this.datosMascotaAlta.mascotasDatos.array = arrayGrafico;
      this.datosMascotaAlta.mascotasDatos.tituloGrafico = "Mascotas publicadas Por Mes";
    },

    async cargarGraficoEspecieTorta() {
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

    cargarGraficoLineaPorEspecie(especie) {
      const arrayGrafico = this.arrayFechas;

      for (const mascota of this.mascotasInicial) {
        if (mascota.especie == especie) {
          //Guardamos el mes
          const mes = new Date(mascota.createdAt);
          const mes2 = ("0" + (mes.getMonth() + 1)).slice(-2);

          //Guardamos el año de publicacion
          const anio = mes.getFullYear();

          const fecha = `${anio}-${mes2}`;

          const objeto = arrayGrafico.find(
            (objeto) => objeto.fechaCreacion == fecha
          );

          if (objeto != undefined) {
            const indice = arrayGrafico.findIndex(
              (obj) => obj.fechaCreacion == fecha
            );
            let cantidadNueva = objeto.cant + 1;
            const nuevoObjeto = {
              fechaCreacion: objeto.fechaCreacion,
              cant: cantidadNueva,
            };
            arrayGrafico[indice] = nuevoObjeto;
          }
        }
      }
      console.log("array por especie", especie, arrayGrafico);
      arrayGrafico.sort(function sort(a, b) {
        const aa = a.fechaCreacion.split("-"),
          bb = b.fechaCreacion.split("-");
        return aa[0] - bb[0] || aa[1] - bb[1];
      });
      return arrayGrafico;
    },

    obtenerArrayFechas() {
      //
      for (const mascota of this.mascotasInicial) {
        //Guardamos el mes
        const fechaCreacion = new Date(mascota.createdAt);
        const mes2 = ("0" + (fechaCreacion.getMonth() + 1)).slice(-2);

        //Guardamos el año de publicacion
        const anio = fechaCreacion.getFullYear();

        const fecha = `${anio}-${mes2}`;

        const objeto = this.arrayFechas.find(
          (objeto) => objeto.fechaCreacion == fecha
        );

        if (objeto === undefined) {
          this.arrayFechas.push({ fechaCreacion: fecha, cant: 0 });
        }
      }
    },
  },
};
</script>