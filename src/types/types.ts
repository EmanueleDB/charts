export interface Asset {
  id: number
  name: string
  parentId: number | null
  children?: Asset[]
}

export interface Measurement {
  [date: string]: number | null
}
