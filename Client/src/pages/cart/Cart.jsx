
import "./style.css"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";
import Loader from "../../common/Loader/Loader";
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
import { UseRefresher } from "../../context/RefreshContextProvider";
const Cart = () => {
    const [cart, setCart] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    // const [refresh,setRefresh] = useState(true)
    const navigate = useNavigate()
    const [refresh,setRefresh] = UseRefresher()
    const handleDetele = (productId) => {
        if (window.confirm("Are Sure delete this ?")) {
            setLoading(true)
            axios.delete(`/cart/delete/${productId}`, { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } })
            .then((r) => {
                
                setRefresh(!refresh)
                    setLoading(false)
                    toast.error("Deleted")
                })
                
        }
    }
    const handleInc = (productId) => {
        setLoading(true)
        axios.put(`/cart/inc`, { productId }, { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } })
            .then((r) => {
                setRefresh(!refresh)
                setLoading(false)
                console.log("inc", r.data)
            })
           
    }
    const handleDec = (productId) => {
        setLoading(false)
        axios.put(`/cart/dec`, { productId }, { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } })

            .then((r) => {
                console.log("inc", r.data)
                setRefresh(!refresh)
                setLoading(false)
            })
            



    }

    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }
    useEffect(() => {
        const fetchData = async () => {

            try {
                let token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:4001/cart", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                setCart(response.data)
                setLoading(false)
            } catch (err) {
                setError(true)
                setLoading(false)
            }
        };

        fetchData();
    }, [refresh]);
    return (
        <>
            <Header />
            {
                loading ? <Loader /> :

                    <>

                        <div id="cart">
                            <main>

                                <div className="product-list">
                                    <h2>List of Product</h2>
                                    <ul className="responsive-table">
                                        <li className="table-header">

                                            <div className="col col-1">No</div>
                                            <div className="col col-2">Item</div>
                                            <div className="col col-3">Price</div>
                                            <div className="col col-4">Quantity</div>
                                            <div className="col col-5">SubTotal</div>
                                            <div className="col col-6">Remove</div>
                                        </li>

                                        {
                                           cart ? cart.length > 0 ?

                                                cart.map((item, index) => {
                                                    return (
                                                        <li className="table-row" key={index}>

                                                            <div className="col col-1" >{index + 1}</div>
                                                            <div className="col col-2" ><iframe src={item.threesixty} width="50px" height="50px" style={{ alignSelf: 'flex-start' }} /><p>{item.name}</p></div>
                                                            <div className="col col-3" >{item.price}</div>
                                                            <div className="col col-4" ><AiFillPlusCircle onClick={() => handleInc(item.productId)} style={{ cursor: 'pointer' }} />{item.quantity}<AiFillMinusCircle style={{ cursor: 'pointer' }} onClick={() => handleDec(item.productId)} /></div>
                                                            <div className="col col-5" >{item.quantity * item.price}</div>
                                                            <div className="col col-6 deletecustomer" onClick={() => handleDetele(item.productId)}  ><AiFillDelete /></div>
                                                        </li>
                                                    )
                                                })
                                                : <>
                                                    <div className="empty-cart">
                                                        <h2 >List is Empty</h2>
                                                        <button className='go-to-buy' onClick={() => navigate("/stones")}>Go to Buy</button>
                                                    </div>

                                                </>
                                                : ""
                                        }
                                        {
                                            cart ? <li className='table-header' style={{ display: 'flex', width: "100%", flexWrap: 'wrap' }}>
                                                <div className="col" style={{ textAlign: 'center' }}>Total</div>
                                                <div className="col">₹ {calculateTotalAmount()}</div>
                                                <div className="col">

                                                    <button className='orderBtn' onClick={() => cart.length > 0 ? navigate("/order") : navigate("/stones")}>Order Now</button>

                                                </div>
                                            </li> : ""
                                        }

                                    </ul>
                                </div>


                            </main>

                        </div> </>
            }
            <Footer />
        </>


    )
}

export default Cart

