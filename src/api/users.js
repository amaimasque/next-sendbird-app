import axios from '@/api/axios'
import {BASE_URL, USERS_RESOURCE} from '@/api/constants'

export const createUser = (data) => axios.post(`${BASE_URL}/${USERS_RESOURCE}`, data)

export const updateUser = (userId, data) => axios.put(`${BASE_URL}/${USERS_RESOURCE}/${userId}`, data)

export const randomUser = () => axios.get('https://randomuser.me/api')