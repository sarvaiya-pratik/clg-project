import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getproductall = createAsyncThunk('products', async () => {
    try {
        const res = await axios.get('/products', { withCredentials: true })

        return res.data.products
    } catch (error) {
        throw error
    }
})

export const getProductById = createAsyncThunk('getproduct-by-id', async (pid) => {
    const response = await axios.get(`/products/${pid}`, { withCredentials: true })
    return response.data.product
})

export const deleteProductById = createAsyncThunk('delete-product', async (id) => {
    const res = await axios.delete(`/products/${id}`)
    return res.data.product
})


export const updateProductById = createAsyncThunk('update-product', async (prductData) => {
    const { id } = prductData
    const res = await axios.put(`/products/${id}`, prductData, { withCredentials: true })
    return res.data.product
})

