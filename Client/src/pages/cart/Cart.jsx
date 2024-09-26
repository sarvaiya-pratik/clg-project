
import "./style.css"
import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { addCartToUser, deleteCartItem, getUserCart } from "../../redux/cart/cartApi";
import { getCurrentUserHook, getUserCartHook } from "../../CustomeHook/Custom";
import Loader from "../../common/Loader/Loader";
import { Breadcrumbs, Button, Typography } from '@mui/material'
import { BiAccessibility, BiCart, BiHome } from "react-icons/bi";
import Link from "@mui/material/Link";
const Cart = () => {

    const navigate = useNavigate()
    const [refresh, setRefres] = useState(false)
    const cart = getUserCartHook()

    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }
    const loading = useSelector((state) => state.cart.loading)

    const handleInc = (productId) => {
        dispatch(addCartToUser({ productId, quantity: 1 }))
        //    window.location.reload()
    }
    const handleDec = (productId) => {
        dispatch(addCartToUser({ productId, quantity: -1 }))
    }

    const dispatch = useDispatch()
    const user = getCurrentUserHook()

    useEffect(() => {
        dispatch(getUserCart())
    }, [refresh])

    const handleDetele = (id) => {

        dispatch(deleteCartItem(id))
        // window.location.reload()
    }
    return (
        <>


            {
                loading ? <Loader /> :
                    <>


                        <div id="cart">
                            <div role="presentation"  >
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link
                                        onClick={() => navigate("/")}
                                        underline="hover"
                                        sx={{ display: 'flex', alignItems: 'center' }}
                                        color="inherit"
                                        href="/"

                                    >
                                        <BiHome sx={{ mr: 0.5 }} fontSize="inherit" />
                                        Home
                                    </Link>

                                    <Typography
                                        sx={{ display: 'flex', alignItems: 'center' }}
                                        color="text.primary"
                                    >
                                        <BiCart sx={{ mr: 0.5 }} fontSize="inherit" />
                                        Cart
                                    </Typography>
                                </Breadcrumbs>
                            </div>
                            <main>

                                <div className="product-list">
                                    <h2>List of Product</h2>
                                    <ul className="responsive-table">
                                        <li className="table-header">

                                            <div className="col col-1">No</div>
                                            <div className="col col-2">Item</div>
                                            <div className="col col-3">Price</div>
                                            <div className="col col-4">Quantity</div>
                                            <div className="col col-5">Total</div>
                                            <div className="col col-6">Remove</div>
                                        </li>

                                        {
                                            cart?.items?.length > 0 ?
                                                cart.items.map((item, index) => {
                                                    return (
                                                        <li className="table-row" key={index}>

                                                            <div className="col col-1" >{index + 1}</div>
                                                            <div className="col col-2" >
                                                                {
                                                                    item.imgUrl.startsWith('http://res.cloudinary.com') ?
                                                                        <img src={item.imgUrl} width="50px" height="50px"  ></img> :
                                                                        <iframe src={item.imgUrl} width="50px" height="50px"></iframe>
                                                                }
                                                                <p>{item.productName}</p></div>
                                                            <div className="col col-3" >{item.price}</div>
                                                            <div className="col col-4" ><AiFillMinusCircle style={{ cursor: 'pointer' }} onClick={() => handleDec(item.productId)} />{item.quantity}<AiFillPlusCircle onClick={() => handleInc(item.productId)} style={{ cursor: 'pointer' }} /></div>
                                                            <div className="col col-5" >{item.quantity * item.price}</div>
                                                            <div className="col col-6 deletecustomer" onClick={() => handleDetele(item._id)}  ><AiFillDelete /></div>
                                                        </li>
                                                    )
                                                })
                                                : <>
                                                    <div className="empty-cart">
                                                        <h2 >List is Empty</h2>
                                                        <Button color="primary" variant="contained" onClick={() => navigate("/stones")}>Go to Buy</Button>
                                                    </div>

                                                </>

                                        }
                                        {
                                            cart ? <li className='table-header' style={{ display: 'flex', width: "100%", flexWrap: 'wrap' }}>
                                                <div className="col" style={{ display:'flex',justifyContent:'space-around' }}>Subtotal
                                                    <span> ₹ {cart.totalPrice}</span>
                                                </div>
                                                {/* <div className="col"></div> */}
                                                <div className="col" style={{display:'flex',justifyContent:'center'}}>

                                                    <Button color="inherit" variant="outlined" className='orderBtn' sx={{ mr: 2 }} onClick={() => navigate("/stones")}>Buy more</Button>
                                                    <Button color="inherit" style={{ color: 'black' }} variant="contained" className='orderBtn' onClick={() => cart?.items?.length > 0 ? navigate("/order/checkout") : navigate("/stones")}>Check Out</Button>

                                                </div>
                                            </li> : ""
                                        }

                                    </ul>
                                </div>


                            </main>

                        </div>
                    </>

            }
        </>


    )
}

export default Cart

