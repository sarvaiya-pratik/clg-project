import React from 'react'
import "./style.css"
const Cutomer = ({slider}) => {
  return (
    <div id='customer'className='content-admin' style={{ marginLeft: slider && '20%' }}>
      <h2>Customer</h2>
    </div>
  )
}

export default Cutomer
