import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        unique:true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cartItems',
        // required: true
    }],
    totalPrice: { type: Number },
    totalItem: { type: Number },
    // totalDiscountedPrice: { type: Number },

})

const Cart = mongoose.model('carts', CartSchema)
export default Cart