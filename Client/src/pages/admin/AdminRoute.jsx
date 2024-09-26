import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Admin from './Admin';
import axios from 'axios';
import Loader from '../../common/Loader/Loader';

const AdminRoute = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const response = await axios.get('/users/checkadmin', { withCredentials: true });
                if (response.status === 200) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error('Error checking admin:', error);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdmin();
    }, []);

    if (loading) {
        // You can render a loading indicator while checking admin status
        return <Loader/>;
    }

    if (isAdmin) {
        return <Admin />;
    } else {
        return <Navigate to="/adminlogin" replace />;
    }
}

export default AdminRoute;
