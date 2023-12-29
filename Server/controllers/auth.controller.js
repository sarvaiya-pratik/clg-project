import { generateToken } from "../config/tokenProvider.js"
import Cart from "../models/cart.model.js"
import User from "../models/user.model.js"
import { generateHashPass, validateEmail, validateHashPass, validatemobile } from "../utils/validationProvider.js"

const register = async (req, res) => {
    const { name, email, password, phone } = req.body

    try {
        if (name && email && password && phone) {
            const isvalidEmail = validateEmail(email)
            if (isvalidEmail) {
                const isvalidPhone = validatemobile(phone)
                if (isvalidPhone) {
                    const isExistUser = await User.findOne({ email })
                    if (!isExistUser) {
                        const hashPass = await generateHashPass(password)
                        const user = new User({ name, email, password: hashPass, phone })
                        await user.save()

                        const jwt = generateToken(user._id)
                        const createCart = new Cart({ userId: user._id })
                        await createCart.save()
                        return res.cookie('jwt', jwt, {
                            maxAge: 3600000,
                            httpOnly: true,
                            sameSite: 'None',
                            secure: true,
                        })
                            .status(200).json({
                                success: true,
                                user: user,
                                message: "Register succesfully !"
                            })

                    }
                    else {
                        return res.status(203).json({ error: "Your email already register !" })

                    }

                }
                else {
                    return res.status(203).json({ error: "Mobile number must be 10 digits!" })

                }

            }
            else {
                return res.status(203).json({ error: "Invalid Patten of your email" })
            }
        }
        else {
            return res.status(203).json({ error: "All fields are required  !" })
        }

    } catch (error) {
        return res.status(500).send(error.message)
    }

}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        if (email && password) {
            const isvalidEmail = validateEmail(email)
            if (isvalidEmail) {
                const isExistUser = await User.findOne({ email })
                if (isExistUser) {
                    if (isExistUser.password) {
                        const isvalidPass = await validateHashPass(password, isExistUser.password)
                        if (isvalidPass) {
                            const jwt = generateToken(isExistUser._id)
                            return res.cookie('jwt', jwt ,{
                                maxAge: 3600000,
                                httpOnly: true,
                                sameSite: 'None',
                                secure: true,
                            })
                                .status(200).json({
                                    success: true,
                                    user: isExistUser,
                                    message: "Login succesfully !"
                                })

                        }
                        else {

                            return res.status(203).json({ error: "Enter valid password" })
                        }
                    }
                    else {
                        return res.status(203).json({ error: "Please Login with Google" })
                    }

                }
                else {

                    return res.status(203).json({ error: "Please register first" })
                }
            }
            else {
                return res.status(203).json({ error: "Invalid Patten of your email" })
            }
        }
        else {
            return res.status(203).json({ error: "All fiels are required" })
        }

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export { register, login }