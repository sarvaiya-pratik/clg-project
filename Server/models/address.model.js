import mongoose from "mongoose";

const AddressShema = new mongoose.Schema({
    fname:{type:String,required:true},
    lname:{type:String,required:true},
    streetAddress:{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    pincode:{type:Number,required:true},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
})

const Address = mongoose.model('address',AddressShema)
export default Address



4