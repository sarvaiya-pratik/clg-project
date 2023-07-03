const mongoose = require("mongoose")

const StudSchema = mongoose.Schema({
    fname:String,
    lname:String,
    uname:String,
    email:String,
    password:String,
    cpassword:String,

})

const StudModel = mongoose.model("stud",StudSchema)
module.exports=StudModel;

