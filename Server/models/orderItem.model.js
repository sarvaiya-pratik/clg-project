import mongoose from "mongoose";

const orderItemShema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountedPrice: {
        type: Number,
    },
    productName: {
        type: String,
    },
    imgUrl: {
        type: String,
    },
    carat: {
        type: String,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }
})

export const OrderItem = mongoose.model("orderItems", orderItemShema)