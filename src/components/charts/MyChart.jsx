import React from 'react';
import { Line } from 'react-chartjs-2';

const MyChart = ({ chartData, chartOptions }) => {
  return (
    <div className="chart-container">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default MyChart;