import { configureStore } from '@reduxjs/toolkit'
import  cartSlice  from './CartSlice'
import  Auth  from './Auth'
export const store = configureStore({
  reducer: {
    cart:cartSlice,
    Auth:Auth
  },
})