const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
   
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
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

