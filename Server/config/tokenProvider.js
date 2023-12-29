import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '2d' })
    return token
}

const getUserByToken = async (token) => {

    try {
        const userId = jwt.verify(token, process.env.SECRET_KEY)

        return userId
    } catch (error) {
console.log(error.message)
    }

}

export { generateToken, getUserByToken }