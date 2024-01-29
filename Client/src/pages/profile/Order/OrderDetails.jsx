import React, { useDeferredValue, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getOrderById } from '../../../redux/order/orderApi'
import OrderSteps from './OrderSteps'
import { Badge, Chip } from '@mui/material'
import { FaStar } from "react-icons/fa";

const OrderDetails = () => {
    const { id, oid } = useParams()

    useEffect(() => {
        dispatch(getOrderById(id))
    }, [])

    const dispatch = useDispatch()
    const order = useSelector((state) => state.order.order)
    const address = order?.shippingAddress
    const orderItems = order?.orderItems

    const getOrderDate = (originalDate) => {
        const dateObject = new Date(originalDate);
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }).format(dateObject);
        return formattedDate;
    }

    return (
        <>
            <div id="orderdetails">
                <OrderSteps mystep={order?.orderStatus == 'pending' && 2 || order?.orderStatus == 'shipped' && 3 || order?.orderStatus == 'delivered' && 5} />

                <div className="address-container">
                    {/* <h3>Delivery Address</h3> */}
                    <Chip label="Delivery Address" variant='filled' color='primary' style={{ position: 'absolute', left: '-25px', top: '15px', padding: '2px 10px', fontSize: '16px' }} />
                    <h6>{address?.fname + " " + address?.lname}</h6>
                    <p>{address?.streetAddress} - {address?.pincode}</p>
                    <h6>Phone Number</h6>
                    <p>{address?.phone || 9090909090}</p>
                </div>

                {
                    orderItems?.map((item) => {

                        return (
                            item._id == oid ?
                                <OrderBox
                                    orderNo={order?._id}
                                    productId={item.productId}
                                    imgUrl={item.imgUrl}
                                    pname={item.productName}
                                    qty={item.quantity}
                                    carat={item.carat}
                                    price={item.price}
                                    paymentMethod={order?.paymentMethod}
                                    orderDate={getOrderDate(order?.orderDate)}
                                    orderStatus={order?.orderStatus}
                                /> : "")
                    })
                }

            </div>
        </>
    )
}

export default OrderDetails

export const OrderBox = ({ imgUrl, pname, carat, qty, price, orderNo, paymentMethod, productId, orderDate, orderStatus }) => {
    return (<>

        <div className="order-info-container">
            <div className="first">
                {imgUrl ? <iframe src={imgUrl} frameborder="2" ></iframe> : <img src='http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRzKA1ZTfRqLSiCSH4Dtco5NC7nivJgLcfqbXoI14SgWjLGDN98m13vySN66-eUuPVclf2ZEbZ4Om2Owt-WbphGGfUUw2RBjx3DizvPMrw_OWUf1ERzePW03N0MDoXKJCK45c_EcqjR' />}
            </div>
            <div className="second">
                <h4><NavLink to={`/stones/${productId}`}>
                    {pname}
                </NavLink></h4>
                <p>Order No : <span>{orderNo}</span></p>
                <p>Carat : <span>{carat}</span></p>
                <p>Quantity : <span>{qty}</span></p>
                <p>Order Date : <span> {orderDate}</span></p>
                <p>Payment : <span>{paymentMethod}</span></p>
            </div>
            <div className="three">
                <p>₹ {price}</p>
            </div>
            {
                orderStatus == 'delivered' &&

                <div className="four">
                    <NavLink to={`/orders/review/${productId}`}>
                        <FaStar /> <span>Rate & Review Product</span>
                    </NavLink>
                </div>
            }
        </div>
    </>)
}