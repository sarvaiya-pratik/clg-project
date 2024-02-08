
import { getUserByToken } from "../config/tokenProvider.js"
import User from "../models/user.model.js"

export const authUser = async (req, res, next) => {
    try {
        
        const jwtCookie = req.cookies.token;
        const googlecookie = req.cookies['connect.sid'];
       
        if (!(googlecookie || jwtCookie)) {
            console.log("unAutorize")
            return res.status(401).json({ error: "Unauthorize" })
        }

        if (googlecookie) {
            
            if (req.user) {
                
                next()
            }
            else {
                return res.status(401).json({ error: "Unauthorize" })
            }
        }

        if (jwtCookie) {
            const _id = await getUserByToken(jwtCookie)
            const user = await User.findById(_id)

            if (user) {
                req.user = user
                next()
            }
            else {
                console.log("un")
                return res.status(401).json({ error: "Unauthorize" })
                
            }
        }
      
    } catch (error) {
        console.log(error)
        return res.status(401).send(error)
    }

}
