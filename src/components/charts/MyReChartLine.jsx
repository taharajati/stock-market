// MyReChartLine.jsx
/*
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
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="name" tickMargin={5} />
        <YAxis tickMargin={45} />
        <Tooltip />
        <Legend />
        <Line type="linear" dataKey="value" stroke="green" dot={false} />

        //{ Include annotations within the LineChart }
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
*/


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
  ResponsiveContainer,
} from 'recharts';

const MyReChartLine = ({ chartData, width, height }) => {
  if (!chartData || !chartData.data || chartData.data.length === 0) {
    return <div>No chart data available.</div>;
  }

  const { data, annotations } = chartData;

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <ResponsiveContainer width={width || '100%'} height={height || 400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis
            dataKey="name"
            tickMargin={10}
            tick={{ fontSize: 12, fontWeight: 500, fill: '#666' }}
            axisLine={{ stroke: '#888' }}
          />
          <YAxis
            tickMargin={45}
            tick={{ fontSize: 12, fontWeight: 500, fill: '#666' }}
            axisLine={{ stroke: '#888' }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', borderRadius: 5, border: 'none' }}
            itemStyle={{ color: '#fff' }}
            cursor={{ stroke: 'rgba(0, 0, 0, 0.1)', strokeWidth: 2 }}
          />
          <Legend verticalAlign="top" align="right" iconType="circle" />
          <Line
            type="linear"
            dataKey="value"
            stroke="#82ca9d"
            strokeWidth={3}
            dot={false}
            //dot={{ stroke: '#82ca9d', strokeWidth: 2, fill: '#fff' }}
            //activeDot={{ r: 8 }}
            animationDuration={500}
          />

          {/* Include annotations within the LineChart */}
          {annotations && annotations.length > 0 && annotations.map((annotation, index) => (
            <ReferenceLine
              key={index}
              x={annotation.x}
              label={{ position: 'top', value: annotation.label, fill: annotation.color, fontSize: 12, fontWeight: 500 }}
              stroke={annotation.color}
              strokeDasharray={annotation.strokeDasharray || "3 3"}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyReChartLine;
