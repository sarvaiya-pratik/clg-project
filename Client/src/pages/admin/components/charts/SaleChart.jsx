import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const SaleChart = ({ totalSalesByMonth }) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Sales Analysis',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novamber', 'December'];
    // const myDataValues = [500, 800, 1200, 900, 1100, 1300, 1500, 200, 1000, 1100, 300, 500];
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Sales',
                // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                data: totalSalesByMonth,
                backgroundColor: '#4883b6',
            }
            // {
            //     label: 'Dataset 2',
            //     data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
            // },
        ],
    };


    return <Bar options={options} data={data} />;
}

export default SaleChart
