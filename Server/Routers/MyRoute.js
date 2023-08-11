const express = require("express");
const Router = express.Router();
const { LoginCotrol, RegisterControl } = require("../Controls/User");
const AdminControl = require("../Controls/Admin")
const { AddProductData, GetProductData } = require("../Controls/ProductData")
const addFeedback = require('../Controls/Feedback')
// USER
Router.route("/register").post(RegisterControl)
Router.route("/login").post(LoginCotrol)

// ADMIN  
Router.route("/adminlogin").post(AdminControl)

// PRODUCT DATA 
Router.route("/addproduct").post(AddProductData)
Router.route("/getproduct").get(GetProductData)

// FEEDBACK 
Router.route("/addfeedback").post(addFeedback);

module.exports = Router;
