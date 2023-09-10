
const DataModel = require('../models/productdata')

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dvnubzprf',
    api_key: '355881747719519',
    api_secret: 'N9twT6TyEA79iaVrisgngm-rm6I'
});


// POST || ADD-PRODUCTS
const AddProductData = async (req, res) => {
    const { title, catagory, shape, price, carat, colour, clarity, cut, polish, symmetry, fluorescence, measurements, table, depth, ratio, crownangle, crownheight, pavilionangle, paviliondepth, } = req.body;
    if (title && catagory && shape && carat && price) {
        const productData = await DataModel.findOne({ title });
        if (productData) {
            res.json({ message: "Data Alreay Exist !" })
        }
        else {
            if (req.file) {
                const transformationOptions = {
                    width: 300, 
                    height: 300, 
                    crop: 'fill', 
                  };

                cloudinary.uploader.upload_stream(
                    { transformation: transformationOptions },
                    async (error, result) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).json({ message: 'Upload failed' });
                    }

                    let newcount = await DataModel.countDocuments() + 1
                    let doc = await new DataModel({ title, "id": newcount, catagory, "threesixty": result.secure_url, shape, price, carat, colour, clarity, cut, polish, symmetry, fluorescence, table, depth, ratio, crownangle, crownheight, pavilionangle, paviliondepth, })
                    await doc.save();
                    res.status(201).send("Record insert successfully")

                }).end(req.file.buffer);


            }
            else {
                res.json({ message: "error in file img" })
            }
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