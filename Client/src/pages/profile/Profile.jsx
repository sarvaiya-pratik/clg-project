
import "./style.css"
import { Avatar } from '@mui/material'
import { BiSolidRightArrow } from 'react-icons/bi'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { RiLogoutBoxFill } from "react-icons/ri";

import PlaceIcon from '@mui/icons-material/Place';
import { useState } from "react";
import dayjs from "dayjs";
import EditProfile from "./EditProfile";
import DeliveryAddress from "./DeliveryAddress";
import MyOrder from "./MyOrder";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
import Cookies from "js-cookie";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Profile = () => {


    const [action, setAction] = useState("edit-profile")

    const user = useSelector((state) => state.user.users)
    const dispatch = useDispatch()
const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        Cookies.remove('jwt')
        window.open("http://localhost:5050/users/logout", "_self")
    }


    return (
        <div id="profiles">
            <div className="profile-heading">
                <h2>My Account</h2>
            </div>

            <div className="main-containers">
                <div className="left-side">
                    <li className='top' onClick={() => navigate("/profile")} style={{ cursor: 'pointer' }}>
                        <Avatar src={user && user.image} />
                        <div>
                            <h3>{user && user.name}</h3>
                            <p>{user && user.email}</p>
                        </div>
                        <BiSolidRightArrow />
                    </li>

                    <li >
                        <NavLink to="/profile/orders" onClick={() => setAction('my-order')} >
                            <LocalMallIcon />
                            My Orders
                        </NavLink>
                    </li>

                    <li >
                        <NavLink to="/profile/address" onClick={() => setAction('address')}>
                            <PlaceIcon />
                            Delivery Address
                        </NavLink>
                    </li>

                    <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
                        <NavLink>

                        <RiLogoutBoxFill size={22} />
                        Sign Out
                        
                        </NavLink>
                        </li>
                </div>
        <Outlet/>
                {/* {
                    action == "edit-profile" && <EditProfile />

                }
                {
                    action == "address" && <DeliveryAddress action={action} />
                }
                {
                    action == "my-order" && <MyOrder />
                } */}

            </div>
        </div>
    )
}

export default Profile