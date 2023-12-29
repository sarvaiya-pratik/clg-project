import { razorpay } from "../index.js"
import crypto from "crypto"

import Cart from "../models/cart.model.js";
import { OrderItem } from "../models/orderItem.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import CartItem from "../models/cartItem.model.js";

export const createOrder = async (req, res) => {
    const amount = req.body.amount;
    const userId = req.user._id;
    const user = await User.findById(userId)
    const cart = await Cart.findOne({ userId }).populate('items')

    const options = {
        amount: amount * 100, // Razorpay expects the amount in paise
        currency: 'INR',
        receipt: 'order_receipt_' + Math.random().toString(36).substring(7),
    };

    try {
        const response = await razorpay.orders.create(options);
        // Save the order details to MongoDB


        const order = new Order({
            userId,
            orderItems: [],
            shippingAddress: user.address[0],
            totalPrice: amount,
            totalItem: cart.totalItem,
            razorpay_order_id: response.id
        })



        const cartItem = await CartItem.find({ userId }).populate("productId")

        const orderItemss = cartItem.map((cartItem) => {
            let price = cartItem.price
            let quantity = cartItem.quantity
            let productId = cartItem.productId._id
            let productName = cartItem.productName
            let imgUrl = cartItem.imgUrl
            let carat = cartItem.carat

            return {
                productId, price, quantity, userId, productName, imgUrl, carat
            }
        })

        const saveOrderItem = await OrderItem.insertMany(orderItemss)

        order.orderItems = saveOrderItem
        await order.save()

        await CartItem.deleteMany({ cart: cart._id })
        cart.items = []
        cart.save()

        res.status(200).json({success:true,redirectUrl:`http://localhost:5173/payment/paymentsuccess?reference=${response.id}`})



    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
// res.status(200).json({ success: true, order: response, myorder: order });

export const checkout = async (req, res) => {
    const amount = req.body.amount;

    const options = {
        amount: amount * 100, // Razorpay expects the amount in paise
        currency: 'INR',
        receipt: 'order_receipt_' + Math.random().toString(36).substring(7),
    }

    try {
        const response = await razorpay.orders.create(options);

        // console.log(response)
        res.status(200).json({ success: true, order: response });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};



export const paymentVarification = async (req, res) => {

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body


    const userId = req.user._id;
    const user = await User.findById(userId)
    const cart = await Cart.findOne({ userId }).populate('items')


    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {


        const order = new Order({
            userId,
            orderItems: [],
            shippingAddress: user.address[0],
            totalPrice: cart.totalPrice,
            totalItem: cart.totalItem,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            paymentStatus: "paid",
            paymentMethod: "online"
        })

        const cartItem = await CartItem.find({ userId }).populate("productId")

        const orderItemss = cartItem.map((cartItem) => {
            let price = cartItem.price
            let quantity = cartItem.quantity
            let productId = cartItem.productId._id
            let productName = cartItem.productName
            let imgUrl = cartItem.imgUrl
            let carat = cartItem.carat

            return {
                productId, price, quantity, userId, productName, imgUrl, carat
            }
        })
        console.log(orderItemss)

        const saveOrderItem = await OrderItem.insertMany(orderItemss)

        order.orderItems = saveOrderItem
        await order.save()
        await CartItem.deleteMany({ cart: cart._id })
        cart.items = []
        cart.save()

        // existOrderItem = await OrderItem.findOne({ userId })

        // res.status(200).json({ success: true, order: response, myorder: order });

        return res.redirect(
            `http://localhost:5173/payment/paymentsuccess?reference=${razorpay_payment_id}`
        );
    } else {
        res.status(400).json({
            success: false,
        });
    }
}



export const getUserOrderData = async (req, res) => {

    try {
        const userId = req.user._id
        const order = await Order.find({ userId })
        console.log("Your order is", order)
        res.status(200).json({ success: true, order })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false })
    }


}


export const getOrderData = async (req, res) => {

    try {

        const order = await Order.find()
        res.status(200).json({ success: true, order })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false })
    }


}