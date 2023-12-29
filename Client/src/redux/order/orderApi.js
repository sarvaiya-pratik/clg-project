import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

export const getUserOrderData = createAsyncThunk("current-user-order", async () => {
    const response = await axios.get("/order/cuurent", { withCredentials: true })
    console.log(response.data)
    return response.data
})

export const getOrderData = createAsyncThunk("order-all", async () => {
    const response = await axios.get("/order/cuurent", { withCredentials: true })
    return response.data
})


export const createOrder = createAsyncThunk("create-order", async (amount) => {
    const response = await axios.post("/order/createorder", { amount }, { withCredentials: true })
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