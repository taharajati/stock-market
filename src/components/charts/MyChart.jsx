import React from 'react';
import MyReChartLine from './MyReChartLine';

const MyChart = ({ chartData, showChart, setShowChart }) => {
  const handleChartClick = async () => {
    // ... handle chart click logic, if needed
    setShowChart(true); // Use the state updater function
  };

  return (
    <div>
      <button onClick={handleChartClick}>Open Chart</button>
      {chartData && showChart && <MyReChartLine chartData={chartData} width={800} height={400} />}
    </div>
  );
};

export default MyChart;