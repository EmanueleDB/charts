// src/utils.ts
import { Asset, Measurement } from './types/types'

export function buildAssetTree(data: Asset[]) {
  const assets: Asset[] = []
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

  assets.forEach((asset) => {
    const parentId = asset.parentId
    if (parentId !== null && assetMap[parentId]) {
      assetMap[parentId].children?.push(asset)
    }
  })

  return assets.filter((asset) => asset.parentId === null)
}

export function getMeasurementsRecursively(
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
        const childMeasurements = getMeasurementsRecursively(
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
}

export function formatDates(measurements: Measurement) {
  const dates = Object.keys(measurements)
  return dates.map((date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      year: 'numeric',
    })
  })
}

export function getDataSets(measurements: Measurement) {
  return Object.values(measurements).filter(
    (value): value is number => value !== null
  )
}
