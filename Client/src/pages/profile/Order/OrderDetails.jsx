import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { getOrderById } from '../../../redux/order/orderApi'
import OrderSteps from './OrderSteps'
import { Badge, Chip } from '@mui/material'
import { FaStar } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// import 'jspdf-autotable/dist/jspdf.plugin.autotable';

const OrderDetails = () => {
    const { id } = useParams()
    const order = useSelector((state) => state.order.order)

    


    const getOrderDate = (originalDate) => {
        // const dateObject = new Date(originalDate);
        const dateObject = new Date(originalDate || "2024-01-02T10:27:16.304+00:00");
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }).format(dateObject);
        return formattedDate;
    }

    const generateInvoice = () => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Set up the document
        doc.setFontSize(12);
        doc.text('STEIN GEMS', 85, 10);

        // Add customer information
        doc.text(`Customer: ${order && order?.userId?.name}`, 10, 20);
        doc.text(`Email: ${order && order?.userId?.email}`, 10, 30);

        // Add order details
        doc.text(`Order ID: ${order?._id}`, 10, 40);
        doc.text(`Order Date: ${order?.orderDate ? getOrderDate(order.orderDate) : ""}`, 10, 50);

        // Add product table
        const products = order.orderItems;
        let yPos = 70;
        const headers = [['Product', 'Price', 'Quantity', 'Total']];

        const data = products.map(product => [
            product.productName,
            `${product.price.toFixed(2)}`,
            product.quantity,
            `${(product.price * product.quantity).toFixed(2)}`
        ]);

        doc.autoTable({
            startY: yPos,
            head: headers,
            body: data
        });

        // Add total
        const total = products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
        yPos = doc.autoTable.previous.finalY + 10;
        doc.text(`Total: ${total.toFixed(2)}`, 10, yPos);

        // Save the PDF
        doc.save(`invoice_${order?.orderId}.pdf`);
    };



    useEffect(() => {
        dispatch(getOrderById(id))
    }, [])

    const dispatch = useDispatch()
    const address = order?.shippingAddress
    const orderItems = order?.orderItems


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


                <div className="main-order-container">
                    <div className="left-con" >
                        <Chip label="Order Details" variant='filled' color='primary' style={{ position: 'absolute', left: '-25px', top: '15px', padding: '2px 10px', fontSize: '16px' }} />

                        <div>
                            <p>Order Number </p>
                            <span>{order?._id}</span>
                        </div>

                        <div>
                            <p>Order Date </p>
                            <span>{order?.orderDate ? getOrderDate(order.orderDate) : ""}</span>
                        </div>


                        <div>
                            <p>Delivery Fee </p>
                            <span style={{ color: 'green', fontWeight: '600' }}>₹0</span>
                        </div>


                        <div>
                            <p>Payment Status </p>
                            <span>{order?.paymentStatus}</span>
                        </div>
                        <div>
                            <p>Payment Mode </p>
                            <span>{order?.paymentMethod}</span>
                        </div>

                        <div>
                            <p>Total Price </p>
                            <span style={{ color: 'green', fontWeight: '600' }}>₹{order?.totalPrice}</span>
                        </div>

                        <div>

                        </div>

                    </div>


                    <div className="right-con">
                        <section>

                            <h5>Order Items({order?.totalItem})</h5>
                            <button className='invoice-btn' onClick={generateInvoice} ><FaPrint style={{ marginRight: '8px' }} />Download Invoice</button>
                        </section>
                        {
                            orderItems?.map((item) => {
                                return (

                                    <OrderBox
                                        orderNo={order?._id}
                                        productId={item.productId}
                                        imgUrl={item.imgUrl}
                                        pname={item.productName}
                                        qty={item.quantity}
                                        carat={item.carat}
                                        price={item.price}
                                        paymentMethod={order?.paymentMethod}
                                        orderDate={order?.orderDate ? getOrderDate(order.orderDate) : ""}
                                        orderStatus={order?.orderStatus}
                                    />)


                            })
                        }

                    </div>
                </div>



            </div>
        </>
    )
}

export default OrderDetails

export const OrderBox = ({ imgUrl, pname, carat, qty, price, orderNo, paymentMethod, productId, orderDate, orderStatus }) => {
    const navigate = useNavigate()

    return (<>

        <div className="order-info-container">
            <div className="first">
                {imgUrl ? <iframe src={imgUrl} frameborder="2" ></iframe> : <img src='http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRzKA1ZTfRqLSiCSH4Dtco5NC7nivJgLcfqbXoI14SgWjLGDN98m13vySN66-eUuPVclf2ZEbZ4Om2Owt-WbphGGfUUw2RBjx3DizvPMrw_OWUf1ERzePW03N0MDoXKJCK45c_EcqjR' />}
            </div>
            <section>

                <div className="second">
                    <h4><NavLink to={`/stones/${productId}`}>
                        {pname}
                    </NavLink></h4>
                    {/* <p>Order No : <span>{orderNo}</span></p> */}
                    <p>Carat : <span>{carat}</span></p>
                    <p>Quantity : <span>{qty}</span></p>
                    {/* <p>Order Date : <span> {orderDate}</span></p> */}
                    {/* <p>Payment : <span>{paymentMethod}</span></p> */}
                </div>
                <div className="three">
                    <p>₹ {price}</p>
                </div>

                {
                    orderStatus == 'delivered' &&
                    <div className="four">
                        {/* <NavLink to={`/orders/review/${productId}`}> */}
                        <main >

                            <div onClick={() => navigate(`/orders/review/${productId}`)} style={{ cursor: 'pointer' }}>
                                <FaStar /> <span>Rate & Review Product</span>
                            </div>


                        </main>
                        {/* </NavLink> */}
                    </div>

                }
            </section>
        </div>



    </>)
}