import dotenv from "dotenv"
dotenv.config()
import jwt from "jsonwebtoken"
import UserModel from "../models/Users.js";
export const AuthUser = async (req, res, next) => {
    console.log("auth run")
    let token
    const { authorization } = req.headers

    if (authorization && authorization.startsWith('Bearer')) {
        // console.log(authorization)
        try {
            // console.log("middeleware run ")
            token = authorization.split(' ')[1]
            console.log("token",token)
            //  verify token
            const { UserId } = jwt.verify(token, process.env.JWT_SECRET)
          
            // get user from token 
            // userdet = await UserModel.findOne({ _id: UserId }).select('-password')
           let userdet = await UserModel.findOne({ _id: UserId}).select('-password')
           
            req.user = userdet;

            next()
        } catch (error) {
            console.log("UnAuthorization bro !")
        }
    }
    else {
        return res.status(401).send({ status: "failed", message: "Unauthorized" })

    }
    if (!token) {
        console.log(`No Token`)
    }
}

