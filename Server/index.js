require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()

app.use(cors())
app.use(bodyParser.json())


// mongo connect
const StudModel = require("./models/Student")
mongoose.connect(process.env.URLATLAS);

// api  
app.post("/register", async (req, res) => {

    const { fname, lname, email, uname, password } = req.body;
    const data = await StudModel.findOne({ email: email });
    if (data) {
        res.send({ message: "Email alreay exist" })
    }
    else {
        await StudModel.create(req.body)
        res.send({ message: "User created" })
    }
})

app.post("/login", async (req, res) => {
    const { uname, password } = req.body;
    try {
        const data = await StudModel.findOne({ uname: uname })
        if (data) {
            if (password === data.password) {
                res.send({ message: "Login successful", user: data })
            }
            else {
                res.send({ message: "Password was incorrect!" })
            }
        }
        else {
            res.send({ message: "Please Register !" })
        }

    } catch (err) {
        console.log(err)
    }
})

app.listen(process.env.PORT, () => {
    console.log("You are running on PORT", process.env.PORT)
})

// await StudModel.create(req.body)
// .then(emp=>res.json(emp))
// .catch(err=>res.json(err))






