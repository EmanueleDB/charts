<template>
  <div class="m-3">
    <div
      v-if="assetGraph.labels && assetGraph.labels.length === 0"
      class="text-center"
    >
      <h3>No asset selected</h3>
      <p>You can select an asset in the menu on the left</p>
    </div>
    <div v-else>
      <input
        v-b-tooltip.hover
        title="Change color"
        type="color"
        v-model="color"
      />
      <Line :data="assetGraph" :options="options" />
    </div>
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
  labels?: string[]
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
      color: 'rgb(0,0,0)',
    }
  },

  computed: {
    ...mapState(useStore, ['dataSets', 'formattedDates']),
    assetGraph(): ChartData {
      return {
        labels: this.labels,
        datasets: [
          {
            label: useStore().assetName,
            backgroundColor: this.color,
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
