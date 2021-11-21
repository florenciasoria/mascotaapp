<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ["datos"],
  data() {
    return {
      bar: null,
      //mascotasInicial: {},
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
      this.cargarGrafico(this.datos.mascotasDatos, 0);
      this.cargarGrafico(this.datos.perrosDatos, 1);
      this.cargarGrafico(this.datos.gatosDatos, 2);
    },
    cargarGrafico(datosM, i) {
      //this.datos es lo que pasamos en el v-bind del componente padre
      //map para separar el array en dos arrays (meses y cant por mes)
      const cant = datosM.array.map((item) => item.cant);
      const fechaCreacion = datosM.array.map((item) => item.fechaCreacion);
      
      console.log("fechafecha", fechaCreacion)
      //datos del grafico
      this.chartData.datasets[i].label = datosM.tituloGrafico;
      this.chartData.datasets[i].data = cant;
      this.chartData.labels = fechaCreacion;
      console.log("holaaaaaaaaa",this.chartData.labels)
    },
  },
};
</script>