import { createSlice } from "@reduxjs/toolkit";
import { addCartToUser, deleteCartItem, getUserCart } from "./cartApi";

let initialState = {
    cart: null,
    loading: false,
    error: null
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getUserCart.pending, (state) => {
            state.loading = true
            state.error = null
            state.cart = null
        })
            .addCase(getUserCart.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.cart = action.payload.cart

            })
            .addCase(getUserCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            });


        builder.addCase(addCartToUser.pending, (state) => {
            state.loading = true
            state.error = null
            // state.cart = null
        })
            .addCase(addCartToUser.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.cart = action.payload.cart
            })
            .addCase(addCartToUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            });

        builder.addCase(deleteCartItem.pending, (state, action) => {
            state.loading = true

        })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.loading = false
                state.cart = action.payload.cart
                state.error = null
            })
            .addCase(deleteCartItem.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

    }
})

export default cartSlice.reducer