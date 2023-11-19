import axios from 'axios'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? ""
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ""


const customAxios = axios.create({
  headers: {
    'content-type': 'application/json',
    'api-key': API_KEY
  },
  baseURL: API_BASE_URL
})

export default customAxios