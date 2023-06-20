import { defineStore } from 'pinia'
import axios from 'axios'

export interface Asset {
  id: number
  name: string
  parentId: number | null
  children?: Asset[]
}

interface Measurement {
  [date: string]: number
}

export const useStore = defineStore('store', {
  state: () => ({
    assets: [] as Asset[],
    measurements: {} as Record<number, Measurement>,
    formattedDates: [] as Array<string>,
    dataSets: [] as number[],
    assetName: '',
  }),

  actions: {
    setSelectedAsset(asset: string) {
      this.assetName = asset
    },
    async fetchAssets() {
      const response = await fetch('/data/assets.json')
      const data = await response.json()

      const assets: Asset[] = []

      // Create a mapping of assets by ID for quick access
      const assetMap: Record<number, Asset> = {}

      data.forEach((obj: Asset) => {
        const { id, parentId, ...rest } = obj

        const asset: Asset = {
          id,
          parentId,
          children: [],
          ...rest,
        }

        assets.push(asset)
        assetMap[id] = asset
      })

      // Build the asset tree structure
      assets.forEach((asset) => {
        const parentId = asset.parentId
        if (parentId !== null && assetMap[parentId]) {
          assetMap[parentId].children?.push(asset)
        }
      })

      // Find the root assets (parentId === null)
      this.assets = assets.filter((asset) => asset.parentId === null)
    },
    async fetchMeasurements(assetId: number) {
      const response = await axios.get('/data/measurements.json')
      if (response && response.data) {
        const measurementsData = response.data.find(
          (item: { assetId: number }) => item.assetId === assetId
        )
        this.measurements[assetId] = measurementsData
          ? measurementsData.measurements
          : null
      }
    },
    getFormattedDates(measurements: Measurement) {
      const dates = Object.keys(measurements)
      return dates.map((date) => {
        const formattedDate = new Date(date).toLocaleString('en-US', {
          month: 'short',
          year: 'numeric',
        })
        this.formattedDates.push(formattedDate)
      })
    },
    getDataSets(assetId: number) {
      const measurements = this.measurements[assetId]
      if (measurements) {
        this.dataSets = Object.values(measurements)
      } else {
        this.dataSets = []
      }
    },
    reset() {
      this.dataSets = []
      this.formattedDates = []
    },
  },
})
