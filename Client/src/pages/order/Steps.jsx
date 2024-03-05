import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Cart',
  'Delivery Address',
  'Payment',
];

export default function HorizontalLinearAlternativeLabelStepper({mystep}) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={mystep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}