import { userLogin, userRegister } from './redux/userReducer'
// import { combineReducers } from 'redux'

// const reducer = combineReducers({
//     userLogin: userLogin,
//     userRegister: userRegister,

// })
import { configureStore } from '@reduxjs/toolkit'


const store = configureStore({
    reducer: {
        userLogin: userLogin,
        userRegister: userRegister,
    }
  })
  export default store