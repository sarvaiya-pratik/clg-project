
import { getUserByToken } from "../config/tokenProvider.js"
import User from "../models/user.model.js"


export const authUser = async (req, res, next) => {
    console.log("runn midddleware")
    try {
        const jwtCookie = req.cookies.jwt;
        console.log("your cookie : ", jwtCookie)
        const googlecookie = req.cookies['connect.sid'];
        // console.log("google cookie:",googlecookie)

        if (googlecookie || jwtCookie) {
            if (googlecookie) {
               if(req.user){
                next()
               }
            }

            if (jwtCookie) {
                const userId = await getUserByToken(jwtCookie)
                const user = await User.findById(userId.userId)
                if (user) {
                    req.user = user
                    
                    next()
                }
                else {
                    console.log("You are unAuth")
                    return res.status(401).json({ error: "Unauthorize" })
                }
            }

        }
        else {
            console.log("unAutorize")
            return res.status(401).json({ error: "Unauthorize" })
        }

    } catch (error) {
        console.log("Error in catch bro")
        console.log(error)
        return res.status(401).send(error)
    }

}