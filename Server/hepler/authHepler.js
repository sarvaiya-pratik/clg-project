import bcrypt from "bcrypt"

const hashPassword = async (password) => {
    try {
        const saltRound =await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltRound);
        return hashedPassword;

    } catch (error) {
        console.log("aa error hash ni se", error)
    }

}
   const comparePassword = async (password, hashPassword) => {
        return bcrypt.compare(password, hashPassword);
    }


 export{hashPassword,comparePassword}


