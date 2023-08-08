import React from 'react'
import "./style.scss"
const Order = ({slider}) => {
  return (
    <div id='order' className='content-admin' style={{marginLeft:slider && '28%'}}>
      <h2>Orders</h2>
    </div>
  )
}

export default Order
