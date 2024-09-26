import express from 'express'
import { addProduct, deleteProduct, getAllProduct, getProductById, updateProductById, exportData, getCategory, createCategory, updateCategory, deleteCategory } from '../controllers/product.controller.js'

import { upload } from '../middleware/multer.middleware.js'

const router = express.Router()
router.get('/', getAllProduct)
router.get('/:productId', getProductById)
router.post('/add', upload.single('imguri'), addProduct)
router.put('/:productId', updateProductById)
router.delete('/:productId', deleteProduct)
router.post('/export', exportData)

router.get('/category/all', getCategory)
router.post('/category', createCategory)
router.put('/category/:categoryId', updateCategory)
router.delete('/category/:categoryId', deleteCategory)

export default router