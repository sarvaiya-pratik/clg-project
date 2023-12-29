import { createSlice } from "@reduxjs/toolkit";
import { createOrder, getUserOrderData } from "./orderApi";


const initialState = {
    order: null,
    loading: false,
    error: null
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
       builder


            .addCase(getUserOrderData.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(getUserOrderData.fulfilled, (state, action) => {
                state.loading = false,
                    state.order = action.payload.order

            })
            .addCase(getUserOrderData.rejected, (state, action) => {
                state.loading = false,
                    state.order = null,
                    state.loading = false
            })


    }
})

export default orderSlice.reducer