import express from 'express'
import { authUser } from '../middleware/AuthUser.js'
import { getFeedback, reviewProduct ,deleteFeedback} from '../controllers/feedback.controller.js'

const router = express.Router()

router.get('/', getFeedback)
router.delete('/:id', deleteFeedback)
router.post('/review/:pid', authUser, reviewProduct)

export default router