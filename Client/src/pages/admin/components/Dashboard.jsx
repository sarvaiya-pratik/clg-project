
import "./style.css"
import axios from 'axios';
import { BiUser, BiSolidDiamond } from "react-icons/bi"
import { CiDeliveryTruck } from "react-icons/ci"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
// axios.defaults.baseURL = "http://localhost:4001"
const Dashboard = ({ slider }) => {
  const [user, setUser] = useState()
  const [diamond, setDiamond] = useState();
  const [order, setOrder] = useState();


  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/user")
      .then((r) => {
        setUser(r.data.length);
      })
    axios.get("/product")
      .then((r) => {
        setDiamond(r.data.length);
      })

    axios.get("/order")
      .then((r) => {
        setOrder(r.data.length)
      })

    console.log("order", order)
  }, [user])
  return (
    <>
      <div id="dashboard" className='content-admin' >
        <h2>DASHBOARD</h2>

        <div className="all-cards">
          <div className="user-card">
            <div className="left">
              <BiUser />
            </div>
            <div className="right">
              <p>users</p>
              <h2>{user}</h2>
              <span onClick={() => navigate("/admins/customer")}>see all user</span>
            </div>
          </div>

          <div className="user-card">
            <div className="left">
              <BiSolidDiamond />
            </div>
            <div className="right">
              <p>Diamonds</p>
              <h2>{diamond}</h2>
              <span onClick={() => navigate("/admins/diamonds")}>see all diamonds</span>
            </div>
          </div>
          <div className="user-card">
            <div className="left">
              <CiDeliveryTruck />
            </div>
            <div className="right">
              <p>Orders</p>
              <h2>{order}</h2>
              <span onClick={() => navigate("/admins/order")}>see all Orders</span>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Dashboard
