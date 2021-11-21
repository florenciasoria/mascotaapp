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
      <b-row>
        <h4 class="mx-auto">Adopciones</h4>
      </b-row>
      <b-row>
        <b-col class="col-6">
          <grafico-linea
            v-if="datosCargadosLineaAdopcion"
            v-bind:datos="datosMascotaAdopcion"
          ></grafico-linea>
        </b-col>
        <!-- <b-col class="col-6">
          <grafico-torta
            v-if="datosCargados3"
            v-bind:datos="datosMascotaEspecie"
          ></grafico-torta>
        </b-col> -->
      </b-row>
    </div>
  </div>
</template>

<script>
import GraficoLinea from "@/components/graficos/GraficoLinea.vue";
import GraficoTorta from "@/components/graficos/GraficoTorta.vue";
import { valoresData } from "../assets/js/valoresData.js";
import apiMascotas from "../services/mascotas";
import apiSolictudes from "../services/solicitudes";

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
      },
      datosMascotaAdopcion: {
        mascotasDatos: {
          array: [],
          tituloGrafico: "",
        },

        perrosDatos: {
          array: [],
          tituloGrafico: "Perros adoptados Por Mes",
        },
        gatosDatos: {
          array: [],
          tituloGrafico: "Gatos adoptados Por Mes",
        },
      },

      datosMascotaEspecie: {
        tituloGrafico: "",
        arrayDatos: [],
      },
      arrayFechas: [],
      datosCargados: false,
      datosCargados3: false,
      datosCargadosLineaAdopcion: false,
      //mascotasInicial: [],
      mascotasAdoptadas: [],
    };
  },

  async created() {
    //CARGA DE DATOS
    this.mascotasInicial = await this.traerMascotasDeApi();
    this.solicitudesAceptadas = await this.traerSolicitudesByEstado(
      valoresData.estadoSolicitud.aceptada
    );
    await this.buscarMascotasDeSolicitud();

    // obtengo mi array de fechas totales
    //await this.obtenerArrayFechas();
    await this.obtenerArrayFechasCompleto();

    //PUBLICACIONES
    this.cargarGraficoEspecieTorta();
    this.cargarGraficoPorMesPublicacion();
    this.datosMascotaAlta.perrosDatos.array =
      this.cargarGraficoLineaPorEspecie("perro");
console.log("GATOOOO????", valoresData.especie[1].value)
    this.datosMascotaAlta.gatosDatos.array =
      this.cargarGraficoLineaPorEspecie("gato");

    //ADOPCIONES
    this.cargarGraficoPorMesAdopcion();
      this.datosMascotaAdopcion.perrosDatos.array =
      this.cargarGraficoLineaPorEspecie("perro");

    this.datosMascotaAdopcion.gatosDatos.array =
      this.cargarGraficoLineaPorEspecie("gato");

    this.datosCargados = true;
    this.datosCargadosLineaAdopcion = true;
  },

  methods: {
    async obtenerArrayFechasCompleto() {
      const primerFecha = await apiMascotas.getPrimerFecha();
      let fechaPrueba = new Date(primerFecha);
      const fechaActual = new Date();
      while (fechaPrueba < fechaActual) {
        fechaPrueba = new Date(
          fechaPrueba.setMonth(fechaPrueba.getMonth() + 1)
        );
        const mesActual = ("0" + (fechaPrueba.getMonth() + 1)).slice(-2);
        const anioActual = fechaPrueba.getFullYear();
        const fecha = `${anioActual}-${mesActual}`;

        this.arrayFechas.push({ fechaCreacion: fecha, cant: 0 });
      }
    },
    cargarGraficoEspecieTorta() {
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

    cargarGraficoPorMesPublicacion() {
      const arrayGrafico = this.arrayFechas.slice();

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
      this.datosMascotaAlta.mascotasDatos.array = arrayGrafico;
      this.datosMascotaAlta.mascotasDatos.tituloGrafico =
        "Mascotas publicadas Por Mes";
    },

    cargarGraficoLineaPorEspecie(especie) {
      const arrayGrafico = this.arrayFechas.slice();

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
      return arrayGrafico;
    },

    cargarGraficoPorMesAdopcion() {
      const arrayGrafico = this.arrayFechas.slice();

      for (const mascota of this.mascotasAdoptadas) {
        //Guardamos el mes
        console.log("Gaspar!?????", mascota.fechaRespuesta);
        const fechaCreacion = new Date(mascota.fechaRespuesta);
        const mes2 = ("0" + (fechaCreacion.getMonth() + 1)).slice(-2);
        console.log("FECHA*!*!*!*", fechaCreacion);
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
      console.log("arrayGrafico!!!!!***", arrayGrafico);
      this.datosMascotaAdopcion.mascotasDatos.array = arrayGrafico;
      this.datosMascotaAdopcion.mascotasDatos.tituloGrafico =
        "Mascotas Adoptadas Por Mes";
    },
    cargarGraficoLineaAdopcionPorEspecie(especie) {
      const arrayGrafico = this.arrayFechas.slice();

      for (const mascota of this.mascotasAdoptadas) {
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
      return arrayGrafico;
    },

    async traerSolicitudesByEstado(estado) {
      try {
        return await (
          await apiSolictudes.getByEstado(estado)
        ).data;
      } catch (error) {
        console.log(error.message);
      }
    },
    async buscarMascotasDeSolicitud() {
      try {
        for (const s of this.solicitudesAceptadas) {
          //esto nos trae todas las solicitudes de una mascota
          const mascota = await (await apiMascotas.getById(s.idMascota)).data;
          this.mascotasAdoptadas.push({
            // ... carga todos los datos de la mascota
            ...s,
            ...mascota,
          });
        }
        console.log("mascotas adoptadas!!!!!!", this.mascotasAdoptadas);
      } catch (error) {
        console.log(error.message);
      }
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