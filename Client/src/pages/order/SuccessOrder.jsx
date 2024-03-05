import React from 'react'
import { GiConfirmed } from 'react-icons/gi'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'

const SuccessOrder = () => {

    const { reference } = useParams()
    const navigate = useNavigate()
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', flexDirection: 'column' }}>
                <h3> Order Successful <GiConfirmed color='green' /> </h3>
                <p>Reference No : {reference}</p>
                <Button color='primary' variant='contained' onClick={() => navigate("/profile/orders")} >Check Order</Button>
            </div></>
    )
}

export default SuccessOrder