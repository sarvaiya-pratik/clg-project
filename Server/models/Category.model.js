import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
    category: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)
export const Category = model("category", CategorySchema)
