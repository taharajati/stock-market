// DiagramTab.js
import React from 'react';
import PriceChart from './CandlestickChart'; // Adjust the path as needed

const DiagramTab = ({ data }) => (
  <div>
    <h2 className="text-lg font-semibold">نمودار</h2>
    <PriceChart data={data} />
  </div>
);

export default DiagramTab;