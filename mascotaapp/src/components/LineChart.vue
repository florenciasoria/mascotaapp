<script>
import { Line } from "vue-chartjs";
import apiMascotas from "../services/mascotas";
export default {
  extends: Line,
  data() {
    return {
      mascotasInicial:{},
      chartData: {
        labels: [
        ],
        datasets: [
          {
            label: "",
            data: [],
            fill: false,
            borderColor: "#2554FF",
            backgroundColor: "#2554FF",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
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

    await this.cargarGraficoPorMesPublicacion()
    this.renderChart(this.chartData, this.options);
  },

  methods: {

  async cargarGraficoPorId(){
        //1. Traer los datos de la API
        this.mascotasInicial = await this.traerMascotasDeApi();
        
        // console.log("Mascotas inicial ", this.mascotasInicial)

        // const fecha = new Date(this.mascotasInicial[0].createdAt)
        // const fecha2 = fecha.getMonth() +1
        // const anio = fecha.getFullYear()
        
        for (const mascota of this.mascotasInicial){
            this.chartData.labels.push(mascota.nombre)
            this.chartData.datasets[0].data.push(mascota.id)
        }
  },
    
  async cargarGraficoPorMesPublicacion(){
    const arrayGrafico = []

    this.mascotasInicial = await this.traerMascotasDeApi();

    for (const mascota of this.mascotasInicial){

      const mes = new Date(mascota.createdAt)
      const mes2 = mes.getMonth() +1
      const anio = mes.getFullYear()
      const fecha = `${anio}-${mes2}`
      console.log(fecha)

      const objeto = arrayGrafico.find(objeto => objeto.nroMes == fecha)

      if (objeto === undefined) {
        arrayGrafico.push({nroMes:fecha, cant:1})
      } else {
        const indice = arrayGrafico.findIndex(obj => obj.nroMes == fecha)
        let cantidadNueva = objeto.cant +1
        const nuevoObjeto = {nroMes:objeto.nroMes, cant: cantidadNueva }
        arrayGrafico[indice] = nuevoObjeto
      }

      arrayGrafico.sort(function sort(a, b) {
        var aa = a.nroMes.split('-'),
            bb = b.nroMes.split('-');
        return aa[1] - bb[1] || aa[0] - bb[0];
});

    }
        const cant = arrayGrafico.map(item => item.cant);
        const nroMes = arrayGrafico.map(item => item.nroMes);

        console.log("Array de cantidad ",cant);
        console.log("Array de nroMes ",nroMes);

        this.chartData.datasets[0].data = cant
        this.chartData.datasets[0].label = "Mascotas publicadas por mes"
        this.chartData.labels = nroMes

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