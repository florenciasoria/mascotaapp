<template>
  <div>
    <h3>Datos MascotaAPP</h3>
    <div class="container">
      <b-row>
        <b-col class="mx-auto">
          <b-button
            class="mx-2 botonVioleta"
            @click="cargarGraficosPublicaciones"
            >Publicaciones</b-button
          >
          <b-button class="mx-2 botonVioleta" @click="cargarGraficosSolicitudes"
            >Solicitudes</b-button
          >
          <b-button class="mx-2 botonVioleta" @click="cargarGraficosAdopciones"
            >Adopciones</b-button
          >
        </b-col>
      </b-row>
      <div class="mt-5" v-if="vistaPublicaciones">
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
      <div class="mt-5" v-if="vistaSolicitudes">
        <b-row>
          <h4 class="mx-auto">Solicitudes</h4>
        </b-row>
        <b-row>
          <b-col class="col-6">
            <grafico-linea
              v-if="datosCargadosLineaSolicitudes"
              v-bind:datos="datosMascotaSolicitudes"
            ></grafico-linea>
          </b-col>
          <b-col class="col-6">
            <grafico-torta
              v-if="datosCargadosTortaSolicitudes"
              v-bind:datos="datosMascotaEspecieSolicitudes"
            ></grafico-torta>
          </b-col>
        </b-row>
      </div>
      <div class="mt-5" v-if="vistaAdopciones">
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
          <b-col class="col-6">
            <grafico-torta
              v-if="datosCargadosTortaAdopciones"
              v-bind:datos="datosMascotaEspecieAdopciones"
            ></grafico-torta>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import GraficoLinea from "@/components/graficos/GraficoLinea.vue";
import GraficoTorta from "@/components/graficos/GraficoTorta.vue";
import { valoresData } from "../assets/js/valoresData.js";
import apiMascotas from "../services/mascotas";
import apiSolictudes from "../services/solicitudes";
import { mapGetters } from "vuex";

export default {
  components: {
    GraficoLinea,
    GraficoTorta,
  },

  data() {
    return {
      // Datos Graficos publicaciones
      datosMascotaAlta: {
        mascotasDatos: {
          array: [],
          tituloGrafico: "Mascotas publicadas Por Mes",
        },

        perrosDatos: {
          array: [],
          tituloGrafico: "Perros publicados Por Mes",
        },
        gatosDatos: {
          array: [],
          tituloGrafico: "Gatos publicados Por Mes",
        },
      },

      datosMascotaEspecie: {
        tituloGrafico: "",
        arrayDatos: [],
      },

      // Datos Graficos Solicitudes
      datosMascotaSolicitudes: {
        mascotasDatos: {
          array: [],
          tituloGrafico: "Mascotas solicitadas Por Mes",
        },

        perrosDatos: {
          array: [],
          tituloGrafico: "Perros solicitados Por Mes",
        },
        gatosDatos: {
          array: [],
          tituloGrafico: "Gatos solicitados Por Mes",
        },
      },
      datosMascotaEspecieSolicitudes: {
        tituloGrafico: "",
        arrayDatos: [],
      },

      // Datos Graficos adopciones
      datosMascotaAdopcion: {
        mascotasDatos: {
          array: [],
          tituloGrafico: "Mascotas Adoptadas Por Mes",
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

      datosMascotaEspecieAdopciones: {
        tituloGrafico: "",
        arrayDatos: [],
      },

      //datos
      arrayFechas: [],
      datosCargados: false,
      datosCargados3: false,
      datosCargadosLineaAdopcion: false,
      datosCargadosTortaAdopciones: false,
      datosCargadosTortaSolicitudes: false,
      datosCargadosLineaSolicitudes: false,

      vistaPublicaciones: false,
      vistaSolicitudes: false,
      vistaAdopciones: false,
      //mascotasInicial: [],
      mascotasAdoptadas: [],
      mascotasSolicitadas: [],
    };
  },

  async created() {
    // Si el usuario no es admin nos deriva directo al home.
    if (!this.validarRolDeUsuario()) {
      this.$router.push({
        name: "Error",
        params: { codError: "errorPermisos" },
      });
    }

    //CARGA DE DATOS
    // obtengo mi array de fechas totales

    await this.obtenerArrayFechasCompleto();
    // obtengo todas las solicitudes
    this.solicitudesTotales = await this.traerSolicitudes();

    // obtengo mascotas totales
    this.mascotasInicial = await this.traerMascotasDeApi();
  },

  methods: {
    ...mapGetters(["getusuariosLog"]),
    validarRolDeUsuario() {
      return this.getusuariosLog().rol === "z";
    },

    async cargarGraficosPublicaciones() {
      //datos

      //PUBLICACIONES
      this.datosMascotaEspecie.arrayDatos = this.cargarGraficoEspecieTorta(
        this.mascotasInicial
      );
      this.datosMascotaAlta.mascotasDatos.array = this.cargarGraficoLineaTotal(
        this.mascotasInicial
      );

      this.datosMascotaAlta.perrosDatos.array =
        this.cargarGraficoLineaPorEspecie("perro", this.mascotasInicial);

      this.datosMascotaAlta.gatosDatos.array =
        this.cargarGraficoLineaPorEspecie("gato", this.mascotasInicial);
      this.vistaPublicaciones = !this.vistaPublicaciones;
      this.datosCargados = true;
      this.datosCargados3 = true;
    },
    async cargarGraficosSolicitudes() {
      //busco mascotas de la solicitud
      this.buscarMascotasDeSolicitud(
        this.solicitudesTotales,
        this.mascotasSolicitadas
      );

      //solicitudes
      this.datosMascotaEspecieSolicitudes.arrayDatos =
        this.cargarGraficoEspecieTorta(this.mascotasSolicitadas);

      this.datosMascotaSolicitudes.mascotasDatos.array =
        this.cargarGraficoLineaTotal(this.mascotasSolicitadas);

      this.datosMascotaSolicitudes.perrosDatos.array =
        this.cargarGraficoLineaPorEspecie("perro", this.mascotasSolicitadas);
      this.datosMascotaSolicitudes.gatosDatos.array =
        this.cargarGraficoLineaPorEspecie("gato", this.mascotasSolicitadas);
      this.vistaSolicitudes = !this.vistaSolicitudes;
      this.datosCargadosLineaSolicitudes = true;
      this.datosCargadosTortaSolicitudes = true;
    },

    async cargarGraficosAdopciones() {
      //obtengo mascotas aceptadas
      this.solicitudesAceptadas = await this.traerSolicitudesByEstado(
        valoresData.estadoSolicitud.aceptada
      );

      // busca mascotas aceptadas de la solicitud
      this.buscarMascotasDeSolicitud(
        this.solicitudesAceptadas,
        this.mascotasAdoptadas
      );
      //ADOPCIONES
      this.datosMascotaAdopcion.mascotasDatos.array =
        this.cargarGraficoLineaTotal(this.mascotasAdoptadas);

      this.datosMascotaEspecieAdopciones.arrayDatos =
        this.cargarGraficoEspecieTorta(this.mascotasAdoptadas);

      this.datosMascotaAdopcion.perrosDatos.array =
        this.cargarGraficoLineaPorEspecie("perro", this.mascotasAdoptadas);

      this.datosMascotaAdopcion.gatosDatos.array =
        this.cargarGraficoLineaPorEspecie("gato", this.mascotasAdoptadas);
      this.vistaAdopciones = !this.vistaAdopciones;
      this.datosCargadosLineaAdopcion = true;
      this.datosCargadosTortaAdopciones = true;
    },

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

    cargarGraficoEspecieTorta(arrayMascotas) {
      const arrayGrafico = [];
      for (const mascota of arrayMascotas) {
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
      return arrayGrafico;
    },

    cargarGraficoLineaTotal(arrayMascotas) {
      const arrayGrafico = this.arrayFechas.slice();

      for (const mascota of arrayMascotas) {
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
      return arrayGrafico;
    },

    cargarGraficoLineaPorEspecie(especie, arrayMascotas) {
      // slice sin parametros copia el array
      const arrayGrafico = this.arrayFechas.slice();

      for (const mascota of arrayMascotas) {
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

      return arrayGrafico;
    },

    async traerSolicitudes() {
      try {
        return await (
          await apiSolictudes.get()
        ).data;
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

    traerSolicitudesByEstado(estado) {
      return this.solicitudesTotales.filter((s) => s.estado == estado);
    },

    buscarMascotasDeSolicitud(arraySolicitudes, arrayMascotas) {
      for (const s of arraySolicitudes) {
        //esto nos trae todas las solicitudes de una mascota

        const mascota = this.mascotasInicial.find((m) => m.id == s.idMascota);
        arrayMascotas.push({
          // ... carga todos los datos de la mascota
          ...s,
          ...mascota,
        });
      }
    },
  },
};
</script>
<style scoped>
.botonVioleta {
  background-color: #8969d3;
  border-color: #8969d3;
  text-align: center;
}
</style>