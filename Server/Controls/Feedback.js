const feedbackModel = require('../models/Feedback')


const addFeedback=async(req,res)=>{
const {feedback} = req.body;
if(feedback){
    const doc = await feedbackModel({feedback});
    await doc.save();
    res.status(201).json({message:"Feedback send succesfully !"})
}
else{
    res.json({message:"Feedback can't be empty !"})
}
}

const getFeedback = async(req,res)=>{
    const doc = await feedbackModel.find();
     res.json(doc);
}
module.exports = {addFeedback,getFeedback};