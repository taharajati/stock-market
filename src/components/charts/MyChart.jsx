// MyChart.js
import React from 'react';
import MyReChartLine from './MyReChartLine';

const MyChart = () => {
  // Manually define LineChart data
  const lineChartData = {
    width: 600,
    height: 300,
    data: [
      { "name": 1, "value": 10 },
      { "name": 2, "value": 20 },
      { "name": 3, "value": 15 },
      { "name": 4, "value": 25 },
      { "name": 5, "value": 18 },
      // ... other data points
    ],
    annotations: [
      { "x": 3, "color": "red", "label": "Annotation 1", "strokeDasharray":"3 3" },
      { "x": 4, "color": "blue", "label": "Annotation 2", "strokeDasharray":"3 3"},
      // ... other annotations
    ]
  };

  return (
    <MyReChartLine 
      data={lineChartData.data}
      annotations={lineChartData.annotations}
      width={lineChartData.width}
      height={lineChartData.height}
    />
  );
};

export default MyChart;
