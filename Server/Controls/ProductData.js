const DataModel = require('../models/productdata')
const AddProductData = async (req, res) => {

    const { title, catagory, threesixty, shape, price, carat, colour, clarity, cut, polish, symmetry, fluorescence, measurements, table, depth, ratio, crownangle, crownheight, pavilionangle, paviliondepth, } = req.body;
    if (title && catagory && threesixty && shape) {
        const productData = await DataModel.findOne({ title });
        if (productData) {
            res.json({message:"Data Alreay Exist !"})
        }
        else {
            let doc = await new DataModel({ title, catagory, threesixty, shape, price, carat, colour, clarity, cut, polish, symmetry, fluorescence, table, depth, ratio, crownangle, crownheight, pavilionangle, paviliondepth, })
            await doc.save();
            res.status(201).send("Record insert successfully")
        }
    }
    else {
        res.json({ message: "All Fields are required" })
    }
}

const GetProductData = async (req, res) => {

    const productData = await DataModel.find();
    res.json(productData)
}

module.exports = { AddProductData, GetProductData }