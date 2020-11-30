import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appReducer.js'

export default configureStore({
  reducer: {
    app:appReducer
  }
})
