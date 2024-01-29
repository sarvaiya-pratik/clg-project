import { Category } from "../models/Category.model.js"
import Product from "../models/product.model.js"
import { uploadFile } from "../utils/cloudinary.js"





const addProduct = async (req, res) => {
    const { title, catagory, shape, price, carat, colour, clarity, cut, polish, symmetry, fluorescence, table, depth, ratio, crownangle, crownheight, quantity } = req.body
    try {
        if (title && catagory && shape && price && carat && quantity) {

            const existproduct = await Product.findOne({ title })
            if (existproduct) {
                return res.status(400).json({ error: "Product name alredy exist" })
            }


            if (!req.file) {
                return res.status(400).json({ error: "Image must be sent" })
            }

            const response = await uploadFile(req.file.path)

            if (!response) {
                return res.status(400).json({ error: "Error in cloudanary" })
            }

            const newproduct = new Product({ title, catagory, imgUrl: response.url, shape, price, carat, colour, clarity, cut, polish, symmetry, fluorescence, table, depth, ratio, crownangle, crownheight, quantity })
            await newproduct.save()
            return res.status(201).json({
                success: true,
                message: "Added succesfully"
            })

        }
        else {
            return res.status(400).json({ error: "All fields are required " })
        }

    } catch (error) {
        console.log(error.message)
        return res.status(500).send(error.message)

    }
}

const getProductById = async (req, res) => {
    const { productId } = req.params;
    try {

        const product = await Product.findById(productId).populate("reviews").populate("shape")
        return res.status(200).json({
            success: true,
            product
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }

}
const getAllProduct = async (req, res) => {

    try {
        const products = await Product.find().populate("shape")

        return res.status(200).json({
            success: true,
            products
        })

    } catch (error) {
        console.log("EROROR", error)
        return res.status(500).send(error.message)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        let existproduct = await Product.findById(productId)
        if (existproduct) {
            await Product.findByIdAndDelete(productId)

            const product = await Product.find().populate("shape")
            return res.status(200).json({
                success: true,
                product,
                message: "Deleted succesfully"
            })

        }
        else {
            res.status(400).json({ error: "Product not exist" })
        }

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const updateProductById = async (req, res) => {

    const { productId } = req.params;
    const { title, price, carat, quantity, catagory, shape, colour, clarity, cut, polish, symmetry, fluorescence, table, depth, ratio, crownangle, crownheight } = req.body
    try {
        let existproduct = await Product.findById(productId)
        if (existproduct) {
            await Product.findByIdAndUpdate(productId, { title, price, carat, quantity, catagory, shape, colour, clarity, cut, polish, symmetry, fluorescence, table, depth, ratio, crownangle, crownheight })
            return res.status(200).json({
                success: true,
                message: "Updated succesfully"
            })

        }
        else {
            res.status(400).json({ error: "Product not exist" })
        }


    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const exportData = async (req, res) => {
    try {
        console.log("YESssssssss")
        const { selectedCheckboxes } = req.body

        const product = await Product.find({ _id: { $in: selectedCheckboxes } }).select('-ratting -reviews')
        return res.status(200).json({ message: "OK", product })

    } catch (error) {
        console.log(error)
    }

}

const createCategory = async (req, res) => {
    try {
        const { category } = req.body

        const data = new Category({ category })
        await data.save()
        const allcategory = await Category.find()
        return res.status(200).json({ success: false, category: allcategory })

    } catch (error) {
        console.log(error.message)
        return res.status(500).send(error.message)
    }
}

const getCategory = async (req, res) => {
    try {
        const category = await Category.find()
        return res.status(200).json({ success: true, category })
    } catch (error) {
        console.log("ERROR", error.message)
        return res.status(500).send(error.message)
    }
}

const updateCategory = async (req, res) => {
    try {
        const id = req.params.categoryId;

        const { editCategoryValue } = req.body

        await Category.findByIdAndUpdate(id, { category: editCategoryValue })

        const category = await Category.find()
        return res.status(200).json({ success: true, category })

    } catch (error) {
        console.log("ERROR", error.message)
        return res.status(500).send(error.message)
    }
}

const deleteCategory = async (req, res) => {
    try {
        const id = req.params.categoryId;


        await Category.findByIdAndDelete(id)

        const category = await Category.find()
        return res.status(200).json({ success: true, category })

    } catch (error) {
        console.log("ERROR", error.message)
        return res.status(500).send(error.message)
    }
}


export { addProduct, updateProductById, deleteProduct, getAllProduct, getProductById, exportData, createCategory, getCategory, updateCategory, deleteCategory }