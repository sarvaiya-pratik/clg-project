import { Box, Step, StepLabel, Stepper } from '@mui/material';
import React from 'react'
import "./orderdetails.css"
const OrderSteps = ({mystep}) => {
    const steps = [
        'Placed',
        'Order Confirmed',
        'Shipped',
        'Out For Delivery',
        'Delivered'
    ];
    return (
        <Box sx={{ width: '100%'}} >
            <Stepper  activeStep={mystep} alternativeLabel >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    )
}

export default OrderSteps