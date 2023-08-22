import React, { useEffect, useState } from 'react'
import "./style.css"
import { AiFillDelete, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import Spinner from '../login/Spinner'
import Header from "../../common/Header/Header"
import Footer from "../../common/Footer/Footer"
import axios from 'axios'
import Loader from '../../common/Loader/Loader'

const Cart = () => {
    const [cart, setCart] = useState()
    const [load, setLoad] = useState(true)
    useEffect(() => {
    
        axios.get("/cart", { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } })
            .then((r) => {
                setCart(r.data)
                setLoad(false)
            })

    }, [cart])

    const handleDetele = (productId) => {
        axios.delete(`/cart/delete/${productId}`, { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } })

            .then((r) => {
                console.log("inc", r.data)
            })

        window.location.reload()
    }
    const handleInc = (productId) => {

        axios.put(`/cart/inc`, { productId }, { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } })

            .then((r) => {
                console.log("inc", r.data)
            })

    }
    const handleDec = (productId) => {
        axios.put(`/cart/dec`, { productId }, { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } })

            .then((r) => {
                console.log("inc", r.data)
            })

    }


    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <>
            <Header />
            {load ? <Spinner/> :
                <div id="cart">
                    <main>

                        <div className="product-list">
                            <h2>List of Product</h2>
                            <ul className="responsive-table">
                                <li className="table-header">
                                    <div className="col col-1">Item</div>
                                    <div className="col col-2">Price</div>
                                    <div className="col col-3">Quantity</div>
                                    <div className="col col-4">SubTotal</div>
                                    <div className="col col-5">Remove</div>
                                </li>

                                {
                                    cart ?
                                        cart.map((item, index) => {
                                            return (
                                                <li className="table-row" key={index}>

                                                    <div className="col col-1" ><iframe src={item.threesixty} width="50px" height="50px" style={{ alignSelf: 'flex-start'}} /><p>{item.name}</p></div>
                                                    <div className="col col-2" >{item.price}</div>
                                                    <div className="col col-3" ><AiFillPlusCircle onClick={() => handleInc(item.productId)} style={{cursor:'pointer'}}/>{item.quantity}<AiFillMinusCircle style={{cursor:'pointer'}} onClick={() => handleDec(item.productId)} /></div>
                                                    <div className="col col-4" >{item.quantity * item.price}</div>
                                                    <div className="col col-5 deletecustomer" onClick={() => handleDetele(item.productId)}  ><AiFillDelete /></div>
                                                </li>
                                            )
                                        }) : <h2 style={{ textAlign: 'center', margin: '8rem 0' }}>List is Empty</h2>
                                }
                                {
                                    cart ? <li className='table-header'>
                                        <div className="col" style={{ textAlign: 'center' }}>Total</div>
                                        <div className="col">₹ {calculateTotalAmount()}</div>
                                        <div className="col-1"><button className='orderBtn'>Order Now</button></div>
                                    </li> : ""
                                }

                            </ul>
                        </div>


                    </main>

                </div>
            }
            <Footer />
        </>
    )
}

export default Cart
