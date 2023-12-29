import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import session from 'express-session'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import Razorpay from 'razorpay'

dotenv.config()
const app = express()

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.options('*', cors({ origin: 'http://localhost:5173' }))

app.use(express.json())

export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

// --------------------GOOGLE LOGIN WITH PASSPORT---------------------------

// setup session
app.use(session({
    secret: "sdsfdgfdg34vffv",
    resave: false,
    saveUninitialized: false
}))

// setup passport
app.use(passport.initialize())
app.use(passport.session())

import connectPassport from './utils/passport.js'
connectPassport()

// Set up routes

// ------------------ROUTERS-----------------

import userRouter from './routers/user.route.js'
import productRouter from './routers/product.route.js'
import cartRouter from "./routers/cart.route.js"
import orderRouter from "./routers/order.route.js"


app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)

app.listen(process.env.PORT, () => {
    console.log("Server run on PORT", process.env.PORT)
    connectDb(process.env.MONGO_URL)
})