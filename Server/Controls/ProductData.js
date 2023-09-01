
const DataModel = require('../models/productdata')

// POST || ADD-PRODUCTS
const AddProductData = async (req, res) => {
    const { title, catagory, threesixty, shape, price, carat, colour, clarity, cut, polish, symmetry, fluorescence, measurements, table, depth, ratio, crownangle, crownheight, pavilionangle, paviliondepth, } = req.body;
    if (title && catagory && threesixty && shape && carat && price) {
        const productData = await DataModel.findOne({ title });
        if (productData) {
            res.json({ message: "Data Alreay Exist !" })
        }
        else {
            let newcount = await DataModel.countDocuments() + 1
            let doc = await new DataModel({ title, "id": newcount, catagory, threesixty, shape, price, carat, colour, clarity, cut, polish, symmetry, fluorescence, table, depth, ratio, crownangle, crownheight, pavilionangle, paviliondepth, })
            await doc.save();
            res.status(201).send("Record insert successfully")
        }
    }
    else {
        res.json({ message: "All Fields are required" })
    }
}

// GET || READ-PRODUCTS
const GetProductData = async (req, res) => {


    const productData = await DataModel.find();
    res.json(productData)
}

// DELETE || DELETE-PRODUCTS
const deleteProduct = async (req, res) => {
    const id = req.params['id']

    try {
        await DataModel.findOneAndDelete({ "_id": id })
            .then(() => console.log("delete success"))
            .catch((e) => {
                console.log(e)
            })
        console.log("delete")

        res.json({ message: "deleted successfully" })

    } catch (error) {
        return error
    }
}

module.exports = { AddProductData, GetProductData, deleteProduct }