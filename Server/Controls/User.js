const UserModel = require("../models/Users")
const { hashPassword, comparePassword } = require("../hepler/authHepler")
const Jwt = require("jsonwebtoken")

// api REGISTER || POST

const RegisterControl = async (req, res) => {
    const { name, email, phone, password, cpassword } = req.body;
    if (name && email && phone & password && cpassword) {
        const user = await UserModel.findOne({ email })
        if (user) {
            res.send({ status: "failed", message: "Email already registered" })
        }
        else {
            //check password and cpassowrd are same or not
            if (password === cpassword) {
                const hpass = await hashPassword(password)
                const doc = await new UserModel({ "name": name, "email": email, "phone": phone, "password": hpass })
                doc.save();
                res.send({ status: "success", message: "Register sucessfully" })
            }
            else {
                res.send({ status: "failed", message: "Password not same !" })
            }
        }
    }
    else {
        res.send({ status: "failed", message: "All fields are required" })
    }

}

//api LOGIN || POST
const LoginCotrol = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const user = await UserModel.findOne({ email })

        if (user) {
            // check password
            const ischeck = await comparePassword(password, user.password)
            if (ischeck) {
                res.send({ status: "success", message: "Login succesfully" })
            }
            else {
                res.send({ status: "failed", message: "Invalid Password!" })
            }
        }
        else {
            res.send({ status: "failed", message: "Please Register First" })
        }
    }
    else {
        res.send({ status: "failed", message: "All fields are Required" })
    }

}

module.exports = { RegisterControl, LoginCotrol }