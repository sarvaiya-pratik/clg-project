import { useEffect, useState } from 'react'
import "./style.css"
import { Link, scroller } from "react-scroll"
import { useLocation, useNavigate } from "react-router-dom"
import { Link as NavLink } from 'react-router-dom'
import axios from 'axios'
import logo from "./mrps.png"

import Badge from '@mui/material/Badge';
import { Avatar } from '@mui/material'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/auth/authSlice'
import { getusercurrent } from '../../redux/user/userApi'
import { getUserCart } from '../../redux/cart/cartApi'

import { IoBagHandleOutline } from "react-icons/io5";

const Header = () => {
    const location = useLocation()

    const isHomePage = location.pathname === '/';
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        const from = searchParams.get('from');
        const section = searchParams.get('section');


        if (from != "home") {
            scroller.scrollTo(section, {
                duration: 400,
                delay: 0,
                smooth: 'easeInOutQuart'

            });
        }
        scroller.scrollTo("home", {
            duration: 400,
            delay: 0,
            smooth: 'easeInOutQuart'
        })
    }, [location]);



    const [menu, setMenu] = useState(false)
    const [position, setPosition] = useState(window.scrollY)
    const [visible, setVisible] = useState(false)

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        navigate('/profile')
    };

    const dispatch = useDispatch()

    const user = useSelector((state) => state.user.users)
    if (user) {
        localStorage.setItem('user', JSON.stringify(user))
    }
    const cart = useSelector((state) => state.cart.cart)
    useEffect(() => {
        dispatch(getusercurrent())
        dispatch(getUserCart())

    }, [])

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
        dispatch(logout())
        localStorage.removeItem('user')
        window.open("http://localhost:5050/users/logout", "_self")
    }


    const handleMobileLogout = () => {
    }
    return (
        <>
            <header id='mynav' className={`${cls} `}>
                <div className='left' >
                    <img src={logo} alt="" style={{ width: '120px', height: '80px' }} onClick={() => navigate("/")} />
                </div>
                <div className="mobile-nav">

                    <label className="hamburger">
                        <input type="checkbox" checked={menu} />
                        <svg viewBox="0 0 32 32" onClick={() => setMenu(!menu)}>
                            <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                            <path className="line" d="M7 16 27 16"></path>
                        </svg>
                    </label>

                </div>

                <div className="middle">
                    <li>

                        <NavLink to="/">

                            <span className="btn-txt"> Home</span>

                        </NavLink>
                    </li>
                    <li>
                        {
                            isHomePage ?
                                <Link to='about'>
                                    <span className="btn-txt">About</span>
                                </Link>

                                :

                                <NavLink to="/?from=stones&section=about" >
                                    <span className="btn-txt">About</span>
                                </NavLink>

                        }
                    </li>

                    <li>
                        {
                            isHomePage ?

                                <Link to='service'>

                                    <span className="btn-txt">Services</span>

                                </Link>

                                :
                                <NavLink to="/?from=stones&section=service" >
                                    <span className="btn-txt">Services</span>
                                </NavLink>
                        }
                    </li>
                    <li>

                        <NavLink to="/stones" >

                            <span className="btn-txt">Stones</span>

                        </NavLink>
                    </li>
                </div>

                <div className='rights'>

                    {user ?
                        < >
                            <button className='cartBtn' >
                                <NavLink to="/cart">

                                    <Badge color="primary" badgeContent={cart ? cart.totalItem : 0}>
                                        <IoBagHandleOutline size={28} />
                                    </Badge>
                                </NavLink>
                            </button>
                            <div>

                                <Avatar alt="Remy Sharp" src={user.image}
                                    id="fade-button"
                                    aria-controls={open ? 'fade-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                />

                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}

                                >
                                    {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>



                            </div>

                        </>

                        :
                        //  <button className="button5 " id='join-btn' >
                        //     <span className="btn-txt"> <NavLink to="/login">JOIN US </NavLink></span>
                        // </button>
                        <NavLink to="/login" style={{ textDecoration: "none" }} >

                            <span className="btn-txt">JOIN NOW</span>

                        </NavLink>
                    }


                </div>

            </header>


            {/* Sidebar for mobile   */}

            <div className={`sidebar  ${menu && "showsidebar"} `}>
                <div className="middle">

                    <span className="btn-txt">
                        <NavLink className="text-light" onClick={() => setMenu(!menu)} to="/">Home</NavLink>
                    </span>



                    <span className="btn-txt">
                        <Link to="about" onClick={() => setMenu(!menu)} className='text-light'>About</Link>
                    </span>





                    <span className="btn-txt">
                        <Link to="service" onClick={() => setMenu(!menu)} className='text-light'>Service</Link>

                    </span>





                    <span className="btn-txt">
                        <NavLink className="text-light" onClick={() => setMenu(!menu)} to="/stones">Stones</NavLink>

                    </span>



                </div>

                <hr />

                <div className='right' style={{ textAlign: 'center' }}>

                    {
                        user ?
                            <>

                                <li style={{ listStyle: 'none' }}>

                                    <span className="btn-txt">
                                        <NavLink className="text-light" onClick={() => setMenu(!menu)} to="/cart" >My Cart</NavLink>

                                    </span>

                                </li>
                                <li style={{ listStyle: 'none' }}>

                                    <span className="btn-txt">
                                        <NavLink className="text-light" onClick={handleMobileLogout} to="/" >Logout</NavLink>

                                    </span>

                                </li>
                            </>
                            :
                            <li>

                                <span className="btn-txt">
                                    <NavLink className="text-light" onClick={() => setMenu(!menu)} to="/login" >Join Now</NavLink>

                                </span>

                            </li>

                    }



                    {/* <li>
                        <button className="button6 type1">
                            <span className="btn-txt">
                                <Link className="text-light" onClick={() => setMenu(!menu)} to="signup">Sign Up</Link>

                            </span>
                        </button>


                    </li> */}

                </div>

            </div>

        </>
    )
}

export default Header
