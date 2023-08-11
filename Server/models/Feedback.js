const mongoose = require("mongoose")

const feedbackSchema = mongoose.Schema({
    feedback:{type:String,required:true}
},{ timestamps: true })

const feedbackModel=  new mongoose.model('feedback',feedbackSchema)

module.exports=feedbackModel;