import mongoose from "mongoose";

const cartItemShema = new mongoose.Schema({
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts',
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    productName: {
        type: String
    },
    imgUrl: {
        type: String
    },
    carat: {
        type: String
    },
    quantity: {
        type: Number, required: true
    },
    price: {
        type: Number
    },
    discountedPrice: {
        type: Number
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
})

const CartItem = mongoose.model('cartItems', cartItemShema)
export default CartItem