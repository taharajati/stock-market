import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ReferenceLine } from 'recharts';

const data = [
  { name: 1, value: 10 },
  { name: 2, value: 15 },
  { name: 3, value: 13 },
  { name: 4, value: 17 },
  { name: 5, value: 20 },
];

const annotationX = 5; // X value for the vertical line annotation


const TestChart = () => {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" type="number" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      <ReferenceLine x={annotationX} stroke="red" label="Annotation" />
    </LineChart>
  );
};

export default TestChart;
