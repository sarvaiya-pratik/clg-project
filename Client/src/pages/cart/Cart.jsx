import React, { useEffect, useState } from 'react'
import "./style.css"
import { AiFillDelete, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { useCart } from "react-use-cart"
import Header from "../../common/Header/Header"
import Footer from "../../common/Footer/Footer"
const Cart = () => {

    const { isEmpty,
        emptyCart,
        items,
        cartTotal,
        removeItem,
        updateItemQuantity, } = useCart()



    const handleDetele = (item) => {
        removeItem(item.id)
    }
    const handleInc = (item) => {
        updateItemQuantity(item.id, item.quantity + 1)
    }
    const handleDec = (item) => {
        updateItemQuantity(item.id, item.quantity - 1)
    }


  


    return (
        <>
            <Header />

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
                                items.length !==0 ?
                                    items.map((item, index) => {
                                        return (
                                            <li className="table-row" key={index}>

                                                <div className="col col-1" ><iframe src={item.threesixty} width="50px" height="50px" style={{ alignSelf: 'flex-start' }} /><p>{item.title}</p></div>
                                                <div className="col col-2" >{item.price}</div>
                                                <div className="col col-3" ><AiFillPlusCircle onClick={() => handleInc(item)} />{item.quantity}<AiFillMinusCircle onClick={() => handleDec(item)} /></div>
                                                <div className="col col-4" >{item.price * item.quantity}</div>
                                                <div className="col col-5 deletecustomer" onClick={() => handleDetele(item)}  ><AiFillDelete /></div>
                                            </li>
                                        )
                                    }) : <h2 style={{textAlign:'center',margin:'8rem 0'}}>List is Empty</h2>
                            }
                            {
                                items ? <li className='table-header'>
                                    <div className="col" style={{textAlign:'center'}}>Total</div>
                                    <div className="col">₹ {cartTotal}</div>
                                    <div className="col-1"><button className='orderBtn'>Order Now</button></div>
                                </li> : ""
                            }

                        </ul>
                    </div>


                </main>

            </div>

            <Footer />
        </>
    )
}

export default Cart
