<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ["datos"],
  data() {
    return {
      bar: null,
      mascotasInicial: {},
      chartData: {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            fill: false,
            borderColor: "#8969D3",
            backgroundColor: "#8969D3",
            borderWidth: 1,
          },
          {
            label: "perros",
            data: [],
            fill: false,
            borderColor: "green",
            backgroundColor: "green",
            borderWidth: 1,
          },
          {
            label: "gatos",
            data: [],
            fill: false,
            borderColor: "red",
            backgroundColor: "red",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                stepSize: 1,
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: true,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  async mounted() {
    //metodo del grafico para mostrar
    this.cargarDatos();
    this.renderChart(this.chartData, this.options);
  },

  methods: {
    cargarDatos() {
      //console.log("agus 1")
      this.cargarGrafico(this.datos.mascotasDatos, 0);
      console.log("agus 2", this.datos.perrosDatos);
      this.cargarGrafico(this.datos.perrosDatos, 1);
      console.log("agus 3", this.datos.gatosDatos);
      this.cargarGrafico(this.datos.gatosDatos, 2);
    },
    cargarGrafico(datosM, i) {
      //this.datos es lo que pasamos en el v-bind del componente padre
      //const datosM = this.datos.arrayDatos;

      //console.log("Array recibido de padre", datosM);

      //map para separar el array en dos arrays (meses y cant por mes)
      console.log("hola",datosM)
      const cant = datosM.array.map((item) => item.cant);
      console.log(cant);
      const nroMes = datosM.array.map((item) => item.fechaCreacion);
      console.log(nroMes);
      //console.log("Array de Cantidades", cant);
      //console.log("Array de Mes", nroMes);

      //datos del grafico
      this.chartData.datasets[i].label = datosM.tituloGrafico;
      this.chartData.datasets[i].data = cant;
      //console.log("cant",cant)
      this.chartData.labels = nroMes;
    },
  },
};
</script>