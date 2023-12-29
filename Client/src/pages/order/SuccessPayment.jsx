import React from 'react'
import { GiConfirmed } from "react-icons/gi";
import { BiRightArrow } from 'react-icons/bi'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@mui/material';
const SuccessPayment = () => {

    const searchQuery = useSearchParams()[0]

    const referenceNum = searchQuery.get("reference")

    const navigate = useNavigate()
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', flexDirection: 'column' }}>
                <h3> Order Successful <GiConfirmed color='green' /> </h3>
                <p>Reference No : {referenceNum}</p>
                <Button color='primary' variant='contained' onClick={() => navigate("/profile/orders")} >Check Order</Button>
            </div>
        </>
    )
}

export default SuccessPayment