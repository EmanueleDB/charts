import axios from 'axios'

export async function fetchAssets() {
  const response = await axios.get('/data/assets.json')
  return response.data
}
