import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrderData } from '../../redux/order/orderApi';
const MyOrder = () => {


  const dispatch = useDispatch()
  const order = useSelector((state) => state.order.order)

  useEffect(() => {
    dispatch(getUserOrderData())
  }, [])
  return (

    <>
      <div className="right-side">
        <div className="heading-edit-profile">
          My Orders
        </div>

        <div>
          <h2>Empty</h2>
        </div>
      </div>
    </>
  )
}

export default MyOrder