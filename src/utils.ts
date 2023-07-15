import { Asset, Measurement } from './types/types'

export function buildAssetTree(data: Asset[]) {
  // An empty array that will store the asset objects.
  const assets: Asset[] = []
  // An empty object that will serve as a map to quickly access assets by their IDs.
  const assetMap: Record<number, Asset> = {}

  data.forEach((obj: Asset) => {
    const { id, parentId, ...rest } = obj

    // Within each iteration, the id, parentId, and remaining properties of the Asset
    // object are extracted using object destructuring. The remaining properties are
    // collected into the rest object.
    const asset: Asset = {
      id,
      parentId,
      children: [],
      ...rest,
    }

    // The newly created asset is added to the assets array using the push method.
    assets.push(asset)
    // The asset is also added to the assetMap object using the id as the key.
    assetMap[id] = asset
  })

  //It iterates over each asset in the assets array using the forEach method.
  // For each asset, it retrieves the parentId.
  assets.forEach((asset) => {
    const parentId = asset.parentId
    //If the parentId is not null and there exists an asset in the assetMap
    // with the corresponding parentId, it means the current asset is a child
    // of another asset.
    if (parentId !== null && assetMap[parentId]) {
      assetMap[parentId].children?.push(asset)
    }
  })
  // Finally, the function filters the assets array to find the root assets,
  // i.e., assets with a parentId of null.
  return assets.filter((asset) => asset.parentId === null)
}

// The function takes three parameters:
// assetId: The ID of the asset for which measurements are being retrieved.
// assets: An array of all assets.
// measurements: An array of objects containing measurements for different assets.
export function getMeasurementsRecursively(
  assetId: number,
  assets: Asset[],
  measurements: { assetId: number; measurements: Measurement }[]
): Measurement | null {
  const asset = assets.find((item: { id: number }) => item.id === assetId)

  if (asset) {
    const assetMeasurements = measurements.find(
      (item: { assetId: number }) => item.assetId === assetId
    )

    // The function starts by finding the asset with the specified assetId
    // from the assets array.If the asset is found, it checks if there are
    // measurements available for that asset by searching the measurements
    // array for an object with the same assetId. If measurements are found, they are returned.
    if (assetMeasurements && assetMeasurements.measurements) {
      return assetMeasurements.measurements
    } else {
      // If no measurements are found for the current asset, the function
      // proceeds to find the children of the asset by filtering the assets
      // array based on the parentId property.
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
        // The recursive call returns the measurements for the child asset.
        // If measurements are obtained for the child asset, they are added
        // to the summedMeasurements object by iterating over the measurement
        // keys and accumulating the values.
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
