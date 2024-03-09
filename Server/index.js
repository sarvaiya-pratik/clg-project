import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import connectDb from './config/db.js'
import session from 'express-session'
import passport from 'passport'
import cookieParser from 'cookie-parser'
const app = express()
app.use(cookieParser())

import Razorpay from 'razorpay'

import userRouter from './routers/user.route.js'
import productRouter from './routers/product.route.js'
import cartRouter from "./routers/cart.route.js"
import orderRouter from "./routers/order.route.js"
import FeedbackRouter from './routers/feedback.route.js'

app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
// app.use(cors({
//     origin: 'https://clg-project-3c5q.vercel.app',
//     credentials: true
// }))


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

app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)
app.use('/feedback', FeedbackRouter)

const runServer = async () => {
    try {
        await connectDb(process.env.MONGO_URL);
        app.listen(process.env.PORT, () => {
            console.log('Server is running on PORT', process.env.PORT);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);
    }
}

runServer()