import express from 'express'
import { forgotPassword, login, register, resetPassword } from '../controllers/auth.controller.js'
import { deleteUser, getAllUser, getCurrentUser, getUserById, updateAdress, updateUser } from '../controllers/user.controller.js'
import passport from 'passport'
import { authUser } from '../middleware/authUser.js'

const router = express.Router()
router.post('/auth/signup', register)
router.post('/auth/signin', login)
router.put('/update/:uid', updateUser)
router.put('/update/address/:uid', updateAdress)
router.get('/currentuser', authUser, getCurrentUser)
router.get('/', getAllUser)
router.delete('/remove/:id', deleteUser)
router.get('/ID/:id', getUserById)

// FORGATE PASSWORD

router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
// router.post('/auth/verify', varifyOtp)
// router.post('/auth/reset', resetPassword)

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


router.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:5173/",
    failureRedirect: "http://localhost:5173/login"
}))

router.get('/login/success', async (req, res) => {
    if (req.user) {

        res.status(200).json({ message: "Login succes", user: req.user })
    }
    else {
        res.status(400).json({ error: "Unauthorize" })
    }
})

// logout  
router.get("/logout", (req, res, next) => {

    req.logout((err) => {
        if (err) {
            res.status(400).send(err)
        }
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).send('Internal Server Error');
            }

            res.clearCookie('connect.sid').clearCookie('token')
            res.redirect('http://localhost:5173/')

        });
    })
})

export default router