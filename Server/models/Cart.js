// models/Cart.js
const mongoose = require('mongoose');

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


module.exports = mongoose.model('Cart', cartSchema);

