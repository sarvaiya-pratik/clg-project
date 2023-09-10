const express = require("express");
const Router = express.Router();
// USER
const { LoginCotrol, RegisterControl, GetUserData, deleteUser,updateUserActive,updateUserInactive } = require("../Controls/User");
// ADMIN
const AdminControl = require("../Controls/Admin")
// PRODUCT
const { AddProductData, GetProductData, deleteProduct } = require("../Controls/ProductData")
// FEEDBACK
const { addFeedback, getFeedback, deleteFeedback } = require('../Controls/Feedback')
// CART
const { getCart, incCart, decCart, delCart, addCart } = require("../Controls/Cart")
// ORDER
const { OderDetail, report, getOrderDetail, DeleteOrder } = require("../Controls/Order")
// Middleware for Authentication
const AuthUser = require("../middleware/AuthUser")

const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({ storage })





// ----------------ROUTES-----------------

// USER
Router.route("/register").post(RegisterControl)
Router.route("/login").post(LoginCotrol)
Router.route("/user").get(GetUserData)
Router.route("/user/:id").delete(deleteUser)
Router.route("/user/active/:id").put(updateUserActive)
Router.route("/user/inactive/:id").put(updateUserInactive)

// ADMIN  
Router.route("/adminlogin").post(AdminControl)

// PRODUCT DATA 
Router.route("/product").post(upload.single('imguri'), AddProductData)
Router.route("/product").get(GetProductData)
Router.route("/product/:id").delete(deleteProduct)
// Router.route("/v1/product").get(GetProductData)
// Router.route("/v1/product/:id").delete(deleteProduct)

// FEEDBACK 
Router.route("/feedback").post(addFeedback);
Router.route("/feedback").get(getFeedback);
Router.route("/feedback/:id").delete(deleteFeedback);


//CART
Router.route("/cart/add").post(AuthUser, addCart)
Router.route("/cart").get(AuthUser, getCart)
Router.route("/cart/inc").put(AuthUser, incCart)
Router.route("/cart/dec").put(AuthUser, decCart)
Router.route("/cart/delete/:id").delete(AuthUser, delCart)

// Order
Router.route("/order").post(AuthUser, OderDetail, report)
Router.route("/order").get(getOrderDetail)
Router.route("/order/:_id").delete(DeleteOrder)

module.exports = Router;    
