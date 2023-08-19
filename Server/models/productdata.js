const mongoose = require("mongoose")

const mydataSchema = mongoose.Schema({
   
    title: { type: String, required: true, },
    id: { type: Number, required: true, },
    catagory: { type: String, required: true, },
    threesixty: { type: String, required: true, },
    shape: { type: String, required: true, },
    price: { type: Number, required: true, },
    carat: { type: String,required:true },
    colour: { type: String, default:"none"  },
    clarity: { type: String, default:"none"  },
    cut: { type: String, default:"none"  },
    polish: { type: String, default:"none"  },
    symmetry: { type: String, default:"none" },
    fluorescence: { type: String, default:"none"},
    table: { type: String,  default:"none" },
    depth: { type: String,  default:"none" },
    ratio: { type: String, default:"none"  },
    crownangle: { type: String,  default:"none" },
    crownheight: { type: String,  default:"none" },
    pavilionangle: { type: String, default:"none"  },
    paviliondepth: { type: String, default:"none" },
   
}, { timestamps: true })

const DataModel = mongoose.model("mydata", mydataSchema)
module.exports = DataModel;

