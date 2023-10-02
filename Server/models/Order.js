const mongoose = require("mongoose")
const orderSchema = mongoose.Schema({
        userId: { type: String },
        fname: { type: String },
        lname: { type: String },
        city: { type: String },
        zip: { type: String },
        address: { type: String },
        email: { type: String },
        pname: { type: String },
        qty: { type: Number },
        price:{type:Number},
        active: {
                type: Boolean,
                default: false,
            }
        
}, { timestamps: true })

const orderModel = mongoose.model("order", orderSchema)

module.exports = orderModel; 