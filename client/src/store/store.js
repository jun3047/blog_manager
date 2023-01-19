import { configureStore, createSlice } from '@reduxjs/toolkit'


let user = createSlice({
    name : 'user',
    initialState : {},
    reducers : {
        setUser(state, action){
            state = action.payload
            return state
        },
        pulsData(state, action){
            state.data.push(action.payload)
        }
    }
})

export let {setUser, pulsData} = user.actions


export default configureStore({

   reducer: {
    user: user.reducer
  }

}) 
