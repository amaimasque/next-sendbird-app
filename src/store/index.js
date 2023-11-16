import { createStore } from 'redux'
import appReducer from '@/reducers/appReducer'

// NOTE: recommended to migrate to reduxjs toolkit
const store = createStore(appReducer)

export default store