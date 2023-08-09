import React from 'react'
import "./style.css"
const Message = ({slider}) => {
  return (
    <div id='message' className='content-admin' style={{ marginLeft: slider && '20%' }}>
      <h2>Messages</h2>
    </div>
  )
}

export default Message
