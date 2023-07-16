import axios from 'axios'

export async function fetchMeasurements() {
  const response = await axios.get('/measurements.json')
  return response.data
}
