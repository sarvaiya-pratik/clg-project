import React, { useState } from 'react'
import "./address.css"
import { CiDeliveryTruck } from "react-icons/ci"
import Header from "../../../common/Header/Header"
import Footer from "../../../common/Footer/Footer"
import axios from 'axios'
import { toast } from 'react-hot-toast'
const Order = () => {

    const [orderData, setOrderData] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderData((pre) => {
            return { ...pre, [name]: value }
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token")
        axios.post("http://localhost:4001/order", orderData, { headers: { "Authorization": `Bearer ${token}` } })
            .then((r) => {
                if (r.data.status === "success") {
                    toast.success(r.data.message)
                }
                else if (r.data.status === "failed") {
                    toast.error(r.data.message)
                }
                else {
                    toast.error(r.data.message)
                }
            })
    }
    return (
        <>
            <Header />
            <div id="address">
                <div className="main-con">
                    <div className="left-con">
                        <CiDeliveryTruck style={{ color: 'goldenrod' }} size={"10rem"} />
                        <h2>WELCOME !</h2>
                        <p>You are 30 seconds away from compleating your order!</p>
                    </div>
                    <div className="right-con">
                        <div className="myheading">

                            <h2>Delivery Details</h2>
                            <div className="under"></div>
                        </div>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="input-container">
                                <input type="text" id="inputField" placeholder="" name='fname' onChange={handleChange} />
                                <label htmlFor="inputField">First Name</label>
                            </div>
                            <div className="input-container">
                                <input type="text" id="inputField" placeholder="" name='lname' onChange={handleChange} />
                                <label htmlFor="inputField">Last Name</label>
                            </div>
                            <div className="input-container">
                                <input type="text" id="inputField" placeholder="" name='city' onChange={handleChange} />
                                <label htmlFor="inputField">City</label>
                            </div>
                            <div className="input-container">
                                <input type="text" id="inputField" placeholder="" name='zip' onChange={handleChange} />
                                <label htmlFor="inputField">Zip</label>
                            </div>
                            <div className="input-container">
                                <input type="text" id="inputField" placeholder="" name='address' onChange={handleChange} />
                                <label htmlFor="inputField">Address</label>
                            </div>
                            <div className="input-container">
                                <input type="text" id="inputField" placeholder="" name='email' onChange={handleChange} />
                                <label htmlFor="inputField">Email</label>
                            </div>
                            <div className="button-con">

                                <button type='submit' className="pbtn">
                                    Place order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Order;
