import React, { useEffect, useState } from 'react'
import "./style.css";
import { BiSolidDiamond, BiLogOut, BiPlus, BiMessage, BiGridAlt, BiStore, BiSearch, BiUser, BiXCircle, BiMenuAltLeft, BiSolidDashboard, BiStats, BiQuestionMark, BiDiamond, BiCategory } from "react-icons/bi"
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { IoDiamondOutline } from "react-icons/io5";
import { NavLink, Outlet } from 'react-router-dom'
import { IoMdColorPalette } from "react-icons/io";
import { GiCutDiamond } from "react-icons/gi";
import { GiFloorPolisher } from "react-icons/gi";
import { FiSunset } from "react-icons/fi";
import { FaAsymmetrik } from "react-icons/fa";
// import admin from "./admin.jpeg"
import logo from "./diamond_logo.png"
import { ToastContainer, toast } from 'react-toastify'
import { Avatar } from '@mui/material';
import { AiFillSetting } from 'react-icons/ai';

const Admin = ({ data }) => {
  const [slider, setSlider] = useState(false)
  const [admin, setAdmin] = useState()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    setAdmin(user)
  }, [])

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={400} />
      <div id="admin">
        <div className='adminheader'>
          <div className="left">

            <input id="checkbox" type="checkbox" onChange={() => setSlider(!slider)} checked={slider} />
            <label class="toggle" for="checkbox">
              <div id="bar1" class="bars"></div>
              <div id="bar2" class="bars"></div>
              <div id="bar3" class="bars"></div>
            </label>

            <BiMenuAltLeft onClick={() => setSlider(!slider)} className='adminmenuicon' />
            {/* <img src={logo} alt="" width="40px"  /> */}
            <IoDiamondOutline color='white' />

          </div>
          <div className="centers">
            <div class="head-wrapper">
              <div class="bg">STEIN GEMS</div>
              {/* <div class="fg">STEIN GEMS</div> */}
            </div>
          </div>

          <div className="right">

            {/* <div className="search">
              <input placeholder="Search..." type="text" />
              <button type="submit">Go</button>
            </div> */}


            <Avatar src={admin?.image} alt=" " />
          </div>
        </div>

        <main>
          <AdminSlide slider={slider} setSlider={setSlider} />
          <Outlet />
          {/* <Routes>
            <Route path="/admin/dashboard" element={<Dashboard slider={slider} />}></Route>
            <Route path="/managediamond" element={<AddDiamond slider={slider} />}></Route>
            <Route path="/order" element={<Order slider={slider} />}></Route>
            <Route path="/faq" element={<Faq slider={slider} />}></Route>
            <Route path="/customer" element={<Cutomer slider={slider} />}></Route>
            <Route path="/diamonds" element={<Diamonds slider={slider} data={data} />}></Route>
            <Route path="/message" element={< Message slider={slider} />}></Route>
            <Route path="/report" element={< Report slider={slider} />}></Route>
            <Route path="/addproduct" element={< AddDiamond slider={slider} />}></Route>
          </Routes> */}
        </main>
      </div>


    </>
  )
}

export const AdminSlide = ({ slider, setSlider }) => {
  return (<>
    <div className="left-side" id={slider && 'showslide'} >

      <div className='slide-container'>

        <NavLink to="/admin/dashboard" onClick={() => setSlider(!slider)} > <BiSolidDashboard />Dashboard</NavLink>
        <NavLink to="/admin/users" onClick={() => setSlider(!slider)}>< BiUser />Users</NavLink>
        <NavLink to="/admin/diamonds" onClick={() => setSlider(!slider)}><BiDiamond />Diamonds</NavLink>
        <NavLink to="/admin/order" onClick={() => setSlider(!slider)}><BiStore />Orders</NavLink>
        <NavLink to="/admin/feedback" onClick={() => setSlider(!slider)}><BiMessage />Feedback</NavLink>
        <NavLink to="/admin/category" onClick={() => setSlider(!slider)}>< BiCategory />Shapes</NavLink>
        <NavLink to="/admin/color" onClick={() => setSlider(!slider)}>< IoMdColorPalette />Colors</NavLink>
        <NavLink to="/admin/clarity" onClick={() => setSlider(!slider)}>< FiSunset />Clarity</NavLink>
        <NavLink to="/admin/cut" onClick={() => setSlider(!slider)}>< GiCutDiamond />Cut</NavLink>
        <NavLink to="/admin/polish" onClick={() => setSlider(!slider)}>< GiFloorPolisher />Polish</NavLink>
        <NavLink to="/admin/summetry" onClick={() => setSlider(!slider)}>< FaAsymmetrik />Summetry</NavLink>
        {/* <NavLink to="/admin/fluorescence" onClick={() => setSlider(!slider)}>< IoMdColorPalette />Fluorescence</NavLink> */}
        {/* <NavLink to="/admin/invoice"><FaFileInvoiceDollar />Invoice</NavLink> */}
        {/* <NavLink to="/admins/faq"><BiQuestionMark />FAQ</NavLink> */}
        <NavLink to="/admin/addproduct" onClick={() => setSlider(!slider)}><BiPlus />Add Diamond</NavLink>
        <NavLink to="/" style={{ marginTop: '2rem' }} onClick={() => setSlider(!slider)}><BiLogOut />Logout</NavLink>

      </div>
    </div>
  </>)
}

export default Admin
