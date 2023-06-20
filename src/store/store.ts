import { defineStore } from 'pinia'

export interface Asset {
  id: number
  name: string
  parentId: number | null
  children?: Asset[]
}

export const useStore = defineStore('store', {
  state: () => ({
    assets: [] as Asset[],
  }),

  actions: {
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
  },
})
