import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
    feedback:{type:String,required:true}
},{ timestamps: true })

const feedbackModel=  new mongoose.model('feedback',feedbackSchema)

export default feedbackModel;