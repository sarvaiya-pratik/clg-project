import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getUserCart = createAsyncThunk('getusercart', async () => {
    try {
        const response = await axios.get('/cart/currentcart',{withCredentials:true})
        return response.data
    } catch (error) {
        throw error.response.data
    }
})

export const addCartToUser = createAsyncThunk('addcart', async ({  productId,quantity }) => {
   try {
     const response = await axios.post(`/cart/add`, {  productId, quantity },{withCredentials:true})
     return response.data
   } catch (error) {
        throw error.response.data
   }
})
export const deleteCartItem = createAsyncThunk('deletecart', async (id) => {
  try {
      const response = await axios.delete(`/cart/delete/${id}`,{withCredentials:true})
      return response.data
  } catch (error) {
        throw error.response.data
  } 
})
