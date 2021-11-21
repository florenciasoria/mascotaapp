<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  props: ["datos"],
  data() {
    return {
      bar: null,
      //mascotasInicial: {},
      chartData: {
        labels: [],
        datasets: [
          {
            borderWidth: 1,
            borderColor: [
              "rgba(137, 105, 211, 1)",
              "rgba(66, 185, 131, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            backgroundColor: [
              "rgba(137, 105, 211, 0.2)",
              "rgba(66, 185, 131, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            data: [],
          },
        ],
      },

      chartDataX: {
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
        ],
      },
      options: {
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  async mounted() {
    
    this.cargarGrafico();
    //metodo del grafico para mostrar
    this.renderChart(this.chartData, this.options);
  },

  methods: {
    cargarGrafico() {
      //this.datos es lo que pasamos en el v-bind del componente padre
      const arrayGrafico = this.datos.arrayDatos;

     

      //map para separar el array en dos arrays (meses y cant por mes)
      const cant = arrayGrafico.map((item) => item.cant);
      const especie = arrayGrafico.map((item) => item.especie);

      
      //datos del grafico
      this.chartData.datasets[0].label = this.datos.tituloGrafico;
      this.chartData.datasets[0].data = cant;
      this.chartData.labels = especie;
    },
  },
};
</script>