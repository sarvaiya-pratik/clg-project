const mongoose = require("mongoose")

const StudSchema = mongoose.Schema({
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

const StudModel = mongoose.model("stud",StudSchema)
module.exports=StudModel;

