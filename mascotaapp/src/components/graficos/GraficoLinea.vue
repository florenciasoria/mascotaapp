<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ["datos"],
  data() {
    return {
      gradient: "",
      bar: null,
      
      //mascotasInicial: {},
      chartData: {
        labels: [],
        datasets: [
          {
            data: [],
            fill: true,
            borderColor: "rgba(39, 176, 245, 1)",
            backgroundColor: "rgba(39, 176, 245, 0.1)",
            
            borderWidth: 1,
          },
          {
            label: "perros",
            data: [],
            fill: true,
            borderColor: "rgba(137, 105, 211, 1)",
            backgroundColor: "rgba(137, 105, 211, 0.2)",
            borderWidth: 1,
          },
          {
            label: "gatos",
            data: [],
            fill: true,
            borderColor: "rgba(66, 185, 131, 1)",
            backgroundColor: "rgba(66, 185, 131, 0.2)",
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


      //datos del grafico
      this.chartData.datasets[i].label = datosM.tituloGrafico;
      this.chartData.datasets[i].data = cant;
      this.chartData.labels = fechaCreacion;

    },
  },
};
</script>