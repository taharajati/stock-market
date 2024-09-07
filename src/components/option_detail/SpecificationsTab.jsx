// SpecificationsTab.js
import React from 'react';

const SpecificationsTab = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  // Provide default values if any of these properties are missing
  const {
    currentPrice = 0,
    high = 0,
    low = 0,
    volume = 0,
    open = 0,
    close = 0,
    change = 0,
    changePercent = 0
  } = data;

  return (
    <div>
      <h2 className="text-lg font-semibold">Specifications</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-bold">Current Price:</span>
          <span>${currentPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Change:</span>
          <span className={change >= 0 ? 'text-green-500' : 'text-red-500'}>
            {change >= 0 ? '+' : ''}${change.toFixed(2)} ({changePercent.toFixed(2)}%)
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">High:</span>
          <span>${high.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Low:</span>
          <span>${low.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Volume:</span>
          <span>{volume.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Open:</span>
          <span>${open.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Close:</span>
          <span>${close.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default SpecificationsTab;
