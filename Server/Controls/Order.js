const orderModel = require("../models/Order")

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

    if (fname && lname && address && email && zip && city) {

        const user = await orderModel.findOne({ email })

        if (user) {
            res.json({ status: "failed", message: "Email already Exist !" })
        }
        else {
            const doc = await new orderModel({ userId, fname, lname, address, email, zip, city })
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