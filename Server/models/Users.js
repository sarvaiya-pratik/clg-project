const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type: String,
        required : true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
    },
   role:{
    type:Number,
    default:0,
   }

},{timestamps:true})

const UserModel = mongoose.model("user",UserSchema)
module.exports=UserModel;

