require("dotenv").config();
const jwt = require('jsonwebtoken');
const UserModel = require('../models/Users')
const AuthUser = async (req, res, next) => {
    console.log("auth run")
    let token
    const { authorization } = req.headers

   
   
        if (authorization && authorization.startsWith('Bearer')) {
            try {

                token = authorization.split(' ')[1]

                //  verify token
                const { UserId } = jwt.verify(token, process.env.JWT_SECRET)
                console.log("UserID :" + UserId)


                // get user from token 
                userdet = await UserModel.findOne({ _id: UserId }).select('-password')
                req.userdet = userdet;
                next()

            } catch (error) {
              console.log("UnAuthorization !")
             
            
            }
        }
        else {
            return res.status(401).send({ status: "failed", message: "Unauthorized" })
        
    }
    if (!token) {
        console.log(`No Token`)
    }
}

module.exports = AuthUser;