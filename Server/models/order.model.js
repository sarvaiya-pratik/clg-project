import mongoose from "mongoose";

const currentDate = new Date();
const futureDate = new Date(currentDate);
futureDate.setDate(currentDate.getDate() + 3);

const orderSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},

    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderItems'
    }],
    orderDate: {
        type: Date,
        default: Date.now()
    },
    deliveryDate: {
        type: Date,
        default: futureDate
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address'
    },
    paymentMethod: {
        type: String,
        enum: ['offline', 'online'],
        default: "offline"
    },
    totalPrice: {
        type: Number,
        required: true
    },
    totalDiscoutedPrice: {
        type: Number
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancel'],
        default: 'pending'
    },
    totalItem: {
        type: Number,
        required: true
    },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'refunded'], default: 'pending' },
    razorpay_order_id: {
        type: String,
    },
    razorpay_payment_id: {
        type: String,

    },
    razorpay_signature: {
        type: String,

    },
    createAt: {
        type: Date,
        default: Date.now()
    }

})

const Order = mongoose.model('orders', orderSchema)
export default Order