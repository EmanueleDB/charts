import axios from 'axios'

export async function fetchMeasurements() {
  const response = await axios.get('/data/measurements.json')
  return response.data
}
