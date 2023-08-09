import React from 'react'
import "./style.css"
const Order = ({slider}) => {
  return (
    <div id='order' className='content-admin' style={{marginLeft:slider && '20%'}}>
      <h2>Orders</h2>
    </div>
  )
}

export default Order
