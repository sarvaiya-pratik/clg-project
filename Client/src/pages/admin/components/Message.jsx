import React, { useEffect, useState } from 'react'
import "./style.css"
import axios from 'axios'
import { GrClose } from 'react-icons/gr'
import { toast } from 'react-hot-toast'
const Message = ({ slider }) => {
  const [feedback, setFeedback] = useState();
  const [refresh,setRefresh] = useState(true)
  useEffect(() => {
    axios.get("/feedback")
      .then((r) => {
        setFeedback(r.data);
      })
  }, [refresh])

  
  const handleDelete = (id) => {

    if (window.confirm("Are you sure delete this feedback ?")) {
      axios.delete(`/feedback/${id}`)
        .then((r) => {
          toast.success(r.data.message)
          
          setRefresh(!refresh)

        })
    }
  }
  return (
    <div id='message' className='content-admin' >
      <h2 style={{ color: '#0380a7', borderBottom: '1px solid black' }}> List of Feedback</h2>
      <div class="ag-format-container">
        <div class="ag-courses_box">

          {
            feedback ?
              feedback.map((item, index) => {
                return (<>
                  <div class="ag-courses_item" key={index}>
                    <div class="ag-courses-item_link">
                      <div class="ag-courses-item_bg"></div>
                      <GrClose className='closeFeedback' onClick={() => handleDelete(item._id)} />
                      <div class="ag-courses-item_title">
                        {item.feedback}
                      </div>

                      <div class="ag-courses-item_date-box">
                        date :
                        <span class="ag-courses-item_date">
                          {item.createdAt.slice(0, 10)}
                        </span>
                      </div>
                    </div>
                  </div>
                </>)
              })
              : ""
          }




        </div>
      </div>

    </div>
  )
}

export default Message
