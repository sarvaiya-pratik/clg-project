import { createSlice } from "@reduxjs/toolkit";
import { createOrder, deleteOrder, getOrderById, getOrders, getUserOrderData, updateOrderStatus } from "./orderApi";


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

            .addCase(getOrders.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.loading = false
                state.order = action.payload.order

            })
            .addCase(getOrders.rejected, (state, action) => {
                state.loading = false
                state.order = null
                state.loading = false
            })

            .addCase(getUserOrderData.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(getUserOrderData.fulfilled, (state, action) => {
                state.loading = false
                state.order = action.payload.order

            })
            .addCase(getUserOrderData.rejected, (state, action) => {
                state.loading = false
                state.order = null,
                    state.loading = false
            })

            .addCase(getOrderById.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.loading = false
                state.order = action.payload.order
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.loading = false
                state.order = null,
                    state.loading = false
            })

            .addCase(updateOrderStatus.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false
                state.order = action.payload.order
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false
                state.order = null,
                    state.loading = false
            })
            .addCase(deleteOrder.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false
                state.order = action.payload.order
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false
                state.order = null,
                    state.loading = false
            })

    }
})

export default orderSlice.reducer