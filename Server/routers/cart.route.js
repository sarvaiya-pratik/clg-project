import express from "express"
import { addToCart, deleteCartItem, findUserCart } from "../controllers/cart.controller.js"
import { authUser } from "../middleware/authUser.js"

const router = express.Router()


router.post('/add',authUser, addToCart)
router.get('/currentcart', authUser, findUserCart)
router.delete('/delete/:id',authUser, deleteCartItem)

export default router