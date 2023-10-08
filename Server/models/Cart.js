// models/Cart.js
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: String, ref: "user", required: true },
  items: [
    {
      productId: { type: String, ref: "mydata", required: true },
      quantity: { type: Number, default: 1, required: true }
    },
  ],
  totalAmount: Number
});


const cartModel = mongoose.model('cart', cartSchema);
export default cartModel

