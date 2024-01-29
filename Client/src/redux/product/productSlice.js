import { createSlice } from "@reduxjs/toolkit";
import { deleteProductById, getProductById, getproductall } from "./productApi";

let initialState = {
    products: [],
    loading: false,
    error: null
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {   
           
    },
    extraReducers: (builder) => {
        builder
        .addCase(getproductall.pending,(state,action)=>{
             state.loading = true
             state.error=null
         })
         .addCase(getproductall.fulfilled,(state,action)=>{
             state.loading = false
             state.products=action.payload
            
             state.error=null
            
         })
         .addCase(getproductall.rejected,(state,action)=>{
             state.loading = false
             state.error=action.error.message
             console.log("rejected product")
         })


        .addCase(getProductById.pending,(state,action)=>{
             state.loading = true
             state.error=null
         })
         .addCase(getProductById.fulfilled,(state,action)=>{
             state.loading = false
             state.products=action.payload
            
             state.error=null
            
         })
         .addCase(getProductById.rejected,(state,action)=>{
             state.loading = false
             state.error=action.error.message
             ("rejected product")
         })

         
        .addCase(deleteProductById.pending,(state,action)=>{
             state.loading = true
             state.error=null
         })
         .addCase(deleteProductById.fulfilled,(state,action)=>{
             state.loading = false
             state.products=action.payload
             state.error=null
         })
         .addCase(deleteProductById.rejected,(state,action)=>{
             state.loading = false
             state.error=action.error.message
         })

    }
})

export default productSlice.reducer