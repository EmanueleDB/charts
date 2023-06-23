import { defineStore } from 'pinia'
import axios from 'axios'

export interface Asset {
  id: number
  name: string
  parentId: number | null
  children?: Asset[]
}

interface Measurement {
  [date: string]: number | null
}

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
      const responseAssets = await axios.get('/data/assets.json')

      if (response && response.data) {
        const measurementsData = response.data.find(
          (item: { assetId: number }) => item.assetId === assetId
        )

        if (measurementsData && measurementsData.measurements) {
          this.measurements[assetId] = measurementsData.measurements
        } else {
          const children = responseAssets.data.filter(
            (item: { parentId: number | null }) => item.parentId === assetId
          )
          const summedMeasurements: Measurement = {}

          for (const child of children) {
            const childMeasurements = this.getMeasurementsRecursively(
              child.id,
              responseAssets.data,
              response.data
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
      }
    },

    getMeasurementsRecursively(
      assetId: number,
      assets: Asset[],
      measurements: any[]
    ): Measurement | null {
      const asset = assets.find((item: { id: number }) => item.id === assetId)

      if (asset) {
        const assetMeasurements = measurements.find(
          (item: { assetId: number }) => item.assetId === assetId
        )

        if (assetMeasurements && assetMeasurements.measurements) {
          return assetMeasurements.measurements
        } else {
          const children = assets.filter(
            (item: { parentId: number | null }) => item.parentId === assetId
          )
          const summedMeasurements: Measurement = {}

          for (const child of children) {
            const childMeasurements = this.getMeasurementsRecursively(
              child.id,
              assets,
              measurements
            )
            if (childMeasurements) {
              for (const [key, value] of Object.entries(childMeasurements)) {
                summedMeasurements[key] =
                  (summedMeasurements[key] || 0) + (value as number)
              }
            }
          }

          if (Object.keys(summedMeasurements).length > 0) {
            return summedMeasurements
          }
        }
      }

      return null
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
        this.dataSets = Object.values(measurements).filter(
          (value): value is number => value !== null
        )
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
