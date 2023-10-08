
import express from "express";
const Router = express.Router();
// USER
import  { LoginCotrol,forgatePassword,resentOtp,resetPassword,varifyOtp, RegisterControl, GetUserData, deleteUser,updateUserActive,updateUserInactive } from "../Controls/User.js"
// ADMIN

import AdminControl from "../Controls/Admin.js";
// PRODUCT
import { AddProductData, GetProductData, updateProductActive,updateProductInactive  } from "../Controls/ProductData.js"
// FEEDBACK
import { addFeedback, getFeedback, deleteFeedback } from "../Controls/Feedback.js"
// CART
import { getCart, incCart, decCart, delCart, addCart } from "../Controls/Cart.js"
// ORDER
import { OderDetail, report, getOrderDetail,updateOrderActive,updateOrderInactive} from "../Controls/Order.js"
// Middleware for Authentication
import { AuthUser } from "../middleware/AuthUser.js";


import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage })

// ----------------ROUTES-----------------

// USER
Router.route("/user/register").post(RegisterControl)
Router.route("/user/login").post(LoginCotrol)
Router.route("/user").get(GetUserData)
Router.route("/user/:id").delete(deleteUser)
Router.route("/user/active/:id").put(updateUserActive)
Router.route("/user/inactive/:id").put(updateUserInactive)
Router.route("/user/login/reset-password/getotp").post(forgatePassword)
Router.route("/user/login/reset-password/varifyotp").post(varifyOtp)
Router.route("/user/login/reset-password/reset").post(resetPassword)
Router.route("/user/login/reset-password/resent").get(resentOtp)



// ADMIN  
Router.route("/adminlogin").post(AdminControl)

// PRODUCT DATA 
Router.route("/product").post(upload.single('imguri'), AddProductData)
Router.route("/product").get(GetProductData)
Router.route("/product/active/:id").put(updateProductActive)
Router.route("/product/inactive/:id").put(updateProductInactive)
// Router.route("/product/:id").delete(deleteProduct)
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
Router.route("/order/active/:id").put(updateOrderActive)
Router.route("/order/inactive/:id").put(updateOrderInactive)
// Router.route("/order/:_id").delete(DeleteOrder)  

export default Router;    
