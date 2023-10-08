import React, { useState } from 'react'
import "./style.css";
import { BiSolidDiamond, BiLogOut, BiPlus, BiMessage, BiGridAlt, BiStore, BiSearch, BiUser, BiXCircle, BiMenuAltLeft, BiSolidDashboard, BiStats, BiQuestionMark } from "react-icons/bi"
import { GoReport } from "react-icons/go"
import { AiFillSetting } from "react-icons/ai"
import { NavLink } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddDiamond from './components/AddDiamond';
import Order from './components/Order';
import Faq from './components/Faq';
import Diamonds from './components/Diamonds';
import Message from './components/Message';
import Report from "./components/Report"
import Cutomer from './components/Cutomer';
import admin from "./admin.jpeg"
import logo from "./diamond_logo.png"

const Admin = ({ data }) => {
  const [search, setSearch] = useState(true)
  const [slider, setSlider] = useState(true)



  return (
    <>


      <div id="admin">
        <header>
          <div className="left">
            {/* <BiMenuAltLeft onClick={() => setSlider(!slider)} /> */}
            <input id="checkbox" type="checkbox" onChange={()=>setSlider(!slider)} checked={slider}/>
    <label class="toggle" for="checkbox">
        <div id="bar1" class="bars"></div>
        <div id="bar2" class="bars"></div>
        <div id="bar3" class="bars"></div>
    </label>
            
          </div>
          <div className="centers">
          <img src={logo} alt="" width="40px" />
            <button data-text="Awesome" class="admin-heding-btn">
              <span class="actual-text">&nbsp;MRP DIAMONDS &nbsp;</span>
              
            </button>
          </div>
          {/* <div className="cen">
           
          </div> */}
          <div className="right">

            {/* <div className="search">
              <input placeholder="Search..." type="text" />
              <button type="submit">Go</button>
            </div> */}


            <img src={admin} alt=" " />
          </div>
        </header>

        <main>

          <AdminSlide slider={slider} />
          <Routes>
            <Route path="/dashboard" element={<Dashboard slider={slider} />}></Route>
            <Route path="/managediamond" element={<AddDiamond slider={slider} />}></Route>
            <Route path="/order" element={<Order slider={slider} />}></Route>
            <Route path="/faq" element={<Faq slider={slider} />}></Route>
            <Route path="/customer" element={<Cutomer slider={slider} />}></Route>
            <Route path="/diamonds" element={<Diamonds slider={slider} data={data} />}></Route>
            <Route path="/message" element={< Message slider={slider} />}></Route>
            <Route path="/report" element={< Report slider={slider} />}></Route>
            <Route path="/addproduct" element={< AddDiamond slider={slider} />}></Route>
          </Routes>
        </main>
      </div>


    </>
  )
}

const AdminSlide = ({ slider }) => {
  return (<>
    <div className="left-side" id={slider && 'showslide'} >

      <div className='slide-container'>

        <NavLink to="/admins/dashboard"> <BiSolidDashboard />Dashboard</NavLink>
        <NavLink to="/admins/customer">< BiUser />Customer</NavLink>
        <NavLink to="/admins/diamonds"><BiSolidDiamond />Diamonds</NavLink>
        <NavLink to="/admins/message"><BiMessage />Feedback</NavLink>
        <NavLink to="/admins/order"><BiStore />Orders</NavLink>
        {/* <NavLink to="/admins/report">< GoReport />Reports</NavLink> */}
        {/* <NavLink to="/admins/setting"><AiFillSetting />Settings</NavLink> */}
        {/* <NavLink to="/admins/faq"><BiQuestionMark />FAQ</NavLink> */}
        <NavLink to="/admins/addproduct"><BiPlus />Add Diamond</NavLink>
        <NavLink to="/admin" style={{ marginTop: '2rem' }}><BiLogOut />Logout</NavLink>

      </div>
    </div>
  </>)
}

export default Admin
