import { getUserByToken } from "../config/tokenProvider.js";
import User from "../models/user.model.js";


export const authAdmin = async (req, res, next) => {

    const admincookie = req.cookies.admintoken;
    console.log(admincookie)
    if (!admincookie) {
        return res.status(401).json({ error: "Unauthorize" })
    }

    const _id = await getUserByToken(admincookie)
    const user = await User.findById(_id)
    if (user.isAdmin) {
        return res.status(200).json({ sucess: true, data: user })
    }
    else {
        return res.status(401).json({ error: "Unauthorize" })
    }

}