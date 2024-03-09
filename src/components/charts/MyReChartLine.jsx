// MyReChartLine.jsx

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';

const MyReChartLine = ({ chartData, width, height }) => {
  if (!chartData || !chartData.data || chartData.data.length === 0) {
    return <div>No chart data available.</div>;
  }

  const { data, annotations } = chartData;
  console.log(annotations);

  return (
    <div>
      <LineChart width={width} height={height} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tickMargin={5} />
        <YAxis tickMargin={45} />
        <Tooltip />
        <Legend />
        <Line type="linear" dataKey="value" stroke="green" dot={false} />

        {/* Include annotations within the LineChart */}
        {annotations && annotations.length > 0 && annotations.map((annotation, index) => (
          <ReferenceLine
            key={index}
            x={annotation.x}  // Make sure this value corresponds to an existing "name" value in your data
            label={annotation.label}
            stroke={annotation.color}
            strokeDasharray={annotation.strokeDasharray}
          />
        ))}
      </LineChart>
    </div>
  );
};

export default MyReChartLine;
