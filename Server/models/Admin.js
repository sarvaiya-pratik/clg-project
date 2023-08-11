const mongoose = require('mongoose')

const AdminSchema = mongoose.Schema({
    email: { type: String },
    password: { type: String }
},{ timestamps: true })

const AdminModel = mongoose.model('admin', AdminSchema);

module.exports = AdminModel;