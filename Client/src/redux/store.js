import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import userSlice from './user/userSlice'
import productSlice from './product/productSlice'
import cartSlice from './cart/cartSlice'
import orderSlice from './order/orderSlice'
import FeedbackSlice from './feedback/FeedbackSlice'
// import storage from 'redux-persist/lib/storage'
// import {persistReducer} from 'redux-persist'
// import { combineReducers } from '@reduxjs/toolkit'


// const persistConfig = {
//   key:"root",
//   version:1,
//   storage
// };

// const reducer = combineReducers({
//   auth:authSlice,
//   user:userSlice,
//   product:productSlice
// })

// const persistedReducer = persistReducer(persistConfig,reducer)

// const store = configureStore({
//   reducer:persistedReducer
// })

const store = configureStore({
  reducer:
  {
    auth: authSlice,
    user: userSlice,
    product: productSlice,
    cart: cartSlice,
    order: orderSlice,
    feedback:FeedbackSlice
  }
})

export default store