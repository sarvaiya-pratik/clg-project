import React, { useContext, useEffect, useState } from 'react'
import "./style.css"
import { BiMenu, BiUserCircle, BiCart } from "react-icons/bi"
import { NavLink } from "react-router-dom"
import {useCart} from "react-use-cart"


const Header = () => {

    const [menu, setMenu] = useState(false)

    const [position, setPosition] = useState(window.scrollY)
    const [visible, setVisible] = useState(false)

    const {items} = useCart()
   

    useEffect(() => {
        const handleScroll = () => {
            let moving = window.scrollY

            setVisible(position > moving);
            setPosition(moving)
        };
        window.addEventListener("scroll", handleScroll);
        return (() => {
            window.removeEventListener("scroll", handleScroll);
        })
    })
    const cls = visible ? "visible" : "hidden";

    const handleLogout = () => {

        localStorage.removeItem("uname")
        localStorage.removeItem("token")
        window.location.reload()

    }

    return (
        <>
            <header id='mynav' className={cls}>
                <div className='left'>
                    <img src="https://freepngimg.com/download/diamond/15-diamond-png-image.png" alt="" style={{ width: '60px', height: '60px' }} />
                </div>
                <div className="mobile-nav">

                    <label className="hamburger">
                        <input type="checkbox" />
                        <svg viewBox="0 0 32 32" onClick={() => setMenu(!menu)}>
                            <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                            <path className="line" d="M7 16 27 16"></path>
                        </svg>
                    </label>

                </div>

                <div className="middle">
                    <li>


                        <button className="button6 ">
                            <span className="btn-txt"> <NavLink to="/">Home</NavLink></span>
                        </button>
                    </li>
                    <li>


                        <button className="button6 ">
                            <span className="btn-txt"><a href="#about" >About</a></span>
                        </button>
                    </li>
                    <li>



                        <button className="button6 ">
                            <span className="btn-txt"><a href="#service" >Service</a></span>
                        </button>
                    </li>
                    <li>


                        <button className="button6 ">
                            <span className="btn-txt"><NavLink to="/stones" >Stones</NavLink></span>
                        </button>
                    </li>
                </div>

                <div className='rights'>
                    {!localStorage.getItem('uname') ?
                        <button className="button5 " style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                            <span className="btn-txt"> <NavLink to="/login">JOIN US</NavLink></span>
                        </button>
                        : ""}

                    {localStorage.getItem('uname') ?
                        <li className="menu-title">
                            <div className='userlogo'><span> {localStorage.getItem('uname').slice(0, 1).toUpperCase()} </span></div>
                            <div className="drop-con">
                                <button className="button5">
                                    <span className="btn-txt"> <NavLink to="/" onClick={handleLogout} style={{ fontSize: '1rem' }}>LOGOUT</NavLink></span>
                                </button>

                            </div>

                        </li>
                        : ""}
                    <button className='cartBtn' >

                        <NavLink to="/cart"><BiCart /><h4>{items && items.length}</h4></NavLink>
                    </button>










                </div>

            </header>


            {/* Sidebar for mobile   */}

            <div className={`sidebar  ${menu && "showsidebar"} `}>
                <div className="middle">
                    <li>
                        <button className="button6 type1">
                            <span className="btn-txt">
                                <NavLink className="text-light" onClick={() => setMenu(!menu)} to="/">Home</NavLink>
                            </span>
                        </button>

                    </li>

                    <li>
                        <button className="button6 type1">
                            <span className="btn-txt">
                                <a href="#about" onClick={() => setMenu(!menu)} className='text-light'>About</a>
                            </span>
                        </button>


                    </li>
                    <li>
                        <button className="button6 type1">
                            <span className="btn-txt">
                                <a href="#service" onClick={() => setMenu(!menu)} className='text-light'>Service</a>

                            </span>
                        </button>



                    </li>

                    <li>
                        <button className="button6 type1">
                            <span className="btn-txt">
                                <NavLink className="text-light" onClick={() => setMenu(!menu)} to="/stones">Stones</NavLink>

                            </span>
                        </button>

                    </li>
                </div>

                <hr />

                <div className='right'>
                    <li>
                        <button className="button6 type1">
                            <span className="btn-txt">
                                <NavLink className="text-light" onClick={() => setMenu(!menu)} to="/login" >Login</NavLink>

                            </span>
                        </button>
                    </li>


                    {/* <li>
                        <button className="button6 type1">
                            <span className="btn-txt">
                                <NavLink className="text-light" onClick={() => setMenu(!menu)} to="signup">Sign Up</NavLink>

                            </span>
                        </button>


                    </li> */}

                </div>

            </div>

        </>
    )
}

export default Header
