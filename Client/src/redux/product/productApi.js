import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getproductall = createAsyncThunk('products', async () => {
    try {
        const res = await axios.get('/products',{withCredentials:true})
        
        return res.data.products
    } catch (error) {
        throw error
    }

})


