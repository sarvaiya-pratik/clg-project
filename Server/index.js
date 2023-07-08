require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const cookieParser = require("cookie-parser")

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
const Router = require("./Routers/Users")


// mongo connect
app.use("/",Router)

mongoose.connect(process.env.URLATLAS);

app.listen(process.env.PORT, () => {
    console.log("You are running on PORT", process.env.PORT)
})









