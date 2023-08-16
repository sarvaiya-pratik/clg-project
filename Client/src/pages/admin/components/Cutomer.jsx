import React, { useState, useEffect } from 'react'
import "./style.css"
import axios from 'axios';
import { AiFillDelete } from "react-icons/ai"
import { toast } from 'react-hot-toast';
axios.defaults.baseURL = "http://localhost:4001"
const Cutomer = ({ slider }) => {

  const [user, setUser] = useState()
  useEffect(() => {
    axios.get("/user")
      .then((r) => {
        setUser(r.data);
      })
  }, [])
  
  const handleDetele = (_id) => {
    if (window.confirm("Are you sure delete this user ?")) {
      axios.delete(`/user/${_id}`)
        .then((r) => {
          toast.success(r.data.message)
          window.location.reload();
        })
    }
    else {
      toast.error("canceled")
    }




  }

  return (
    <div id='customer' className='content-admin' style={{ marginLeft: slider && '20%' }}>
      <h2>Customer</h2>

      <div className="container">
        <h2>List of Customers</h2>
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">NO</div>
            <div className="col col-2">Customer Name</div>
            <div className="col col-3">Email</div>
            <div className="col col-4">Phone</div>
            <div className="col col-5"></div>
          </li>

          {
            user ?
              user.map((item, index) => {
                return (
                  <li className="table-row" key={index}>
                    <div className="col col-1" >{index + 1}</div>
                    <div className="col col-2" >{item.name}</div>
                    <div className="col col-3" >{item.email}</div>
                    <div className="col col-4" >{item.phone}</div>
                    <div className="col col-5 deletecustomer" onClick={() => handleDetele(item._id)}  ><AiFillDelete /></div>
                  </li>
                )
              }) : ""
          }


        </ul>
      </div>



    </div>
  )
}

export default Cutomer
