import jwt from 'jsonwebtoken'


const generateToken = (userId) => {
    const token = jwt.sign({ _id: userId }, process.env.SECRET_KEY, { expiresIn: '2d' })
    return token
}

const getUserByToken = async (token) => {

    try {
        
        return jwt.verify(token, process.env.SECRET_KEY)

    } catch (error) {
        console.log(error.message)
    }

}

export { generateToken, getUserByToken }