// require("dotenv").config()
import dotenv from 'dotenv'
dotenv.config();
import  express  from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import bodyParser from 'body-parser'
const app = express()

// basic middelwares 
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.json())

//routes

import Router from './Routers/MyRoute.js';
app.use("/", Router)

// mongo connect
try {
    mongoose.connect(process.env.URLATLAS);
    console.log("Database connected successfully")
} catch (e) {
    console.log("error in Atalas Connection", e)
}

app.listen(process.env.PORT, () => {
    console.log("You are running on PORT", process.env.PORT)
})


