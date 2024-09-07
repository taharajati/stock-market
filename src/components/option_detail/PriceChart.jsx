// PriceChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register required components from Chart.js
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const formatChartData = (data) => {
    if (!data || !data.data) return { labels: [], datasets: [] };

    const labels = data.data.map(item => new Date(item.date.$date).toLocaleDateString());
    const prices = data.data.map(item => item.close);

    return {
        labels,
        datasets: [
            {
                label: 'Closing Price',
                data: prices,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };
};

const PriceChart = ({ data }) => {
    const chartData = formatChartData(data);

    return (
        <div>
            <h2>Price Chart</h2>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: (tooltipItem) => `$${tooltipItem.raw}`,
                            },
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Date',
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Price',
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default PriceChart;
