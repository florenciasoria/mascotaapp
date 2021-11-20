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
    cargarDatos(){
      console.log("agus 1")
      this.cargarGrafico(this.datos.arrayDatos,0);
      console.log("agus 2")
      this.cargarGrafico(this.datos.perrosArr,1);
      console.log("agus 3")
      this.cargarGrafico(this.datos.gatosArr,2);
      
    },
    cargarGrafico(arrayGrafico,i) {
      //this.datos es lo que pasamos en el v-bind del componente padre
      //const arrayGrafico = this.datos.arrayDatos;

      console.log("Array recibido de padre", arrayGrafico);

      //map para separar el array en dos arrays (meses y cant por mes)
      const cant = arrayGrafico.map((item) => item.cant);
      const nroMes = arrayGrafico.map((item) => item.nroMes);

      console.log("Array de Cantidades", cant);
      console.log("Array de Mes", nroMes);

      //datos del grafico
      this.chartData.datasets[i].label = this.datos.tituloGrafico;
      this.chartData.datasets[i].data = cant;
      console.log("cant",cant)
      this.chartData.labels = nroMes;
      
      
    },
  },
};
</script>