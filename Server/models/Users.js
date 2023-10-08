import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    }, 
    password: {
        type: String,
        required: true,
    },
    
    active: {
        type: Boolean,
        default: true,
    }

}, { timestamps: true })

const UserModel = mongoose.model("user", UserSchema)
export default UserModel;

