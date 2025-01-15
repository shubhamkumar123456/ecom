import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const initialState = {
  arr:[],
  search:""
}

export const cartSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addToCart: (state,action) => {
        console.log(action)

     let find =  state.arr.find((obj)=>obj.id===action.payload.id)
     if(find){
       toast.warning('item already added',{position:"top-center"})
     }
     else{
      action.payload.quantity = 1
      state.arr.push(action.payload)

      toast.success('item added successfully',{position:"top-center"})
     }

       
    },
    updateIncrement: (state,action) => {
      let obj = {...action.payload}
      obj.price = obj.price + (obj.price/ obj.quantity)
      obj.quantity = obj.quantity +1
      console.log(obj)
      let index = state.arr.findIndex((ele)=>ele.id===action.payload.id)

      state.arr[index] = obj
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, updateIncrement, incrementByAmount } = cartSlice.actions

export default cartSlice.reducer