import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number },
    password: { type: String },
    googleId: { type: String },
    image: { type: String },
    dob: { type: Date },
    gender: { type: String },
    isAdmin: { type: Boolean, default: false },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address'
    }],
    paymentInformation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payment_information'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reviews'
    }],
    ratting: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rattings'
    }],
    token:{
        type:String
    },
    tokenExpires:{
        type:Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model('users', userShema)

export default User;