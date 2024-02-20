import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import Chart directly from chart.js

const MyChart = ({ chartData, chartOptions }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const newChartInstance = new Chart(chartRef.current, {
        type: 'line',
        data: chartData,
        options: chartOptions,
      });

      // Cleanup previous chart before creating a new one
      return () => {
        newChartInstance.destroy();
      };
    }
  }, [chartData, chartOptions]);

  return <canvas ref={chartRef} />;
};

export default MyChart;
