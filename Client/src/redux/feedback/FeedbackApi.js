import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const createReview = createAsyncThunk('review', async ({ formdata, pid }) => {
    try {
        const response = await axios.post(`/feedback/review/${pid}`, formdata, { withCredentials: true })
        return response.data.review

    } catch (error) {
        console.error("Pratik", error.message)
    }
})

export const getRateAndReview = createAsyncThunk('get-feedback', async () => {
    const response = await axios.get('/feedback', { withCredentials: true })
    return response.data.feedback
})


export const deleteFeedback = createAsyncThunk('delete-feedback', async (id) => {

    const response = await axios.delete(`/feedback/${id}`, { withCredentials: true })
    return response.data.feedback
})