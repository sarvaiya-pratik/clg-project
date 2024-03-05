import { Badge, Box, Button, Chip, Drawer, FormControl, FormLabel, InputLabel, Select, Stack, TextField } from '@mui/material'
import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import OrderSteps from './OrderSteps'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { HiOutlinePlusSm, HiOutlineMinusSm } from "react-icons/hi";
import "../style.css"
import { FaLongArrowAltRight } from "react-icons/fa";
import { updateOrderStatus } from '../../../../redux/order/orderApi'

const EditOrder = ({ isOpen, handleDrawer,setRefresh }) => {

    const order = useSelector((state) => state.order.order)
    
    const dispatch = useDispatch()

    const handleOrderStatus = (id, status) => {
        dispatch(updateOrderStatus({ id, status }))
        setRefresh((ref)=>!ref)
    }


    return (
        <>
            <Fragment key="right">
                <Drawer
                    anchor={'right'}
                    open={isOpen}
                    onClose={handleDrawer}
                >
                    <Box className="address-drawer" sx={{ width: { xs: "90vw", md: '50vw' } }} id='main-drawer'>
                        <MdOutlineClose style={{ cursor: 'pointer' }} size={25} onClick={() => handleDrawer(false)} />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2 }}>

                            <h4 style={{ paddingLeft: '1rem', marginTop: '1rem' }}>Order <span style={{ fontWeight: '700', fontSize: '15px' }}>#{order?.razorpay_order_id}</span></h4>
                            <p>created at {order?.createAt?.slice(0, 10)}</p>
                        </Box>

                        <form action="" style={{ display: 'flex', flexDirection: 'column', padding: '1rem', gap: '1rem' }}>
                            <OrderSteps mystep={order?.orderStatus == 'pending' && 2 || order?.orderStatus == 'shipped' && 3 || order?.orderStatus == 'delivered' && 5} />
                            <Stack direction='row'  >
                                <Stack width='50%'>
                                    <Chip label="Order Details" variant='filled' color='primary' sx={{ px: 2, width: '150px' }}></Chip>
                                    <Box sx={{ py: 1, lineHeight: '10px', px: 2 }}>

                                        <Stack direction='row' alignItems='center' gap={1} width="62%" justifyContent='space-between'>
                                            <p style={{ fontWeight: '550' }}>Order Status   </p>
                                            <p><FaLongArrowAltRight /></p>
                                            <p>{order ? order?.orderStatus?.charAt(0)?.toUpperCase() + order?.orderStatus?.slice(1) : ""}</p>
                                        </Stack>

                                        <Stack direction='row' alignItems='center' gap={1} width="67%" justifyContent='space-between'>
                                            <p style={{ fontWeight: '550' }}>Delivery Date</p>
                                            <p><FaLongArrowAltRight /></p>
                                            <p>{order?.deliveryDate?.slice(0, 10)}</p>
                                        </Stack>


                                    </Box>
                                </Stack>



                                <Stack width='50%'>
                                    <Chip label="Price Details" variant='filled' color='primary' sx={{ px: 2, width: '150px' }}></Chip>
                                    <Box sx={{ py: 1, lineHeight: '10px', px: 2 }}>


                                        <Stack direction='row' alignItems='center' gap={1} width="60%" justifyContent='space-between'>
                                            <p style={{ fontWeight: '550' }}>Price ({order?.totalItem} items) </p>
                                            <p>{order?.totalPrice}</p>
                                        </Stack>
                                        <Stack direction='row' alignItems='center' gap={1} width="60%" justifyContent='space-between'>
                                            <p style={{ fontWeight: '550' }}>Discounts  </p>
                                            <p><HiOutlineMinusSm size={16} /> 0</p>
                                        </Stack>
                                        <Stack direction='row' alignItems='center' gap={1} width="60%" justifyContent='space-between'>
                                            <p style={{ fontWeight: '550' }}>Delivery Charges   </p>
                                            <p><HiOutlinePlusSm size={16} /> 0</p>
                                        </Stack>
                                        {/* <hr /> */}
                                        <Stack direction='row' alignItems='center' gap={1} width="60%" justifyContent='space-between' style={{ borderTop: '1px solid gray', paddingTop: '10px' }}>
                                            <p style={{ fontWeight: '550' }}>Total Price  : </p>
                                            <p> <b>{order?.totalPrice}</b></p>
                                        </Stack>

                                    </Box>
                                </Stack>
                            </Stack>

                            <Stack>
                                <Chip label="Products" variant='filled' color='primary' sx={{ px: 2, width: '150px' }}></Chip>
                                <Box sx={{ py: 1, lineHeight: '10px', px: 2 }}>

                                    <Stack direction='row' alignItems='center' gap={2} flexWrap='wrap' >
                                        {
                                            order?.orderItems?.map((item) => {
                                                return (<>
                                                    <Stack direction='row' gap='1rem' alignItems='center' sx={{ width: '48%', boxShadow: 'rgba(3, 102, 214, 0.3) 0px 0px 0px 1px', backgroundColor: '#e8f1ff' }}>
                                                        {
                                                            item?.imgUrl?.includes('cloudinary') ?
                                                                <img src={item?.imgUrl} width="100px" height="100px"  ></img> :
                                                                <iframe src={item?.imgUrl} width="100px" height="100px"></iframe>
                                                        }
                                                        {/* <iframe src={item.imgUrl} frameborder="0" width="100px" height="100px"></iframe> */}
                                                        <Box >

                                                            <h6 >{item?.productName}</h6>
                                                            <Chip variant='outlined' size='30' color='success' label={`₹ ${item.price}`} sx={{ mr: 1, overflow: 'unset' }}  ></Chip>
                                                            <Chip variant='outlined' label={`${item.quantity} Quantity`} color='info'></Chip>
                                                        </Box>


                                                    </Stack>
                                                </>)
                                            })
                                        }
                                    </Stack>




                                </Box>
                            </Stack>
                            <Stack>
                                <Chip label="Delivery Address" variant='filled' color='primary' sx={{ px: 2, width: '150px' }}></Chip>
                                <Box sx={{ py: 1, lineHeight: '10px', px: 2, fontWeight: '600' }}>

                                    <p>{order?.shippingAddress?.fname + " " + order?.shippingAddress?.lname}  </p>
                                    <p>{order?.shippingAddress?.streetAddress + " " + order?.shippingAddress?.city + "-" + order?.shippingAddress?.pincode}</p>
                                </Box>
                            </Stack>
                            <Stack>
                                <Chip label="Payment Details" variant='filled' color='primary' sx={{ px: 2, width: '150px' }}></Chip>
                                <Box sx={{ py: 1, lineHeight: '10px', px: 2 }}>

                                    <Stack direction='row' alignItems='center' gap={1}>
                                        <p style={{ fontWeight: '550' }}>Pyment Status  : </p>
                                        <p>{order?.paymentStatus}</p>
                                    </Stack>
                                    <Stack direction='row' alignItems='center' gap={1}>
                                        <p style={{ fontWeight: '550' }}>Pyment Method  : </p>
                                        <p> {order?.paymentMethod}</p>
                                    </Stack>
                                    <Stack direction='row' alignItems='center' gap={1}>
                                        <p style={{ fontWeight: '550' }}>
                                            razorpay_payment_id  : </p>
                                        <p>{order?.razorpay_payment_id}</p>
                                    </Stack>
                                    <Stack direction='row' alignItems='center' gap={1}>
                                        <p style={{ fontWeight: '550' }}>
                                            razorpay_signature  : </p>
                                        <p>{order?.razorpay_signature}</p>
                                    </Stack>



                                </Box>
                            </Stack>



                            {
                                order?.orderStatus == 'pending' && <Button variant="contained" style={{ marginTop: '1rem' }} onClick={() => handleOrderStatus(order?._id, "shipped")} >Shiped Order</Button> ||
                                order?.orderStatus == 'shipped' && <Button variant="contained" style={{ marginTop: '1rem' }} onClick={() => handleOrderStatus(order?._id, "delivered")}  >Delieverd  Order</Button> ||
                                order?.orderStatus == 'delivered' && <Button variant="contained" style={{ marginTop: '1rem' }} disabled>Order Complated</Button>
                            }

                        </form>

                    </Box>
                </Drawer>
            </Fragment>
        </>
    )
}

export default EditOrder