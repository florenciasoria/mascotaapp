<template>
  <div>
    <h3>Line Chart Example in Vue</h3>
    <line-chart ></line-chart>
    <!-- <line-chart v-bind:datos="datos"></line-chart> -->
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue'

export default {
  components: {
    LineChart
  }
}
</script>