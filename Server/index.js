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
import otherRouter from './routers/other.route.js'
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ['http://localhost:5173', 'https://clg-project-3c5q.vercel.app'];


app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }))
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

app.get('/', (req, res) => {
    res.send('Server is running!')
})
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)
app.use('/feedback', FeedbackRouter)
app.use('/other', otherRouter)
app.get('/admin/logout', (req, res) => {

    const option = {
        expires: new Date(0), // Set expiration date to a past date to immediately expire the cookie
        httpOnly: true,
        secure: true
    }
    res.clearCookie('admintoken', option)
    res.end()

})



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