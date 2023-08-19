const AdminModel = require('../models/Admin')

const AdminControl = async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        const admin = await AdminModel.findOne({ email });
        
        if (admin) {
            if (password === admin.password) {
                res.status(201).json({ message: "Login Successfully" })
            }
            else {
                return res.json({ message: "Invalid Password" })
            }
        }
        else {
            return res.json({ message: "Invalid Admin Email" })
        }
    }
    else {
        return res.json({ message: "All fields are required" })
    }
}

module.exports = AdminControl;