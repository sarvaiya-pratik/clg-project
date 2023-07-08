const express = require("express");
const { LoginCotrol,SignUpControl } = require("../Controls/User");
const Router = express.Router();

// CURD create-post update-put read-get detele-delete
Router.route("/signup").post(SignUpControl)
Router.route("/login").post(LoginCotrol)

module.exports = Router;
