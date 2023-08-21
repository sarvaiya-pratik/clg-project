// routes/cart.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
// const productdata = require("../models/productdata")
router.get("/add-to-cart", (req, res) => {
    res.send("Hii runn bro")
})
router.post('/add-to-cart', async (req, res) => {

  
    console.log("req"+req.body)

    res.send("good")

    // try {
    //     // const { userId, productId, quantity } = req.body;
    //     const { userId, product } = req.body;

    //     // Check if the user's cart exists, if not, create one
    //     let cart = await Cart.findOne({ userId });

    //     if (!cart) {
    //         cart = new Cart({ userId, products: [] });
    //         console.log("cart cerated")
    //     }

    //     // Check if the product already exists in the cart
    //     const existingProductIndex = cart.products.findIndex(
    //         (product) => product.productId.toString() === productId.toString()
    //     );
    //     console.log("index" + existingProductIndex)
    //     if (existingProductIndex !== -1) {
    //         // If the product exists, update the quantity
    //         cart.products[existingProductIndex].quantity += quantity;
    //         console.log("qty inc")
    //     } else {
    //         // If the product doesn't exist, add it to the cart
    //         cart.products.push({ productId, quantity });
    //         console.log("data added")
    //     }

    //     await cart.save();
    //     res.status(200).json({ message: 'Product added to cart successfully' });
    // } catch (error) {
    //     res.status(500).json({ error: 'An error occurred' });
    // }
});

module.exports = router;
