import React, { useState } from 'react'
import "./style.scss";
import { BiSearch, BiXCircle, BiMenuAltLeft,BiHome,BiStats,BiQuestionMark} from "react-icons/bi"
import {SiGoogletagmanager} from "react-icons/si"
import { NavLink } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import AddDiamond from './AddDiamond';
import Order from './Order';
import Faq from './Faq';
import Example from './Example';

const Admin = () => {
  const [search, setSearch] = useState(true)
  const [slider, setSlider] = useState(true)
  return (
    <>


      <div id="admin">
        <header>
          <div className="left">
            <BiMenuAltLeft onClick={() => setSlider(!slider)} />
            <h5>MRP DIAMONDS</h5>
          </div>
          <div className="right">
            <input type="text" placeholder='Search here' style={{ visibility: search ? 'unset' : 'hidden' }} />
            {search ? <BiXCircle onClick={() => setSearch(!search)} /> : <BiSearch onClick={() => setSearch(!search)} />}
            <img src="https://www.gravatar.com/avatar/0eb40fb53f2e8f77f9ce123c38a53310?s=64&d=identicon&r=PG" alt=" " />
          </div>
        </header>

<main>

        <AdminSlide slider={slider} />
      <Routes>
        <Route path="/dashboard" element={<Dashboard slider={slider} />}></Route>
        <Route path="/managediamond" element={<AddDiamond slider={slider}/>}></Route>
        <Route path="/order" element={<Order slider={slider} />}></Route>
        <Route path="/faq" element={<Example slider={slider}/>}></Route>





      </Routes>
</main>
      </div>


    </>
  )
}

const AdminSlide = ({ slider }) => {
  return (<>
    <div className="left-side" id={slider && 'showslide'} >
      <ul>
        <li>
          <NavLink to="/admins/dashboard"><BiHome/>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/admins/managediamond"><SiGoogletagmanager/>Manage Diamond</NavLink>
        </li>
        <li>
          <NavLink to="/admins/order"><BiStats/>Orders</NavLink>
        </li>
        <li>
          <NavLink to="/admins/faq"><BiQuestionMark/>FAQ</NavLink>
        </li>
      </ul>
    </div>
  </>)
}

export default Admin
