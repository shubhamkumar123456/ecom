import { createSlice } from '@reduxjs/toolkit'

let details = JSON.parse(localStorage.getItem('ecomLogin'))
const initialState = {
  login:details?true :false,
  email:details? details.email :''
}

export const Auth = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setLogin:(state ,action)=>{
        // console.log(action)
        state.login = true,
        state.email = action.payload.email
    },
    setLogout:(state)=>{
        localStorage.removeItem('ecomLogin')
        state.login=false;
        state.email = ""
    },

    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLogin, setLogout, incrementByAmount } = Auth.actions

export default Auth.reducer