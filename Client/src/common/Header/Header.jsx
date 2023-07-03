import React, { useContext, useEffect, useState } from 'react'
import "./style.css"
import { ThemeContext } from '../../Global-Component/ThemeProvide'
import { BiMoon, BiSun, BiMenu } from "react-icons/bi"
import { NavLink } from "react-router-dom"


const Header = () => {
    const { theme, setThemeMode } = useContext(ThemeContext);
    const [darkMod, setDarkMod] = useState(theme)
    const [menu, setMenu] = useState(false)


    useEffect(() => {
        setThemeMode(darkMod);
    })
    return (
        <>
        
                <header id='mynav' className={darkMod?"bg-dark text-light":"bg-light text-dark"}>
                    <div className='left'>
                        <h4>Logo</h4>
                    </div>

                    <div className="mobile-nav">
                        <div onClick={() => setDarkMod(!darkMod)} style={{ cursor: "pointer" }}>
                            {darkMod ? <BiSun fontSize={"2rem"} /> : <BiMoon fontSize={"2rem"} style={{ color: "Black" }} />}
                        </div>
                        <div className={`${!darkMod && "text-dark"}`}><BiMenu fontSize={'2rem'} onClick={() => setMenu(!menu)} /></div>
                    </div>


                    <div className="middle">
                        <li>
                            <NavLink className={darkMod && "text-light"} to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink className={darkMod && "text-light"} to="/about">About</NavLink>
                        </li>
                        <li>
                            <NavLink className={darkMod && "text-light"} to="/fature" >Fature</NavLink>
                        </li>
                    </div>

                    <div className='right'>
                        <li>
                            <NavLink className={darkMod && "text-light"} to="/login" >Login</NavLink>
                        </li>

                        <li>
                            <NavLink className={darkMod && "text-light"} to="signup">Sign Up</NavLink>
                        </li>

                        <li onClick={() => setDarkMod(!darkMod)} style={{ cursor: "pointer" }}>
                            {darkMod ? <BiSun fontSize={"1.7rem"} /> : <BiMoon fontSize={"1.7rem"} style={{ color: "Black" }} />}
                        </li>
                    </div>

                </header>
            

            {/* Sidebar for mobile   */}

            <div className={`sidebar ${menu && "showsidebar"} ${darkMod?"bg-dark-2 text-light":"bg-light-2 text-dark"}`}>
                <div className="middle">
                    <li>
                        <NavLink onClick={()=>setMenu(!menu)} className={darkMod && "text-light"} to="/">Home</NavLink>
                    </li>

                    <li>
                        <NavLink onClick={()=>setMenu(!menu)} className={darkMod && "text-light"}to="/about" >About</NavLink>
                    </li>

                    <li>
                        <NavLink onClick={()=>setMenu(!menu)}  className={darkMod && "text-light"} to="fature" >Fature</NavLink>
                    </li>
                </div>

                <hr />

                <div className='right'>
                        <li>
                        <NavLink onClick={()=>setMenu(!menu)}  className={darkMod && "text-light"} to="/login" >Login</NavLink>
                        </li>
                   
                   <li>
                        <NavLink onClick={()=>setMenu(!menu)} className={darkMod && "text-light"} to="signup">Sign Up</NavLink>
                   </li>
                   
                </div>

            </div>

        </>
    )
}

export default Header
