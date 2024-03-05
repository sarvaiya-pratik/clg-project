import mongoose from "mongoose"


const connectDb =  async(URL) => {
    try {
       await  mongoose.connect(URL)
            .then(() => {
                console.log("MongoDD Connected successfully ")
            })
    } catch (error) {
        console.log(error)
    }
}
export default connectDb