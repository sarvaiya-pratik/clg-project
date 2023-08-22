const UserModel = require("../models/Users")
const { hashPassword, comparePassword } = require("../hepler/authHepler")
const jwt = require('jsonwebtoken')
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
                await doc.save();
                const user = await UserModel.findOne({ email })
                let token = jwt.sign({ UserId: user._id }, process.env.JWT_SECRET, { expiresIn: '5d' });
                res.send({ status: "success", message: "Register sucessfully", uname: user.name, token: token,userId:user._id })
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
                let token = jwt.sign({ UserId: user._id }, process.env.JWT_SECRET, { expiresIn: '5d' });

                res.send({ status: "success", message: "Login succesfully", uname: user.name, token: token,userId:user._id})
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

const GetUserData = async (req, res) => {

    const doc = await UserModel.find();
    console.log("get user run")
    res.json(doc);
}

const deleteUser = async (req, res) => {
    const id = req.params['id']
    try {
        await UserModel.findOneAndDelete({ "_id": id })
            .then(() => console.log("delete success"))
            .catch((e) => {
                console.log(e)
            })
        console.log("delete")

        res.json({ message: "deleted successfully" })

    } catch (error) {
        return error
    }
}

module.exports = { RegisterControl, LoginCotrol, GetUserData, deleteUser }