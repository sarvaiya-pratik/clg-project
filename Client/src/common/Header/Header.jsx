import React, { useContext, useEffect, useState } from 'react'
import "./style.css"
import { BiMenu, BiUserCircle } from "react-icons/bi"
import { NavLink } from "react-router-dom"


const Header = () => {

    const [menu, setMenu] = useState(false)

    return (
        <>
            <header id='mynav'>
                <div className='left'>
                    <img src="https://freepngimg.com/download/diamond/15-diamond-png-image.png" alt="" style={{ width: '60px', height: '60px' }} />
                </div>
                <div className="mobile-nav">
                    {/* <div onClick={() => setDarkMod(!darkMod)} style={{ cursor: "pointer" }}>
                        {darkMod ? <BiSun fontSize={"2rem"} /> : <BiMoon fontSize={"2rem"} style={{ color: "Black" }} />}
                    </div> */}
                    <div className=""><BiMenu fontSize={'2rem'} onClick={() => setMenu(!menu)} /></div>
                </div>


                <div className="middle">
                    <li>
                        <NavLink className="text-light" to="/">Home</NavLink>
                        {/* <a href="#home"className='text-light'>Home</a> */}
                    </li>
                    <li>
                        {/* <NavLink className="text-light"  to="#about">About</NavLink> */}
                        <a href="#about" className='text-light'>About</a>
                    </li>
                    <li>
                        {/* <NavLink className="text-light" to="/fature" >Fature</NavLink> */}
                        <a href="#service" className='text-light'>Service</a>
                    </li>
                    <li>
                        <NavLink className="text-light" to="/stock" >Stock</NavLink>
                        {/* <a href="#service" className='text-light'>Service</a> */}
                    </li>
                </div>

                <div className='right'>

                <div className="drop">

                
                    <li class="menu-title"><BiUserCircle/> </li>
                    <ul class="submenu">
                        <li><NavLink className="text-light" to="/login" >Login</NavLink></li>
                        <li><NavLink className="text-light" to="signup">Sign Up</NavLink></li>

                    </ul>
                    
                    </div>
                    {/* <li>
                        <NavLink className="text-light" to="/login" >Login</NavLink>
                    </li>

                    <li>
                        <NavLink className="text-light" to="signup">Sign Up</NavLink>
                    </li> */}




                </div>

            </header>


            {/* Sidebar for mobile   */}

            <div className={`sidebar  ${menu && "showsidebar"} `}>
                <div className="middle">
                    <li>
                        <NavLink className="text-light" onClick={() => setMenu(!menu)} to="/">Home</NavLink>
                    </li>

                    <li>
                       
                        <a href="#about" onClick={() => setMenu(!menu)} className='text-light'>About</a>
                    </li>
                    <li>
                       
                        <a href="#service" onClick={() => setMenu(!menu)} className='text-light'>Service</a>
                    </li>

                    <li>
                       
                    <NavLink className="text-light" onClick={() => setMenu(!menu)} to="/stock">Stoke</NavLink>
                    </li>
                </div>

                <hr />

                <div className='right'>
                    <li>
                        <NavLink className="text-light" onClick={() => setMenu(!menu)} to="/login" >Login</NavLink>
                    </li>

                    <li>
                        <NavLink className="text-light" onClick={() => setMenu(!menu)} to="signup">Sign Up</NavLink>
                    </li>

                </div>

            </div>

        </>
    )
}

export default Header
