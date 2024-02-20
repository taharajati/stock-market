// MyTable.js
import React, { useEffect, useState } from 'react';
import DataFilter from './DataFilter';
import MyChart from '../charts/MyChart'; // Import the Chart component
import { Line } from 'react-chartjs-2';
import Modal from './Modal'; // Import the Modal component

const MyTable = ({ filterValues }) => {
  const [intradata, setIntradata] = useState();
  const [data, setData] = useState();
  const [selectedGroup, setSelectedGroup] = useState('summary');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState([]);
  const [validGroups, setValidGroups] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [selectedInstrumentId, setSelectedInstrumentId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch intradatacols
        const intradatacolsResponse = await fetch('https://api.optionscreener.ir/api/options/intradatacols');
        if (!intradatacolsResponse.ok) {
          throw new Error(`HTTP error! Status: ${intradatacolsResponse.status}`);
        }

        const intradatacolsData = await intradatacolsResponse.json();
        console.log('API Response for intradatacols:', intradatacolsData);
        setData(intradatacolsData);

        const groups = Object.keys(intradatacolsData.groups);
        setValidGroups(groups);

        const initialColumns = intradatacolsData.groupscolumn[selectedGroup] || [];
        setColumns(initialColumns);

        if (!groups.includes(selectedGroup)) {
          console.error(`Invalid selectedGroup: ${selectedGroup}`);
          return;
        }

        // Fetch intradata
        const intradataResponse = await fetch('https://api.optionscreener.ir/api/options/intradata');
        if (!intradataResponse.ok) {
          throw new Error(`HTTP error! Status: ${intradataResponse.status}`);
        }

        const intradataData = await intradataResponse.json();
        console.log('API Response for intradata:', intradataData);

        setIntradata(intradataData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message || 'An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedGroup, filterValues.filter04]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        if (selectedInstrumentId) {
          const chartResponse = await fetch(`https://api.optionscreener.ir/api/options/chart?instrument_id=${selectedInstrumentId}`);
          if (!chartResponse.ok) {
            throw new Error(`HTTP error! Status: ${chartResponse.status}`);
          }
    
          const chartDataFromAPI = await chartResponse.json();
    
          // Use the actual data fetched from the API
          setChartData({
            labels: chartDataFromAPI.ChartData.labels,
            datasets: [{
              label: chartDataFromAPI.ChartData.datasets[0].label,
              data: chartDataFromAPI.ChartData.datasets[0].data,
              fill: chartDataFromAPI.ChartData.datasets[0].fill,
              borderColor: chartDataFromAPI.ChartData.datasets[0].borderColor,
            }],
          });
    
          // Extracting necessary information from API response
          const { options } = chartDataFromAPI;
          const dynamicChartOptions = {
            responsive: options.responsive,
            maintainAspectRatio: options.maintainAspectRatio,
            scales: options.scales,
            annotation: options.annotation,
          };
    
          setChartOptions(dynamicChartOptions);
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
        // Handle error accordingly
      }
    
    };
    fetchChartData();
  }, [selectedGroup, filterValues.filter04, selectedInstrumentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!intradata || !data || !data.groups || !data.groupscolumn) {
    return <div>No data available</div>;
  }

  const filteredData = DataFilter({
    intradata,
    filterValues,
    columns,
  });

  return (
    <div className="container mt-4 mx-auto p-4" dir="rtl">
      <div className="flex items-center justify-between mb-3 ">
        <div className="space-x-1">
          {validGroups.map((groupKey) => (
            <button
              key={groupKey}
              type="button "
              className={`btn ${selectedGroup === groupKey ? 'px-4 py-2 bg-[#2F657D] text-white rounded-lg scale-105 transition duration-500' : 'px-3 py-1 bg-[#F4F2F2] rounded-md'}`}
              onClick={() => setSelectedGroup(groupKey)}
            >
              {data.groups[groupKey]}
            </button>
          ))}
        </div>
      </div>

      <div className="m-2 items-center w-[1400px]">
        <div className="table-container overflow-x-auto overflow-y-auto" style={{ maxWidth: '2000px', maxHeight: '500px' }}>
          <table className="table-auto w-full border-collapse border border-gray-800" style={{ width: '100%' }}>
               <thead className="bg-[#2F657D] text-white sticky top-0">
                 <tr>
                   {columns.map((column, index) => (
                     <th key={index} className="py-2 px-4 border border-[#343434]">
                       {data.fields[column]}
                     </th>
                   ))}
                   <th className="py-2 px-4 border border-[#343434] w-20"></th>
                 </tr>
               </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, itemIndex) => (
                  <tr
                    key={itemIndex}
                    className={itemIndex % 2 === 0 ? 'bg-gray-100 ' : 'bg-white'}
                    onMouseEnter={() => setHoveredRowIndex(itemIndex)}
                    onMouseLeave={() => setHoveredRowIndex(null)}
                  >
                    {columns.map((column, columnIndex) => (
                      <td key={columnIndex} className="py-2 px-4 border border-gray-800">
                        {item[column] instanceof Date ? item[column].toLocaleDateString() : item[column]}
                      </td>
                    ))}
                    <td className="py-2 px-4 border border-gray-800">
                      {hoveredRowIndex === itemIndex && (
                   <span
                   className="cursor-pointer"
                   onClick={() => {
                     setSelectedInstrumentId(item['instrument_id']);
                     setShowChart(true);
                   }}
                 >
                   📊
                 </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="py-2 px-4 border border-gray-800">
                    No matching data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showChart && (
  <Modal onClose={() => setShowChart(false)}>
    {chartData ? (
      <MyChart data={chartData} options={chartOptions} />
    ) : (
      <div>No chart data available.</div>
    )}
  </Modal>
)}
      
    </div>
  );
};

export default MyTable;