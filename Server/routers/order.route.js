import express from 'express'
import { checkout, createOrder, getOrderData, getUserOrderData, paymentVarification } from '../controllers/order.controller.js'
import dotenv from "dotenv"
import { authUser } from '../middleware/authUser.js'
dotenv.config()
const router = express.Router()

router.route("/").get(authUser, getOrderData)
router.route("/cuurent").get(authUser, getUserOrderData)
router.route("/createorder").post(authUser, createOrder)
router.route("/checkout").post(authUser, checkout)
router.route("/paymentvarify").post(authUser, paymentVarification)
router.get("/getkey", (req, res) => {
    return res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
})

export default router