import { configureStore } from '@reduxjs/toolkit'
import senryuReducer from '../state/senryuSlice'

export default configureStore({
  reducer: {
    senryu: senryuReducer
  },
})