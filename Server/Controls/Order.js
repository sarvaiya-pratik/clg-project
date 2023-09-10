const orderModel = require("../models/Order")
const Cart = require("../models/Cart")
const productModel = require("../models/productdata")
// GET || READ-ORDER
const getOrderDetail = async (req, res) => {
    try {
        const order = await orderModel.find();
        res.json({ status: "success", order })

    } catch (error) {
        res.json({ status: "failed" })
    }
}

// DELETE || DELETE-ORDER
const DeleteOrder = async (req, res) => {
    const _id = req.params._id;
    try {
        await orderModel.findOneAndDelete({ _id })

        res.json({ message: "deleted successfully" })

    } catch (error) {
        console.log("error in order", error)
    }

}

// POST || ADD-ORDER
const OderDetail = async (req, res, next) => {
    const { fname, lname, address, email, zip, city } = req.body;  
    const userId = req.user._id;

    const userCart = await Cart.findOne({ userId });

    if (!userCart) {
        return res.json([]);
    }

    const productIdsWithQuantities = userCart.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity
    }));


    const productId = productIdsWithQuantities.map(item => item.productId);
    console.log(productId[0])
    const Product = await productModel.findById(productId)
    const pname = Product.title;
    const price = Product.price

    const qtys = productIdsWithQuantities.map(item=> item.quantity)
    const qty = qtys[0]

    if (fname && lname && address && email && zip && city) {

        const user = await orderModel.findOne({ email })

        if (user) {
            res.json({ status: "failed", message: "Email already Exist !" })
        }
        else {
            const doc = await new orderModel({ userId, fname, lname, address, email, zip, city,pname,qty ,price})
            await doc.save()
            //  res.json({ status: "success", message: "Order created" });
            next()

        }

    }
    else {
        res.json({ status: "failed", message: "All Fields are required" })

    }
}


const report = (req, res) => {
    res.json({ status: "success", message: "Order created" });
}

module.exports = { getOrderDetail, OderDetail, report, DeleteOrder };