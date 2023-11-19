import axios from '@/api/axios'
import {BASE_URL, CHANNELS_RESOURCE} from '@/api/constants'

export const createChannel = (data) => axios.post(`${BASE_URL}/${CHANNELS_RESOURCE}`, data)
