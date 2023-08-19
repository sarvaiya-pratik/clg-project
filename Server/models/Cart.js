// models/Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: String,
  products: [
    {
      productId:String,
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);
