import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
    email: { type: String },
    password: { type: String }
},
    { timestamps: true })
const AdminModel = mongoose.model('admin', AdminSchema);

export default  AdminModel;