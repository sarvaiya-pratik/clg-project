import express from 'express'
import { checkout, createOrder, deleteOrder, getOrderById, getOrderData, getUserOrderData, paymentVarification, updateOrderStatus } from '../controllers/order.controller.js'
import dotenv from "dotenv"
import { authUser } from '../middleware/AuthUser.js'
dotenv.config()
const router = express.Router()


router.get("/",getOrderData)
router.get("/cuurent",authUser, getUserOrderData)

router.post("/createorder",authUser, createOrder)
router.post("/checkout",authUser, checkout)
router.post("/paymentvarify",authUser, paymentVarification)
router.get("/orderId/:id",getOrderById)
router.put("/status/:id",updateOrderStatus)
router.delete("/remove/:id",deleteOrder)

router.get("/getkey", (req, res) => {
    return res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
})

export default router