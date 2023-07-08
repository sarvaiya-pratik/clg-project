const UserModel = require("../models/Users")
const { hashPassword, comparePassword } = require("../hepler/authHepler")
const Jwt = require("jsonwebtoken")

// api SIGN UP || POST
// app.post("/signup",(req,res)=>{})
const SignUpControl = async (req, res) => {
    const { fname, lname, email, phone, password } = req.body;
    const data = await UserModel.findOne({ email:email });
    if (data) {
        res.status(201).send({ message: "Email alreay exist" })
    }
    else {
        const hPassword = await hashPassword(password)
        const user = await new UserModel({ fname, lname, email, phone, password: hPassword }).save()
        res.status(200).send({
            success: true,
            message: "User register succesful"
        })
    }
}

//api LOGIN || POST
const LoginCotrol = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email })
        // console.log(user)
        if (!user) {
            res.status(204).send({ success: false, message: "User Not found !" });
        }

        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(203).send({ success: false, message: "Invalid Password" })
        }
        else {
            //token 
            const token = Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: 78 })
           res.cookie("token", token, { httpOnly: true })
            .status(201).send({
                success: true,
                message: "login succesful",
                user,
                token,
            })
        }

    } catch (err) {
        console.log(err)
    }
}

module.exports = { SignUpControl, LoginCotrol }