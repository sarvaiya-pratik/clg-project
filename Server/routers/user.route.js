import express from 'express'
import { login, register } from '../controllers/auth.controller.js'
import { getAllUser, getCurrentUser, updateAdress, updateUser } from '../controllers/user.controller.js'
import passport from 'passport'
import { authUser } from '../middleware/authUser.js'
import User from '../models/user.model.js'
import { getUserByToken } from '../config/tokenProvider.js'
const router = express.Router()
console.log("user router")
router.post('/auth/signup', register)
router.post('/auth/signin', login)
router.put('/update/:uid', updateUser)
router.put('/update/address/:uid', updateAdress)
router.get('/currentuser',authUser,getCurrentUser)
router.get('/', getAllUser)
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));


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

            res.clearCookie('connect.sid');
            res.redirect('http://localhost:5173/')

        });
    })




})

export default router