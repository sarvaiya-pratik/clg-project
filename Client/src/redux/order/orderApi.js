import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserOrderData = createAsyncThunk("current-user-order", async () => {
    const response = await axios.get("/order/cuurent", { withCredentials: true })
    console.log(response.data)
    return response.data
})

export const getOrders = createAsyncThunk("order-all", async () => {
    const response = await axios.get("/order", { withCredentials: true })
    return response.data
})
export const updateOrderStatus = createAsyncThunk("order-status-update", async ({id,status}) => {
    const response = await axios.put(`/order/status/${id}`,{status} ,{ withCredentials: true })
    return response.data
})


export const getOrderById = createAsyncThunk("order-by-id", async (id) => {
    const response = await axios.get(`/order/orderId/${id}`, { withCredentials: true })
    return response.data
})

export const createOrder = createAsyncThunk("create-order", async (amount) => {
    const response = await axios.post("/order/createorder", { amount }, { withCredentials: true })
    return response.data
})

export const deleteOrder = createAsyncThunk("delete-order", async (id) => {
    const response = await axios.delete(`/order/remove/${id}`, { withCredentials: true })
    return response.data
})


export const paypayment = createAsyncThunk('pay-payment', async ({ amount, user }) => {
    try {
        const { data: { key } } = await axios.get("/order/getkey", { withCredentials: true })
        const { data: { order } } = await axios.post("/order/checkout", { amount }, { withCredentials: true })
      
        const options = {
            key: key,
            amount: order.amount,
            currency: "INR",
            name: user?.name,
            description: "Test Transaction",
            image: "",
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: "http://localhost:5050/order/paymentvarify",
            prefill: {
                name: user?.name,
                email: user?.email,
                contact: user?.phone,
            },
            notes: {
                customData1: 'my val',
            },
            theme: {
                color: "#3399cc"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open()

    } catch (error) {
        console.log(error)
    }


})