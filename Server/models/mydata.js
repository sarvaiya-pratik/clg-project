const mongoose = require("mongoose")

const mydataSchema = mongoose.Schema({
    stokeid: { type: Number, required: true, },
    catagory: { type: String, required: true, },
    title: { type: String, required: true, },
    threesixty: { type: String, required: true, },
    shape: { type: String, required: true, },
    price: { type: Number, required: true, },
    carat: { type: String, required: true, },
    colour: { type: String, required: true, },
    clarity: { type: String, required: true, },
    cut: { type: String, required: true, },
    polish: { type: String, required: true, },
    symmetry: { type: String, required: true, },
    fluorescence: { type: String, required: true, },
    measurements: { type: String, required: true, },
    depth: { type: String, required: true, },
    ratio: { type: String, required: true, },
    crownangle: { type: String, required: true, },
    crownheight: { type: String, required: true, },
    pavilionangle: { type: String, required: true, },
    paviliondepth: { type: String, required: true, },
    girdle: { type: String, required: true, },
    culet: { type: String, required: true, },
}, { timestamps: true })

const DataModel = mongoose.model("mydata", mydataSchema)
module.exports = DataModel;

