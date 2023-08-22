// routes/cart.js
const express = require('express');
const router = express.Router();
const AuthUser = require("../middleware/AuthUser")
const Cart = require('../models/Cart');
const productdata = require("../models/productdata")

// GET || READ
router.get("/", AuthUser, async (req, res) => {

    const userId = req.user._id;

    const userCart = await Cart.findOne({ userId });

    if (!userCart) {
        return res.json([]);
    }

    const productIdsWithQuantities = userCart.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity
    }));


    const productIds = productIdsWithQuantities.map(item => item.productId);

    const products = await productdata.find({ _id: { $in: productIds } });


    const productsWithQuantities = products.map(product => {
        const productInfo = productIdsWithQuantities.find(item => item.productId === product._id.toString());

        return {
            productId: product._id,
            name: product.title,
            price: product.price,
            threesixty: product.threesixty,
            quantity: productInfo.quantity
        };
    });

    res.json(productsWithQuantities)



})
// POST || ADD
router.post("/add", AuthUser, async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;

        let userCart = await Cart.findOne({ userId });
        // If the user doesn't have a cart, create one
        if (!userCart) {
            userCart = new Cart({ userId, items: [] });
        }
        // Check if the item already exists in the cart
        const existingCartItem = userCart.items.find(item => item.productId === productId)

        if (existingCartItem) {
            // If the item exists, update the quantity
            existingCartItem.quantity += quantity;
        } else {
            // If the item doesn't exist, add it to the cart
            userCart.items.push({ productId: productId, quantity: quantity });
        }

        // Save the updated cart
        await userCart.save();

        res.json({ message: 'Item added to cart' });

    } catch (err) {
        console.log("Error", err)
    }

})

// PUT || INCREMENT
router.put("/inc", AuthUser, async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.body

    console.log("pid", productId)
    const userCart = await Cart.findOne({ userId })

    if (!userCart) {
        res.status(404).json({ message: "Not found" })
    }
    else {
        let cartItem = userCart.items.find((e) => e.productId === productId)
        console.log(cartItem)
        cartItem.quantity += 1;
        await userCart.save();
        res.json({ coe: 200, message: "Quantity updated successfully" })

    }
})


// PUT || DECREMENT

router.put("/dec", AuthUser, async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.body

    console.log("pid", productId)
    const userCart = await Cart.findOne({ userId })

    if (!userCart) {
        res.status(404).json({ message: "Not found" })
    }
    else {

        let cartItem = userCart.items.find((e) => e.productId === productId)
        console.log(cartItem)
        cartItem ? cartItem.quantity -= 1 : ""
        await userCart.save();
        res.json({ coe: 200, message: "Quantity updated successfully" })

    }
})

// Delete
router.delete('/delete/:id', AuthUser, async (req, res) => {
    const userId = req.user._id;
    const productId = req.params["id"]

    console.log("pid", productId)
    let userCart = await Cart.findOne({ userId })

    if (!userCart) {
        res.status(404).json({ message: "Not found" })
    }
    else {
        await Cart.updateOne(
            { userId: userId },
            { $pull: { items: { productId: productId } } }
        );
        res.json({ coe: 200, message: "Deleted successfully" })
    }
})






module.exports = router;
