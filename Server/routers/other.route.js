import express from 'express'
import { addClarity, addColor, addCut, addpolish, addsummetry, deleteClarity, deleteColor, deleteCut, deletepolish, deletesummetry, getClarity, getColor, getCut, getpolish, getsummetry, updateClarity, updateColor, updateCut, updatepolish, updatesummetry } from '../controllers/other.controller.js'


const router = express.Router()

router.get('/color', getColor)
router.post('/color', addColor)
router.put('/color/:color', updateColor)
router.delete('/color/:color', deleteColor)


router.get('/clarity', getClarity)
router.post('/clarity', addClarity)
router.put('/clarity/:clarity', updateClarity)
router.delete('/clarity/:clarity', deleteClarity)

router.get('/cut', getCut)
router.post('/cut', addCut)
router.put('/cut/:cut', updateCut)
router.delete('/cut/:cut', deleteCut)


router.get('/polish', getpolish)
router.post('/polish', addpolish)
router.put('/polish/:polish', updatepolish)
router.delete('/polish/:polish', deletepolish)


router.get('/summetry', getsummetry)
router.post('/summetry', addsummetry)
router.put('/summetry/:summetry', updatesummetry)
router.delete('/summetry/:summetry', deletesummetry)






export default router