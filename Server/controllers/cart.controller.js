
// add to cart
import Product from "../models/product.model.js"
import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItem.model.js";

const addToCart = async (req, res) => {
    console.log("add to cart")
    const { productId, quantity } = req.body;
    // quantity = quantity || 1
    const userId = req.user._id
    console.log("userID", userId)
    try {

        if (userId && productId) {

            const cart = await Cart.findOne({ userId }).populate('items')
            const cartitem = await CartItem.findOne({ userId, productId })
            const product = await Product.findById(productId)

            if (!cartitem) {
                const newCartItem = new CartItem({ cart: cart._id, productId, quantity, price: product.price, userId, productName: product.title, imgUrl: product.imgUrl, carat: product.carat })
                await newCartItem.save()
                console.log("mycart", cart)
                cart.items.push(newCartItem)
            }
            else {

                cartitem.quantity += quantity
                await cartitem.save()
                await cart.save()
            }

            await cart.save()

            const newcartitem = await CartItem.findOne({ userId, productId })

            if (newcartitem.quantity == 0) {
                await CartItem.deleteOne({ _id: cartitem._id })

                let latestcart = await Cart.findOne({ userId }).populate('items')
                latestcart.totalItem = latestcart.totalItem - 1
                let totalPrice = 0
                // latestcart.totalPrice = 
                for (let cartitems of latestcart.items) {
                    totalPrice += cartitems.price * cartitems.quantity
                }
                latestcart.totalPrice = totalPrice

                await latestcart.save()

                return res.status(200).json({ success: true, message: "product added to cart succesfully", cart: latestcart })

            }
            else {
                const newcart = await Cart.findOne({ userId }).populate('items')

                let totalPrice = 0
                let totalItem = 0

                for (let cartitems of newcart.items) {
                    totalPrice += cartitems.price * cartitems.quantity
                    totalItem += cartitems.quantity
                }

                newcart.totalItem = totalItem
                newcart.totalPrice = totalPrice

                await newcart.save()



                return res.status(200).json({ success: true, message: "product added to cart succesfully", cart: newcart })
            }

        }

        else {

            return res.status(400).json({ error: "all fields are required" })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
}
// get cart by userId

const findUserCart = async (req, res) => {

    try {
        const cart = await Cart.findOne({ userId: req.user._id }).populate('items')

        if (!cart) {
            return res.status(400).json({ error: "Cart not found" })
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
        return res.status(500).send(error.message)
    }

}

const deleteCartItem = async (req, res) => {
    const { id } = req.params
    const uid = req.user._id

    try {

        await CartItem.findByIdAndDelete(id)

        const cart = await Cart.findOne({ userId: req.user._id }).populate('items')

        let totalPrice = 0
        let totalItem = 0

        for (let cartitems of cart.items) {
            totalPrice += cartitems.price * cartitems.quantity
            totalItem += cartitems.quantity
        }

        cart.totalItem = totalItem
        cart.totalPrice = totalPrice

        await cart.save()



        return res.status(200).json({ success: true, message: "Deleted succesfully !", cart })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
}

// update cart by userid and productid
// remove cartitem from cart
// clear cart
// get cart total
// 
export { addToCart, findUserCart, deleteCartItem }