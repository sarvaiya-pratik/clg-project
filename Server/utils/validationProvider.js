import bcrypt from 'bcrypt'

const validateEmail = (email) => {
    let emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== '' && email.match(emailFormat)) { return true; }
    return false;
}

const validatemobile = (phone) => {
    if (phone.toString().length == 10) {
        return true
    }
    return false
}

const generateHashPass = async (password) => {

    const hashPass = await bcrypt.hash(password, 10)
    return hashPass
}

const validateHashPass = async (password, hashPassword) => {
    console.log('hash',password,hashPassword)
    const pass = await bcrypt.compare(password, hashPassword)
    if (pass) {
        return true
    }
    return false
}
export { validateEmail, generateHashPass, validateHashPass, validatemobile }