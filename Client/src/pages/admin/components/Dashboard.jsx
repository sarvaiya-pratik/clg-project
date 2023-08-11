

import "./style.css"
import axios from 'axios';
import { BiUser, BiCart } from "react-icons/bi"

import { useState,useEffect } from "react"

const Dashboard = ({ slider }) => {
  const [user, setUser] = useState()
  useEffect(() => {
     axios.get("http://localhost:4001/getuser")
      .then((r) => {
        setUser(r.data.length);
      })
  },[user])
  return (
    <>
      <div id="dashboard" className='content-admin' style={{ marginLeft: slider && '20%' }}>
        <h2>DASHBOARD</h2>

        <div className="all-cards">
          <div className="user-card">
            <div className="left">
              <BiUser />
            </div>
            <div className="right">
              <p>users</p>
              <h2>{user}</h2>
              <span>see all user</span>
            </div>
          </div>

          <div className="user-card">
            <div className="left">
              <BiCart />
            </div>
            <div className="right">
              <p>Orders</p>
              <h2>{15}</h2>
              <span>see all orders</span>
            </div>
          </div>


        </div>
      </div>
    </>
  )
}

export default Dashboard
