import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrderData } from '../../../redux/order/orderApi';
import ChevronRightSharpIcon from '@mui/icons-material/ChevronRightSharp';
import excludeVariablesFromRoot from '@mui/material/styles/excludeVariablesFromRoot';
import { useNavigate } from 'react-router-dom';

const MyOrder = () => {

  const dispatch = useDispatch()
  const order = useSelector((state) => state.order.order)

  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getUserOrderData())
  }, [])

  const getOrderDate = (originalDate) => {
    const dateObject = new Date(originalDate);
    const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(dateObject);
    return formattedDate;
  }

  const transformedData = []


  if (Array.isArray(order)) {
    order.forEach((orderItem) => {
      const { _id: orderId, deliveryDate } = orderItem;
      orderItem?.orderItems?.forEach((item) => {
        transformedData.push({
          _id: item._id,
          orderId,
          orderStatus: orderItem.orderStatus,
          deliveryDate: getOrderDate(deliveryDate),
          productName: item.productName,
          quantity: item.quantity,
          price: item.price,
          imgUrl: item.imgUrl,
          carat: item.carat,
        });
      });
    });
  }

  const handleClick = (orderNo, orderItemId) => {
    navigate(`/orders/${orderNo}/${orderItemId}`)

  }
  return (
    <>
      <div className="right-side">
        <div className="heading-edit-profile">
          My Orders
        </div>

        <div className="my-orders">
          {
            transformedData.length > 0 ?
            transformedData?.map((item) => {
              return (
                <OrderCard orderNo={item.orderId}
                  orderItemId={item._id}
                  imgUrl={item.imgUrl}
                  pname={item.productName}
                  qty={item.quantity}
                  carat={item.carat}
                  price={item.price}
                  exdate={item.deliveryDate}
                  navigate={navigate}
                  handleClick={handleClick}
                  orderStatus = {item.orderStatus}
                />)
            })
            : <h3>Order Not Available...</h3>
          }

        </div>
      </div>
    </>
  )
}

export default MyOrder


const OrderCard = ({ handleClick, orderNo, imgUrl, pname, qty, carat, price, exdate, orderItemId,orderStatus }) => {
  return (
    <>
      <div className="orders-container" onClick={() => handleClick(orderNo, orderItemId)}>
        <div className="orderno">
          {orderNo}
        </div>
        <div className="first">
          <iframe src={imgUrl} frameborder="0"></iframe>
        </div>
        <div className="second">
          <p>{pname}</p>
          <p>Qty : {qty}</p>
          <p>Carat : {carat} </p>
        </div>
        <div className="third">
          <p>
            ₹ {price}
          </p>
        </div>
        <div className="four">
          {/* <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Green_Dot_%28Active%29.png" alt="" /> */}
          <p>
            {
              orderStatus == "delivered" ?
              <span>Order Complated !</span> : <span> Delivery expected by {exdate} </span>
              
            }
            
          </p>
        </div>
        <div className="five">
          <p>
            <ChevronRightSharpIcon />
          </p>
        </div>
      </div>
    </>)
}