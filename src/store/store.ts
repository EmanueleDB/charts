import { defineStore } from 'pinia'
import { fetchAssets } from '@/data/assets'
import { fetchMeasurements } from '@/data/measurements'
import {
  buildAssetTree,
  getMeasurementsRecursively,
  formatDates,
  getDataSets,
} from '@/utils'
import { Asset, Measurement } from '@/types/types'

export const useStore = defineStore('store', {
  state: () => ({
    assets: [] as Asset[],
    measurements: {} as Record<number, Measurement | null>,
    formattedDates: [] as Array<string>,
    dataSets: [] as number[],
    assetName: '',
  }),

  actions: {
    setSelectedAsset(asset: string) {
      this.assetName = asset
    },

    async fetchAssets() {
      const data = await fetchAssets()
      this.assets = buildAssetTree(data)
    },

    async fetchMeasurements(assetId: number) {
      const responseAssets = await fetchAssets()
      const responseMeasurements = await fetchMeasurements()

      const measurementsData = responseMeasurements.find(
        (item: { assetId: number }) => item.assetId === assetId
      )

      if (measurementsData && measurementsData.measurements) {
        this.measurements[assetId] = measurementsData.measurements
      } else {
        const children = responseAssets.filter(
          (item: { parentId: number | null }) => item.parentId === assetId
        )
        const summedMeasurements: Measurement = {}

        for (const child of children) {
          const childMeasurements = getMeasurementsRecursively(
            child.id,
            responseAssets,
            responseMeasurements
          )
          if (childMeasurements) {
            for (const [key, value] of Object.entries(childMeasurements)) {
              summedMeasurements[key] =
                (summedMeasurements[key] || 0) + (value as number)
            }
          }
        }

        if (Object.keys(summedMeasurements).length > 0) {
          this.measurements[assetId] = summedMeasurements
        } else {
          this.measurements[assetId] = null
        }
      }
    },

    getFormattedDates(measurements: Measurement) {
      this.formattedDates = formatDates(measurements)
    },

    getDataSets(assetId: number) {
      const measurements = this.measurements[assetId]
      if (measurements) {
        this.dataSets = getDataSets(measurements)
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
