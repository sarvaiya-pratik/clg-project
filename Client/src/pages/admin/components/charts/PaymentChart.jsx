import React from 'react'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJs.register(ArcElement, Legend, Tooltip)
const PaymentChart = ({whatPayment}) => {
    let pendingPayments = 3000
    let successfulPayments = 1000
    const data = {
        labels: ['Pending Payments', 'Successful Payments'],
        datasets: [
            {
                label: 'Payments',
                data: [whatPayment?.pendingPyment, whatPayment?.succesPyment],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            },
        ],
    };
    return (
        <>
            
                {/* <h2>Payment Status</h2> */}
                <Pie data={data} />
          

        </>
    )
}

export default PaymentChart