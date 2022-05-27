import { configureStore } from '@reduxjs/toolkit'
import portfolioReducer from '../../features/portfolio/portfolioSlice'

export default configureStore({
  reducer: {
    portfolio: portfolioReducer
  },
})