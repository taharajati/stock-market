import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import Chart directly from chart.js

const MyChart = ({ data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      try {
        const newChartInstance = new Chart(chartRef.current, {
          type: 'line',
          data: data,
          options: options,
        });
  
        // Cleanup previous chart before creating a new one
        return () => {
          newChartInstance.destroy();
        };
      } catch (error) {
        console.error('Error creating chart:', error);
      }
    }
  }, [data, options]);

  return <canvas ref={chartRef} />;
};

export default MyChart;
