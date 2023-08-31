const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
        userId:{type:String},
        fname:{type:String},
        lname:{type:String},
        city:{type:String},
        zip:{type:String},
        address:{type:String},
        email:{type:String},
        
},{timestamps:true})

const orderModel = mongoose.model("order",orderSchema)

module.exports=orderModel;