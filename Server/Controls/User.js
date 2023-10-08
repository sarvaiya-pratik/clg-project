import UserModel from "../models/Users.js";
import { hashPassword, comparePassword } from "../hepler/authHepler.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

import nodemailer from "nodemailer"
import smtpTransport from "nodemailer-smtp-transport"
const transport = nodemailer.createTransport(
    smtpTransport({
        service: 'Gmail',
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PASSWORD
        }
    })
)
// POST || REGISTER
const RegisterControl = async (req, res) => {
    const { name, email, phone, password, cpassword } = req.body;
    if (email && name && phone && password && cpassword) {
        // email validate
        const emainRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm")
        let isvalidEmail = emainRegex.test(email)
        if (isvalidEmail) {
            const user = await UserModel.findOne({ email })
            if (user) {
                res.send({ status: "failed", message: "Email already registered" })
            }
            else {
                //check password and cpassowrd are same or not
                if (password === cpassword) {
                    const hpass = await hashPassword(password)
                    const doc = await new UserModel({ "name": name, "email": email, "phone": phone, "password": hpass })
                    await doc.save();
                    const user = await UserModel.findOne({ email })
                    let token = jwt.sign({ UserId: user._id }, process.env.JWT_SECRET, { expiresIn: '5d' });

                    const mailOptions = {
                        from: process.env.ADMIN_EMAIL,
                        to: email,
                        subject: 'Registration Confirmation',
                        html: `<h3>Thank you for registering!<h3><br>UserID : <b>${user.email}</b> <br>Password : <b> ${password}<b><br> <p> Welcome to MRP Diamonds,${user.name}`,
                    };
                    transport.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.error('Error sending email:', error);
                            res.status(500).send('Error sending email');
                        } else {
                            console.log('Email sent:', info.response);
                            res.send({ status: "success", message: "Register sucessfully", uname: user.name, token: token, userId: user._id })
                        }
                    })
                }
                else {
                    res.send({ status: "failed", message: "Password not same !" })
                }
            }
        }
        else {
            res.send({ status: "failed", message: "Please Enter Current Pattern in Email !" })
        }
    }
    else {
        res.send({ status: "failed", message: "All fields are required" })
    }
}
// POST || LOGIN 
const LoginCotrol = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const emainRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm")
        let isvalidEmail = emainRegex.test(email)
        if (isvalidEmail) {
            const user = await UserModel.findOne({ email })

            if (user) {
                // check password

                const ischeck = await comparePassword(password, user.password)
                if (ischeck) {
                    const checkActive = user.active
                    if (checkActive) {

                        let token = jwt.sign({ UserId: user._id }, process.env.JWT_SECRET, { expiresIn: '5d' });
                        const mailOptions = {
                            from: process.env.ADMIN_EMAIL,
                            to: email,
                            subject: 'Login Confirmation',
                            text: 'You are Login successfully !',
                        };
                        transport.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.error('Error sending email:', error);
                              return  res.status(500).send('Error sending email');
                            } else {
                                console.log('Email sent:', info.response);
                                return res.send({ status: "success", message: "Login succesfully", uname: user.name, token: token, userId: user._id })

                            }
                        })
                    }
                    else {
                        return res.send({ status: "Noactive", message: "You are Blocked by Admin" })
                    }
                }
                else {
                    return res.send({ status: "failed", message: "Invalid Password!" })
                }
            }
            else {
                return res.send({ status: "failed", message: "Please Register First" })
            }
        }
        else {
            return res.send({ status: "failed", message: "Please Enter Current Pattern in Email !" })
        }
    }
    else {
        return res.send({ status: "failed", message: "All field are require" })
    }
}

// GET || READ-USERS
const GetUserData = async (req, res) => {

    const doc = await UserModel.find();

    return res.json(doc);
}

const deleteUser = async (req, res) => {
    const id = req.params['id']
    try {
        await UserModel.findOneAndDelete({ "_id": id })
            .then(() => console.log("delete success"))
            .catch((e) => {
                console.log(e)
            })


        return res.json({ message: "deleted successfully" })

    } catch (error) {
        return error
    }
}

// UPDATE || PUT  
const updateUserActive = async (req, res) => {
    console.log("update")
    const _id = req.params.id
    // const {active} = req.body
    // console.log("active",active)
    if (_id) {
        const doc = await UserModel.findByIdAndUpdate(_id, { active: false })
        doc.save();
        return res.json({ code: 200, message: "Update succesfully" })
    }

    else {
        return res.json({ code: 404, message: "Id must require" })
    }
}
const updateUserInactive = async (req, res) => {
    console.log("update")
    const _id = req.params.id
    if (_id) {
        const doc = await UserModel.findByIdAndUpdate(_id, { active: true })
        doc.save();
        return res.json({ code: 200, message: "Update succesfully" })
    }
    else {
        return res.json({ code: 404, message: "Id must require" })
    }
}
import generateOTP from "../hepler/otpGenerate.js"
let MYOTP = 0
let flag = true
let otpemail = ""
const forgatePassword = async (req, res) => {
    const { email } = req.body
    otpemail=email
    const user = await UserModel.findOne({ email })
    if (!user) {
        return res.json({ code: 404, message: "Enter valid Email" })
    }
    else {
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
                return res.status(500).send('Error sending email');
            } else {
                console.log('Email sent:', info.response);
                otpemail = email
                return res.json({ code: 200, message: "OTP sent successfully" })
            }
        })
    }
}
// RESENT OTP 
const resentOtp = async (req, res) => {
    let email = otpemail;
    const user = await UserModel.findOne({ email })
    if (!user) {
        return res.json({ code: 404, message: "Error in Email" })
    }
    else {

        MYOTP = generateOTP(4)
        const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject: 'RESET PASSWORD (RESENT) !',
            html: `<h3>OTP is : ${MYOTP} </h3>`,
            text: "Plase Enter this otp and Reset your password ! Thank you from MRP diamonds.."
        };
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).send('Error sending email');
            } else {
                console.log('Email sent:', info.response);
                otpemail = email
                return res.json({ code: 200, message: "OTP sent successfully" })

            }
        })

    }
}

const varifyOtp = async (req, res) => {
    const { digits } = req.body
    const otp = digits[0] + digits[1] + digits[2] + digits[3]
    console.log(otp, MYOTP)
    if (!otp) {
        return res.json({ code: 404, message: "Please Enter OTP !" })
    }
    else {
        if (otp == MYOTP) {
            flag = true
            return res.json({ code: 200, message: "Otp is Varify" })
        }
        else {
            return res.json({ code: 401, message: "Wrong Otp" })
        }
    }
}

const resetPassword = async (req, res) => {
    const { password } = req.body
    let email = otpemail
    if (!password) {
        res.json({ code: 401, message: "Enter Password !" })
    }
    else {
        if (flag) {
            try {
                const hash = await hashPassword(password)
                const doc = await UserModel.findOneAndUpdate({ email }, { password: hash })
                doc.save()
                flag = false
                otpemail = ""
                const mailOptions = {
                    from: process.env.ADMIN_EMAIL,
                    to: email,
                    subject: 'RESET PASSWORD !',
                    html: `<h3>Reset Password Successfully </h3><br><p>Your Password is : <b> ${password}</b> Thank you from MRP diamonds..</p>`
                };
                transport.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error sending email:', error);
                     return   res.status(500).send('Error sending email');
                    } else {
                        console.log('Email sent:', info.response);
                        otpemail = email
                        return res.json({ code: 200, message: "OTP sent successfullt" })

                    }
                })

                res.json({ code: 200, message: "Password Reset succesfully !" })
            } catch (error) {
                console.log(error)
            }
        }

        else {
            return res.json({ code: 404, messgae: "Unauthorization !" })
        }
    }

}


export { RegisterControl, LoginCotrol, GetUserData, deleteUser, resentOtp, updateUserActive, updateUserInactive, forgatePassword, varifyOtp, resetPassword }