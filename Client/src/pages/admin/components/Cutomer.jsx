import React, { useState, useEffect } from 'react'
import "./style.css"
import axios from 'axios';

const Cutomer = ({ slider }) => {

  const [user, setUser] = useState()
  useEffect(() => {
     axios.get("http://localhost:4001/getuser")
      .then((r) => {
        setUser(r.data);
      })
  },[])


  return (
    <div id='customer' className='content-admin' style={{ marginLeft: slider && '20%' }}>
      <h2>Customer</h2>
      
      <div className="container">
        <h2>List of <small>customers</small></h2>
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">NO</div>
            <div className="col col-2">Customer Name</div>
            <div className="col col-3">Email</div>
            <div className="col col-4">Phone</div>
          </li>

          {
          user?
          user.map((item, index) => {
            return (
              <li className="table-row" key={index}>
                <div className="col col-1" >{index + 1}</div>
                <div className="col col-2" >{item.name}</div>
                <div className="col col-3" >{item.email}</div>
                <div className="col col-4" >{item.phone}</div>
              </li>
            )
          }):""
        }


        </ul>
      </div>



    </div>
  )
}

export default Cutomer
