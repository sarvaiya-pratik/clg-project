import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    title: { type: String, required: true, },
    catagory: { type: String, required: true, },
    imgUrl: { type: String, required: true, },
    shape: { type: String, required: true, },
    price: { type: Number, required: true, },
    carat: { type: String, required: true },
    colour: { type: String, default: "none" },
    clarity: { type: String, default: "none" },
    cut: { type: String, default: "none" },
    polish: { type: String, default: "none" },
    symmetry: { type: String, default: "none" },
    fluorescence: { type: String, default: "none" },
    table: { type: Number, default: "none" },
    depth: { type: Number, default: "none" },
    ratio: { type: Number, default: "none" },
    crownangle: { type: Number, default: "none" },
    crownheight: { type: Number, default: "none" },
    quantity:{
        type:Number,
        required:true,
    },
    
reviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'reviewa'
}],
ratting:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'rattings'
}],
createdAt:{
    type:Date,
    default:Date.now()
}

})

const Product = mongoose.model('products',productSchema)
export default Product