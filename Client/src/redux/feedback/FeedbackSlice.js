import { createSlice } from "@reduxjs/toolkit";
import { createReview, deleteFeedback, getRateAndReview } from "./FeedbackApi";

const initialState = {

    reviews: [],
    loading: false,
    error: null
}
const FeedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(createReview.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.loading = false
                state.reviews = action.payload
                state.error = null
            })

            .addCase(createReview.rejected, (state, action) => {
                state.loading = false
                state.error = null
            })
            .addCase(getRateAndReview.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getRateAndReview.fulfilled, (state, action) => {
                state.loading = false
                state.reviews = action.payload
                state.error = null
            })

            .addCase(getRateAndReview.rejected, (state, action) => {
                state.loading = false
                state.error = null
            })
            .addCase(deleteFeedback.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteFeedback.fulfilled, (state, action) => {
                state.loading = false
                state.reviews = action.payload
                state.error = null
            })

            .addCase(deleteFeedback.rejected, (state, action) => {
                state.loading = false
                state.error = null
            })



    }


})

export default FeedbackSlice.reducer