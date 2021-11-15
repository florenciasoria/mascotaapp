<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props:['datos'],
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
        ], 
      },  
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                // suggestedMax: 0,
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
    console.log("Mounted");
    this.cargarGrafico();
    //metodo del grafico para mostrar
    this.renderChart(this.chartData, this.options);
  },

  methods: {
   
    cargarGrafico() {
      //this.datos es lo que pasamos en el v-bind del componente padre
      const arrayGrafico = this.datos.arrayDatos; 
  
      console.log("Array recibido de padre", arrayGrafico)
 
      //map para separar el array en dos arrays (meses y cant por mes)
      const cant = arrayGrafico.map((item) => item.cant);
      const nroMes = arrayGrafico.map((item) => item.nroMes);

    console.log("Array de Cantidades", cant);
    console.log("Array de Mes", nroMes);

      //datos del grafico
      this.chartData.datasets[0].label = this.datos.tituloGrafico;    
      this.chartData.datasets[0].data = cant;
      this.chartData.labels = nroMes;
      // const c = cant + 1
      // this.options.scales.yAxes[0].ticks.suggestedMax = c;
    },
  },
};
</script>