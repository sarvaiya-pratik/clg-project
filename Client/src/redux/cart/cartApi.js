import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getUserCart = createAsyncThunk('getusercart', async () => {
    const response = await axios.get('/cart/currentcart',{withCredentials:true})
    console.log("cart", response.data)
    return response.data
})

export const addCartToUser = createAsyncThunk('addcart', async ({  productId,quantity }) => {
    const response = await axios.post(`/cart/add`, {  productId, quantity },{withCredentials:true})
   
    return response.data
})
export const deleteCartItem = createAsyncThunk('deletecart', async (id) => {
  
    const response = await axios.delete(`/cart/delete/${id}`,{withCredentials:true})
   
    return response.data
})
