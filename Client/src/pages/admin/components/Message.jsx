import React, { useEffect, useState } from 'react'
import "./style.css"
import axios from 'axios'
import { useScroll } from 'framer-motion'
const Message = ({ slider }) => {
  const [feedback, setFeedback] = useState();
  console.log(feedback)
  useEffect(() => {
    axios.get("http://localhost:4001/feedback")
      .then((r) => {
        setFeedback(r.data);
        
      })
  },[])
  return (
    <div id='message' className='content-admin' style={{ marginLeft: slider && '20%' }}>
      <div class="ag-format-container">
        <div class="ag-courses_box">

{
feedback ?
feedback.map((item,index)=>{
  return(<>
   <div class="ag-courses_item" key={index}>
            <div class="ag-courses-item_link">
              <div class="ag-courses-item_bg"></div>

              <div class="ag-courses-item_title">
                {item.feedback}
              </div>

              <div class="ag-courses-item_date-box">
                date : 
                <span class="ag-courses-item_date">
                 {item.createdAt.slice(0,10)}
                </span>
              </div>
            </div>
          </div>
  </>)
})
:""
}
         



        </div>
      </div>

    </div>
  )
}

export default Message
