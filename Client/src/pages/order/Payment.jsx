import { Breadcrumbs, Chip, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Link } from '@mui/material'
import "./payment.css"
import { BiCart, BiHome, BiMoney } from 'react-icons/bi';
import Steps from "./Steps"
import { FaRegAddressCard } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { createOrder, paypayment } from '../../redux/order/orderApi';
const Payment = () => {

    const [method, setMethod] = useState("online")

    const user = useSelector((state) => state.user.users)
    const cart = useSelector((state) => state.cart.cart)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleChosePayment = (e) => {
        setMethod(e.target.value)
    }
    

    const handleCodCheckout = async (amount) => {

        const result = await dispatch(createOrder(amount))

        console.log("result", result.payload.redirectUrl)
        window.location.href = result.payload.redirectUrl

    }

    const handleCheckout = async (amount) => {
        dispatch(paypayment({ amount, user }))
    }
    return (
        <>

            <div id="payment">
                <div className="top">
                    <div role="presentation" style={{ marginLeft: '2rem', marginBottom: '2rem' }} >
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link
                                onClick={() => navigate("/")}
                                underline="hover"
                                sx={{ display: 'flex', alignItems: 'center' }}
                                color="inherit"

                                style={{ cursor: 'pointer' }}
                            >
                                <BiHome sx={{ mr: 0.5 }} fontSize="inherit" />
                                Home
                            </Link>
                            <Link
                                onClick={() => navigate("/cart")}
                                underline="hover"
                                sx={{ display: 'flex', alignItems: 'center' }}
                                color="inherit"
                                style={{ cursor: 'pointer' }}

                            >
                                <BiCart sx={{ mr: 1.4 }} fontSize="inherit" />
                                Cart
                            </Link>
                            <Link
                                onClick={() => navigate("/order/checkout")}
                                underline="hover"
                                sx={{ display: 'flex', alignItems: 'center' }}
                                color="inherit"
                                style={{ cursor: 'pointer' }}
                            >
                                <FaRegAddressCard sx={{ mr: 1.4 }} fontSize="inherit" />
                                Address
                            </Link>

                            <Typography
                                sx={{ display: 'flex', alignItems: 'center' }}
                                color="text.primary"
                            >
                                <BiMoney sx={{ mr: 0.5 }} fontSize="inherit" />
                                Payment
                            </Typography>
                        </Breadcrumbs>
                    </div>
                    <Steps mystep={2} />
                </div>

                <div className="bottom">


                    <div className="right">
                        <h2>Your List of Products</h2>
                        {
                            cart?.items.map((item) => {
                                return (
                                    <div className="product-container">
                                        <iframe src={item.imgUrl} frameborder="0"></iframe>
                                        <div className="inner-container">
                                            <h5 style={{ marginBottom: '1.3rem' }}>{item.productName}</h5>
                                            <p>carat :<span> {item.carat} </span> </p>
                                            <p>price : <span style={{ color: 'green' }}>₹ {item.price}</span> </p>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>

                    <div className="left">
                        <div className="chosemethod">
                            <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group">Select Payment Method</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={method}
                                    onChange={handleChosePayment}
                                >
                                    <FormControlLabel value="offline" control={<Radio />} label="Cash on Deleivery (COD)" />
                                    <FormControlLabel value="online" control={<Radio />} label="Online Payment" />
                                </RadioGroup>
                            </FormControl>
                        </div>


                        <div className="product-detail">
                            <Chip label="Price Details" color='primary' style={{ position: 'absolute', top: '-20px' }} />
                            <li>
                                <p>Price ({cart?.totalItem} items) </p>
                                <p>₹ {cart?.totalPrice}</p>
                            </li>
                            <li>
                                <p>Deliver charge</p>
                                <p style={{ color: 'green' }}>FREE</p>
                            </li>
                            <li>
                                <h5>Total Amount</h5>
                                <p> ₹ {cart?.totalPrice}</p>
                            </li>
                            {
                                method == "offline" ? <Button variant='contained' color='primary' style={{ marginTop: '1rem' }} onClick={() => handleCodCheckout(cart?.totalPrice)} >Order Now</Button>
                                    :
                                    <Button variant='contained' color='primary' style={{ marginTop: '1rem' }} onClick={() => handleCheckout(cart?.totalPrice)}>Payment</Button>
                            }
                        </div>
                    </div>


                </div>

                <div className="last-btn">
                    <Button variant='contained' onClick={() => navigate("/order/checkout")}>Back</Button>
                </div>
            </div>

        </>
    )
}

export default Payment