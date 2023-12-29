import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentUserHook } from '../../CustomeHook/Custom';
import Admin from './Admin';
import axios from 'axios';


const AdminRoute = ({ children }) => {

    const login = JSON.parse(localStorage.getItem('user'))

    if (login) {
        return (<Admin/>)
    }
    else {
        return <Navigate to='/login' replace />
    }
}

export default AdminRoute