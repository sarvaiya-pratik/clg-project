const express = require("express");
const Router = express.Router();
const { LoginCotrol, RegisterControl,GetUserData,deleteUser} = require("../Controls/User");
const AdminControl = require("../Controls/Admin")
const { AddProductData, GetProductData,deleteProduct } = require("../Controls/ProductData")
const {addFeedback,getFeedback} = require('../Controls/Feedback')

// USER
Router.route("/register").post(RegisterControl)
Router.route("/login").post(LoginCotrol)
Router.route("/v1/user").get(GetUserData)
Router.route("/v1/deleteuser").post(deleteUser)


// ADMIN  
Router.route("/adminlogin").post(AdminControl)

// PRODUCT DATA 
Router.route("/addproduct").post(AddProductData)
Router.route("/getproduct").get(GetProductData)
Router.route("/deleteproduct").post(deleteProduct)

// FEEDBACK 
Router.route("/feedback").post(addFeedback);
Router.route("/feedback").get(getFeedback);

module.exports = Router;
