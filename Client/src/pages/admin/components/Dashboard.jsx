
import "./style.css"
import axios from 'axios';
import { BiUser, BiSolidDiamond } from "react-icons/bi"
import { CiDeliveryTruck } from "react-icons/ci"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getalluser } from "../../../redux/user/userApi";
import { getproductall } from "../../../redux/product/productApi";

const Dashboard = ({ slider }) => {



  const product = useSelector((state)=>state.product.products)
  const user = useSelector((state) => state.user.users)
const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getalluser())
    dispatch(getproductall  ())
  },[])

  const navigate = useNavigate();

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
              <h2>{user && user.length}</h2>
              <span onClick={() => navigate("/admins/customer")}>see all user</span>
            </div>
          </div>

          <div className="user-card">
            <div className="left">
              <BiSolidDiamond />
            </div>
            <div className="right">
              <p>Diamonds</p>
              <h2>{product && product.length}</h2>
              <span onClick={() => navigate("/admins/diamonds")}>see all diamonds</span>
            </div>
          </div>
          <div className="user-card">
            <div className="left">
              <CiDeliveryTruck />
            </div>
            <div className="right">
              <p>Orders</p>
              <h2>{2}</h2>
              <span onClick={() => navigate("/admins/order")}>see all Orders</span>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Dashboard


