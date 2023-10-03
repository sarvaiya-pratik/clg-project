const UserModel = require("../models/Users")
const { hashPassword, comparePassword } = require("../hepler/authHepler")
const jwt = require('jsonwebtoken');

// POST || REGISTER
const RegisterControl = async (req, res) => {
    const { name, email, phone, password, cpassword } = req.body;
    if (email && name && phone && password && cpassword) {
        // email validate
        const emainRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm")
        isvalidEmail = emainRegex.test(email)
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
                    res.send({ status: "success", message: "Register sucessfully", uname: user.name, token: token, userId: user._id })
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
        isvalidEmail = emainRegex.test(email)
        if (isvalidEmail) {
            const user = await UserModel.findOne({ email })

            if (user) {
                // check password

                const ischeck = await comparePassword(password, user.password)
                if (ischeck) {
                    const checkActive = user.active
                    if (checkActive) {

                        let token = jwt.sign({ UserId: user._id }, process.env.JWT_SECRET, { expiresIn: '5d' });

                        res.send({ status: "success", message: "Login succesfully", uname: user.name, token: token, userId: user._id })
                    }
                    else {
                        res.send({ status: "Noactive", message: "You are Blocked by Admin" })
                    }
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
            res.send({ status: "failed", message: "Please Enter Current Pattern in Email !" })
        }
    }


    else {
        res.send({ status: "failed", message: "All field are require" })
    }
}

// GET || READ-USERS
const GetUserData = async (req, res) => {

    const doc = await UserModel.find();

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


        res.json({ message: "deleted successfully" })

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

module.exports = { RegisterControl, LoginCotrol, GetUserData, deleteUser, updateUserActive, updateUserInactive }