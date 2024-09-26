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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import axios from "axios";
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

            </div>
          </div>

          <div className="right">



            <Avatar src={admin?.image} alt=" " />
          </div>
        </div>

        <main>
          <AdminSlide slider={slider} setSlider={setSlider} />
          <Outlet />

        </main>
      </div>


    </>
  )
}

export const AdminSlide = ({ slider, setSlider }) => {

  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleLogout = () => {
    axios.get('/admin/logout',{withCredentials:true})
    setSlider(!slider)
    window.location.reload()
    
  }
  return (<>
    <div className="left-side" id={slider && 'showslide'} >

      <div className='slide-container'>

        <NavLink to="/admin/dashboard" onClick={() => setSlider(!slider)} > <BiSolidDashboard />Dashboard</NavLink>
        <NavLink to="/admin/users" onClick={() => setSlider(!slider)}>< BiUser />Users</NavLink>
        <NavLink to="/admin/diamonds" onClick={() => setSlider(!slider)}><BiDiamond />Diamonds</NavLink>
        <NavLink to="/admin/order" onClick={() => setSlider(!slider)}><BiStore />Orders</NavLink>
        <NavLink to="/admin/feedback" onClick={() => setSlider(!slider)}><BiMessage />Feedback</NavLink>
        <NavLink to="/admin/addproduct" onClick={() => setSlider(!slider)}><BiPlus />Add Diamond</NavLink>


        <Accordion
          expanded={expanded}
          onChange={handleExpansion}
          slots={{ transition: Fade }}
          slotProps={{ transition: { timeout: 400 } }}
          sx={{
            '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
            '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
            backgroundColor: 'rgb(214, 225, 235)',
            width: '100%',
            boxShadow: 'none',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>More Add</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {/* <Typography> */}
            <NavLink to="/admin/category" className='other' onClick={() => setSlider(!slider)}>< BiCategory style={{ marginRight: '10px' }} />Shapes</NavLink>
            <NavLink to="/admin/color" className='other' onClick={() => setSlider(!slider)}>< IoMdColorPalette style={{ marginRight: '10px' }} />Colors</NavLink>
            <NavLink to="/admin/clarity" className='other' onClick={() => setSlider(!slider)}>< FiSunset style={{ marginRight: '10px' }} />Clarity</NavLink>
            <NavLink to="/admin/cut" className='other' onClick={() => setSlider(!slider)}>< GiCutDiamond style={{ marginRight: '10px' }} />Cut</NavLink>
            <NavLink to="/admin/polish" className='other' onClick={() => setSlider(!slider)}>< GiFloorPolisher style={{ marginRight: '10px' }} />Polish</NavLink>
            <NavLink to="/admin/summetry" className='other' onClick={() => setSlider(!slider)}>< FaAsymmetrik style={{ marginRight: '10px' }} />Summetry</NavLink>
            {/* </Typography> */}
          </AccordionDetails>
        </Accordion>



        {/* <NavLink to="/admin/fluorescence" onClick={() => setSlider(!slider)}>< IoMdColorPalette />Fluorescence</NavLink> */}
        {/* <NavLink to="/admin/invoice"><FaFileInvoiceDollar />Invoice</NavLink> */}
        {/* <NavLink to="/admins/faq"><BiQuestionMark />FAQ</NavLink> */}

        <NavLink to="/admin" style={{ marginTop: '2rem' }} onClick={handleLogout}><BiLogOut />Logout</NavLink>

      </div>
    </div>
  </>)
}

export default Admin
