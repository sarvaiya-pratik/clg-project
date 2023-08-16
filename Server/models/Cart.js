const mongoose = require("mongoose")

const CartSchema = mongoose.Schema({

    userId: {
        type: String,
        required: [true, "User is Required"]
    },
    product: {
        type: Object,
        required: [true, 'Product Name Is Required']
    }
})

const CartModel = mongoose.model("cart", CartSchema);
module.exports = CartModel;
