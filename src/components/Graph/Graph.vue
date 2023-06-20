<template>
  <div class="m-3">
    <div>{{assetGraph}}</div>
    <Line :data="assetGraph" :options="options" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { mapState } from 'pinia'
import { useStore } from '@/store/store'
import { ChartDataset } from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface ChartData {
  labels?: string[] | string[][]
  datasets?: ChartDataset[]
}

export default defineComponent({
  name: 'Graph',
  components: { Line },
  data() {
    return {
      labels: [] as string[],
      datasets: [],
      options: {
        responsive: true,
      },
    }
  },

  computed: {
    ...mapState(useStore, ['dataSets', 'formattedDates']),
    assetGraph(): ChartData {
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: this.datasets,
          },
        ],
      }
    },
  },
  watch: {
    dataSets: {
      handler(to) {
        this.datasets = to
      },
      deep: true,
    },
    formattedDates: {
      handler(to) {
        this.labels = to
      },
      deep: true,
    },
  },
})
</script>

<style lang="scss">
@import 'style';
</style>
