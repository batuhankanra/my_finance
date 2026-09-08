import { configureStore } from '@reduxjs/toolkit'
import trans_action_reducer from './slices/transactions'

export const store = configureStore({
  reducer: {
    transactionUI:trans_action_reducer
  }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store