import { generateToken } from "../config/tokenProvider.js"
import jwt from "jsonwebtoken"
import Cart from "../models/cart.model.js"
import User from "../models/user.model.js"
import dotenv from 'dotenv'
dotenv.config()
import { generateHashPass, validateEmail, validateHashPass, validatemobile } from "../utils/validationProvider.js"
import nodemailer from "nodemailer"
import smtpTransport from "nodemailer-smtp-transport"
import randomString from 'randomstring'


const transport = nodemailer.createTransport(
    smtpTransport({
        service: 'Gmail',
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PASSWORD
        }
    })
)

const register = async (req, res) => {
    console.log("REG")
    try {
        const { name, email, password, phone, cpassword } = req.body

        if (!(name && email && phone && password && cpassword)) {

            return res.status(400).json({ success: false, message: "All fields are required  !" })


        }
        const isvalidEmail = validateEmail(email)

        if (!isvalidEmail) {
            return res.status(400).json({ success: false, message: "Invalid Patten of your email" })
            // throw new ApiError(400, "Invalid Patten of your email")
        }

        if (password !== cpassword) {
            return res.status(400).json({ success: false, message: "Password and Confirm Password not matched !" })
            // throw new ApiError(400, "Password and Conform Password not matched !")
        }

        const isvalidPhone = validatemobile(phone)
        if (!isvalidPhone) {
            return res.status(400).json({ success: false, message: "Mobile number must be 10 digits!" })
            // throw new ApiError(400, "Mobile number must be 10 digits!")
        }

        const isExistUser = await User.findOne({ email })

        if (isExistUser) {
            return res.status(409).json({ success: false, message: "Your email already register !" })
            // throw new ApiError(409, "Your email already register !")
        }

        const hashPass = await generateHashPass(password)
        const user = new User({ name, email, password: hashPass, phone })
        await user.save()
        const createCart = new Cart({ userId: user._id })
        await createCart.save()

        const accesToken = generateToken(user._id)

        const option = {
            httpOnly: true,
            secure: true
        }

        return res.cookie('token', accesToken, option)
            .status(200).json({
                success: true,
                user: user,
                message: "Register succesfully !"
            })

    } catch (error) {
        // if (error instanceof ApiError) {
        //     return res.status(error.statusCode).send(error.message);
        // } else {
        //     console.error(`Internal Server Error: ${error.message}`);
        //     return res.status(500).send('Internal Server Error');
        // }

        res.status(500).json({ success: false, message: error.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {

        if (!(email && password)) {
            // throw new ApiError(400, "All fiels are required")
            return res.status(400).json({ success: false, message: "All fields are reauired" })
        }

        const isvalidEmail = validateEmail(email)
        if (!isvalidEmail) {
            return res.status(400).json({ success: false, message: "Invalid Patten of your email" })
            // throw new ApiError(400, "Invalid Patten of your email")
        }

        const isExistUser = await User.findOne({ email })
        if (!isExistUser) {
            return res.status(409).json({ success: false, message: "Please register first" })
            // throw new ApiError(409, "Please register first")
        }

        if (!isExistUser.password) {
            return res.status(400).json({ success: false, message: "Please Login with Google" })
            // throw new ApiError(409, "Please Login with Google")
        }

        const isvalidPass = await validateHashPass(password, isExistUser.password)
        if (!isvalidPass) {
            return res.status(400).json({ success: false, message: "Enter valid password" })
            // throw new ApiError(409, "Enter valid password")

        }
        const option = {
            httpOnly: true,
            secure: true
        }

        const accesToken = generateToken(isExistUser._id)
        return res.cookie('token', accesToken, option)
            .status(200).json({
                success: true,
                user: isExistUser,
                message: "Login succesfully !"
            })
    } catch (error) {
        // if (error instanceof ApiError) {
        //     return res.status(error.statusCode).send(error.message);
        // } else {
        res.status(500).json({ success: false, message: error.message })
        // }
    }
}


// FORGATE PASSWORD
// const forgatePassword = async (req, res) => {
//     try {
//         const { email } = req.body
//         console.log("email: " + email)
//         otpemail = email
//         const user = await User.findOne({ email })
//         if (!user) {
//             return res.status(400).json({ success: false, message: "Enter valid Email" })
//         }

//         const isGoogleLogin = await User.find({$and:[{email},{googleId:{$exists:true}}]})
//         if(isGoogleLogin){
//             return res.status(400).json({success:false,message:"Please login with another method !"})
//         }

//         MYOTP = generateOTP(4)

//         const mailOptions = {
//             from: process.env.ADMIN_EMAIL,
//             to: email,
//             subject: 'RESET PASSWORD !',
//             html: `<h3>OTP is : ${MYOTP} </h3>`,
//             text: "Plase Enter this otp and Reset your password ! Thank you from MRP diamonds.."
//         };

//         transport.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending email:', error);
//                 return res.status(500).json({ success: false, message: "Error sending email" });
//             } else {
//                 console.log('Email sent:', info.response);
//                 otpemail = email
//                 return res.status(200).json({ success: true, message: "OTP sent successfully" })
//             }
//         })
//     } catch (error) {
//         return res.status(500).json({ success: false, message: error.message })
//     }

// }


const forgotPassword = async (req, res) => {
    const email = req.body.email
    console.log(email)
    try {
        const oldUser = await User.findOne({ email })

        if (!oldUser) {
            return res.status(404).json({ success: false, message: "User not found  !" })
        }

        const token = randomString.generate()

        oldUser.token = token
        oldUser.tokenExpires = Date.now() + 3600000;

        await oldUser.save()
        let link = `http://localhost:5173/reset-password/${token}`
        console.log(link)


        const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: email,
            html: `<h2>For reset password <a href=${link}> click here </a></h2>  <p> Plase reset your password using above link ! Thank you from Stein Gems.. </p>`,
            subject: 'RESET PASSWORD !',
        };

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ success: false, message: "Error sending email" });
            } else {
                console.log('Email sent:', info.response);
                return res.status(200).json({ success: true, message: "Email sent succesfully!" })
            }
        })





    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const resetPassword = async (req, res) => {
    console.log("RESET")
    const { token } = req.params;
    const { newPassword } = req.body;
    console.log("token", token)
    console.log("newPAss", req.body.newPassword)
    try {
        const user = await User.findOne({ token, tokenExpires: { $gt: Date.now() } })
        if (!user) {
            console.log("user not found")
            return res.status(404).json({ success: false, message: "User not found !" })
        }
        const hashPassword = await generateHashPass(newPassword)

        user.password = hashPassword
        user.token = undefined
        user.tokenExpires = undefined
        await user.save()
        return res.status(200).json({ success: true, message: "Password Reset succesfully !" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}



export { register, login, forgotPassword, resetPassword }