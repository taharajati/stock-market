import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';


const MyReChartLine = ({ data, annotations, width, height, xInterval }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <LineChart width={width} height={height} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={xInterval} />
        <YAxis tickMargin={20} ali />
        
        <Tooltip />
        <Legend />
        {annotations.map((annotation, index) => (
          <ReferenceLine  
            key={index}
            x={annotation.x}
            stroke={annotation.color}
            label={{ position: 'top', value: annotation.label, fill: annotation.color, }}
            strokeDasharray={annotation.strokeDasharray}
            isFront={true}
          />
        ))}
        <Line type="linear" dataKey="value" stroke="green" dot={false} />
      </LineChart>
    </div>
  );
};

export default MyReChartLine;
