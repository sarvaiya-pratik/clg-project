import { generateToken } from "../config/tokenProvider.js"
import Cart from "../models/cart.model.js"
import User from "../models/user.model.js"
import dotenv from 'dotenv'
dotenv.config()
import { generateHashPass, validateEmail, validateHashPass, validatemobile } from "../utils/validationProvider.js"
import nodemailer from "nodemailer"
import smtpTransport from "nodemailer-smtp-transport"
import generateOTP from "../utils/otpGenerate.js"
import { ApiError } from "../utils/ApiError.js"

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
            return res.status(400).json({ success: false, message: "Password and Conform Password not matched !" })
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

let MYOTP = 0
let flag = true
let otpemail = ""


const forgatePassword = async (req, res) => {
    try {
        const { email } = req.body
        console.log("email: " + email)
        otpemail = email
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "Enter valid Email" })

        }

        MYOTP = generateOTP(4)

        const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject: 'RESET PASSWORD !',
            html: `<h3>OTP is : ${MYOTP} </h3>`,
            text: "Plase Enter this otp and Reset your password ! Thank you from MRP diamonds.."
        };

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ success: false, message: "Error sending email" });
            } else {
                console.log('Email sent:', info.response);
                otpemail = email
                return res.status(200).json({ success: true, message: "OTP sent successfully" })
            }
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}
// RESENT OTP 
const resentOtp = async (req, res) => {
    console.log("resent")
    try {
        let email = otpemail;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "Error in Email" })
        }

        MYOTP = generateOTP(4)
        const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject: 'RESET PASSWORD (RESENT) !',
            html: `<h3>OTP is : ${MYOTP} </h3>`,
            text: "Plase Enter this otp and Reset your password ! Thank you from MRP diamonds.."
        };

        transport.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(400).json({ success: false, message: "Error in sending email" });
            }
            console.log('Email sent:', info.response);
            otpemail = email
            return res.status(200).json({ success: true, message: "OTP sent successfully" })
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const varifyOtp = async (req, res) => {
    try {
        const { digits } = req.body
        const otp = digits[0] + digits[1] + digits[2] + digits[3]
        console.log(otp, MYOTP)
        if (!otp) {
            return res.status(400).json({ success: false, message: "Please Enter OTP !" })
        }

        if (otp == MYOTP) {
            flag = true
            return res.status(200).json({ success: true, message: "Otp is Varify" })
        }
        return res.status(401).json({ success: false, message: "Wrong Otp" })


    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const resetPassword = async (req, res) => {
    const { password } = req.body
    console.log("pass", password)
    let email = otpemail
    if (!password) {
        res.status(400).json({ success: false, message: "Enter Password !" })
    }

    if (flag) {
        try {
            const hash = await generateHashPass(password)
            const doc = await User.findOneAndUpdate({ email }, { $set: { password: hash } })
            await doc.save()
            flag = false
            otpemail = ""
            const mailOptions = {
                from: process.env.ADMIN_EMAIL,
                to: email,
                subject: 'RESET PASSWORD !',
                html: `<h3>Reset Password Successfully </h3><br><p>Your Password is : <b> ${password}</b> Thank you from MRP diamonds..</p>`
            };

            transport.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    return res.status(400).json({ success: false, message: "Error in sending email" });
                } else {
                    console.log('Email sent:', info.response);
                    otpemail = email
                    return res.status(200).json({ success: true, message: "Password Reset succesfully !" })
                }
            })

            // res.json({ code: 200, message: "Password Reset succesfully !" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: error.message })
        }
    }

    else {
        return res.status(404).json({ success: false, messgae: "Unauthorization !" })
    }


}



export { register, login, forgatePassword, resentOtp, resetPassword, varifyOtp }