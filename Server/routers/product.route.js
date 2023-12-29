import express from 'express'
import { addProduct, deleteProduct, getAllProduct, getProductById, updateProductById } from '../controllers/product.controller.js'
import { authUser } from '../middleware/authUser.js'

const router = express.Router()
console.log("product route")
router.get('/', getAllProduct)
router.get('/:productId',getProductById)
router.post('/add',addProduct)
router.put('/:productId',updateProductById)
router.delete('/:productId',deleteProduct)

export default router