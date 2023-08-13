

import "./style.css"
import axios from 'axios';
import { BiUser, BiSolidDiamond } from "react-icons/bi"
import { useState, useEffect } from "react"

const Dashboard = ({ slider }) => {
  const [user, setUser] = useState()
  const [diamond, setDiamond] = useState();

  useEffect(() => {
    axios.get("http://localhost:4001/v1/user")
      .then((r) => {
        setUser(r.data.length);
      })
    axios.get("http://localhost:4001/getproduct")
      .then((r) => {
        setDiamond(r.data.length);
      })
  }, [user])
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
              <BiSolidDiamond />
            </div>
            <div className="right">
              <p>Diamonds</p>
              <h2>{diamond}</h2>
              <span>see all diamonds</span>
            </div>
          </div>


        </div>
      </div>
    </>
  )
}

export default Dashboard
