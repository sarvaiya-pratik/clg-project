import mongoose from "mongoose";

const rattingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    },
    ratting:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const Ratting = mongoose.model('rattings',rattingSchema)
export default Ratting;
