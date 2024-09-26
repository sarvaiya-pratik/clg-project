import { Schema, model } from "mongoose";

const OtherSchema = new Schema({
    color: {
        type: Array,
    },
    clarity: {
        type: Array,
    },
    cut: {
        type: Array,
    },
    polish: {
        type: Array,
    },
    summetry: {
        type: Array,
    },
    Fluorescence: {
        type: Array,
    }

},
    { timestamps: true }
)
export const Other = model("other", OtherSchema)
