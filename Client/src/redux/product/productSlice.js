import { createSlice } from "@reduxjs/toolkit";
import { getproductall } from "./productApi";

let initialState = {
    products: null,
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
             console.log("fullfill")
         })
         .addCase(getproductall.rejected,(state,action)=>{
             state.loading = false
             state.error=action.error.message
             console.log("rejected product")
         })
         
    }
})

export default productSlice.reducer