import Product from "../models/product.model.js";
import Review from "../models/review.model.js";
import User from "../models/user.model.js";

export const reviewProduct = async (req, res) => {
    try {
        const { description, title, ratting } = req.body
        console.log('rate',req.body)
        const { pid } = req.params
        const userId = req.user._id;
        if(!ratting){
            return res.status(401).json({succes:false,message:"Ratting must me required"})
        }
        if(!description){
            return res.status(401).json({succes:false,message:"Description must me required"})
        }
        const isExist = await Review.findOne({ product: pid, user: userId })

        if (isExist) {
            isExist.description = description
            isExist.title = title
            isExist.ratting = ratting
            await isExist.save()
            return res.status(200).json({ succes: true, review: isExist })
        }
        else {
            const review = new Review({
                user: userId,
                description,
                title,
                ratting,
                userName: req.user.name,
                product: pid
            })
            await review.save()
            await Product.findByIdAndUpdate(pid, {
                $push: { reviews: review }
            })

            return res.status(200).json({ succes: true, review: review })
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}

export const getFeedback = async (req, res) => {
    try {

       const feedback = await Review.find().populate('user').populate('product')
        return res.status(200).json({ succes: true, feedback })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }
}

export const deleteFeedback = async (req, res) => {
    try {
        const {id} = req.params
       await Review.findByIdAndDelete(id)
       const feedback = await Review.find().populate('user').populate('product')
       return res.status(200).json({
        success: true,
        feedback,
        message: "Deleted succesfully"
    })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message })
    }

}
