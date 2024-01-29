import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    userName: {
        type: String
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    ratting: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }

})

const Review = mongoose.model('reviews', reviewSchema)
export default Review;
