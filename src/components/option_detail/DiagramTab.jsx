// DiagramTab.js
import React from 'react';
import PriceChart from './PriceChart'; // Adjust the path as needed

const DiagramTab = ({ data }) => (
  <div>
    <h2 className="text-lg font-semibold">Diagram</h2>
    <PriceChart data={data} />
  </div>
);

export default DiagramTab;