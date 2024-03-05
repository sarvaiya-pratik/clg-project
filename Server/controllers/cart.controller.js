
// add to cart
import Product from "../models/product.model.js"
import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItem.model.js";
import { ApiError } from "../utils/ApiError.js";
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    try {
        if (!(userId && productId)) {
            // throw new ApiError(400, "All fields are required");
            return res.status(400).json({success:false,message:"All fields are required"})
        }

        let cart = await Cart.findOne({ userId }).populate('items');
        let cartItem = await CartItem.findOne({ userId, productId });
        const product = await Product.findById(productId);

        if (!cartItem) {
            const newCartItem = new CartItem({
                cart: cart._id,
                productId,
                quantity,
                price: product.price,
                userId,
                productName: product.title,
                imgUrl: product.imgUrl,
                carat: product.carat
            });
            await newCartItem.save();
            cart.items.push(newCartItem);
        } else {
            cartItem.quantity += quantity;
            await cartItem.save();
        }

        await cart.save();

        cart = await Cart.findOne({ userId }).populate('items'); // Refresh cart

        const newCartItem = await CartItem.findOne({ userId, productId });

        if (newCartItem.quantity == 0) {
            await CartItem.deleteOne({ _id: newCartItem._id });

            // Remove the deleted cartItem from the cart
            cart.items = cart.items.filter(item => item._id.toString() !== newCartItem._id.toString());

            // Recalculate totals
            cart.totalItem = cart.items.length;
            let totalPrice = 0;
            for (let cartItem of cart.items) {
                totalPrice += cartItem.price * cartItem.quantity;
            }
            cart.totalPrice = totalPrice;
            await cart.save();

            return res.status(200).json({ success: true, message: "Product removed from cart successfully", cart });
        }

        // Update totals if necessary
        let totalPrice = 0;
        let totalItem = 0;
        for (let cartItem of cart.items) {
            totalPrice += cartItem.price * cartItem.quantity;
            totalItem += cartItem.quantity;
        }
        cart.totalItem = totalItem;
        cart.totalPrice = totalPrice;
        await cart.save();

        return res.status(200).json({ success: true, message: "Product added to cart successfully", cart });

    } catch (error) {
      
        res.status(500).json({ success: false, message: error.message })
    }
}


// get cart by userId


const findUserCart = async (req, res) => {

    try {
        const cart = await Cart.findOne({ userId: req.user._id }).populate('items')

        if (!cart) {
            return res.status(400).json({ success:false,message: "Cart not found" })
           
        }

        let totalPrice = 0
        let totalItem = 0

        for (let cartitems of cart.items) {
            totalPrice += cartitems.price * cartitems.quantity
            totalItem += cartitems.quantity
        }

        cart.totalItem = totalItem
        cart.totalPrice = totalPrice

        await cart.save()
        return res.status(200).json({ success: true, cart })

    } catch (error) {
      
        res.status(500).json({ success: false, message: error.message })
        
    }

}

const deleteCartItem = async (req, res) => {
    const { id } = req.params
    const uid = req.user._id

    try {
        const cart = await Cart.findOne({ userId: req.user._id }).populate('items')
        cart.items =  cart.items.filter((e)=>e._id.toString() !== id.toString())
        
        await CartItem.findByIdAndDelete(id)
        cart.items = cart.items.filter(item => item._id.toString() !== id);
        

        let totalPrice = 0
        let totalItem = 0


        for (let cartitems of cart.items) {
            totalPrice += cartitems.price * cartitems.quantity
            totalItem += cartitems.quantity
            console.log(cartitems._id.toString())
        }

        cart.totalItem = totalItem
        cart.totalPrice = totalPrice

        await cart.save()
        return res.status(200).json({ success: true, message: "Deleted succesfully !", cart })

    } catch (error) {
        console.log("ERROR", error.message)
        res.status(500).json({ success: false, message: error.message })
    }
}

// update cart by userid and productid
// remove cartitem from cart
// clear cart
// get cart total
// 
export { addToCart, findUserCart, deleteCartItem }