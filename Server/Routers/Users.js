const express = require("express");
const { LoginCotrol,RegisterControl } = require("../Controls/User");
const Router = express.Router();

// CURD create-post update-put read-get detele-delete

Router.route("/register").post(RegisterControl)
Router.route("/login").post(LoginCotrol)

module.exports = Router;
