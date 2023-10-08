import feedbackModel from '../models/Feedback.js';
// POST || ADD-FEEDBACK
const addFeedback=async(req,res)=>{
const {feedback} = req.body;
if(feedback){
    const doc = await new feedbackModel({feedback});
    await doc.save();
    res.status(201).json({message:"Feedback send succesfully !"})
}
else{
    res.json({message:"Feedback can't be empty !"})
}
}

// GET || READ-FEEDBACK

const getFeedback = async(req,res)=>{
    const doc = await feedbackModel.find();
     res.json(doc);
}

//  DELETE || DELETE-FEEDBACK
const deleteFeedback =async (req,res)=>{
    const id = req.params.id

    try {
        await feedbackModel.findByIdAndDelete({_id:id});
        res.json({message:"Delete succesfully"})
        
    } catch (error) {
        res.send("Catch ")
    }

}
export  {addFeedback,getFeedback,deleteFeedback};