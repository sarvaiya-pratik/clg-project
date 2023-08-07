import React, { useState } from 'react'
import "./style.css";
import { BiSearch, BiXCircle, BiMenuAltLeft } from "react-icons/bi"
import { NavLink } from 'react-router-dom'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';

const Admin = () => {
  const [search, setSearch] = useState(true)
  const [slider, setSlider] = useState(true)
  return (
    <>
    <Router>
      <Routes>
      <div id="admin">
        <header>
          <div className="left">
            <BiMenuAltLeft onClick={() => setSlider(!slider)} />
            <h5>MRP DIAMONDS</h5>
          </div>
          <div className="right">
            <input type="text" style={{ visibility: search ? 'unset' : 'hidden' }} />
            {search ? <BiXCircle onClick={() => setSearch(!search)} /> : <BiSearch onClick={() => setSearch(!search)} />}
            <img src="https://www.gravatar.com/avatar/0eb40fb53f2e8f77f9ce123c38a53310?s=64&d=identicon&r=PG" alt=" " />
          </div>
        </header>


        <div className="left-side" id={slider && 'showslide'} >
          <ul>
            <li>
              <NavLink to="/admin/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/Managediamond">Manage Diamond</NavLink>
            </li>
            <li>
              <NavLink to="/sell">Sell</NavLink>
            </li>
            <li>
              <NavLink to="/faq">FAQ</NavLink>
            </li> 
          </ul>
        </div>
       
      </div>
      <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      </Router>
    </>
  )
}

export default Admin
