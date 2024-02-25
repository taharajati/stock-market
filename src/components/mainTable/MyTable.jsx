import React, { useEffect, useState } from 'react';
import DataFilter from './DataFilter';
import MyChart from '../charts/MyChart';
import Modal from './Modal';
import SortableTableHeader from './SortableTableHeader';

const MyTable = ({ filterValues }) => {
  const [intradata, setIntradata] = useState();
  const [data, setData] = useState();
  const [selectedGroup, setSelectedGroup] = useState('summary');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState([]);
  const [validGroups, setValidGroups] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null)
  const [selectedInstrumentId, setSelectedInstrumentId] = useState(null); // Add this line
  const [sortCriteria, setSortCriteria] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');


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
        // Fetch chart data from your API
        const chartResponse = await fetch(`https://api.optionscreener.ir/api/options/chart?instrument_id=${selectedInstrumentId}`); // Replace 'YOUR_CHART_API_URL' with the actual API URL
        if (!chartResponse.ok) {
          throw new Error(`HTTP error! Status: ${chartResponse.status}`);
        }

        const chartDataFromAPI = await chartResponse.json();

        setChartData({
          data: chartDataFromAPI.data,
          annotations: chartDataFromAPI.annotations,
          width: chartDataFromAPI.width,
          height: chartDataFromAPI.height,
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
        // Handle error accordingly
      }
    };

    fetchChartData();
  }, [selectedInstrumentId]); // Empty dependency array to fetch data only once on component mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!intradata || !data || !data.groups || !data.groupscolumn) {
    return <div>No data available</div>;
  }
// Add a function to format numbers with a thousand separator
const formatNumberWithSeparator = (number) => {
  return number.toLocaleString();
};
  const filteredData = DataFilter({
    intradata,
    filterValues,
    columns,
  });

  
  // Sorting function
  const sortData = (data, criteria, order) => {
    return data.sort((a, b) => {
      const valueA = typeof a[criteria] === 'number' ? a[criteria] : a[criteria]?.toLowerCase();
      const valueB = typeof b[criteria] === 'number' ? b[criteria] : b[criteria]?.toLowerCase();

      if (order === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  };

  // Handle sorting button click
  const handleSort = (criteria) => {
    if (sortCriteria === criteria) {
      // Toggle sorting order if the same criteria is clicked again
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sorting criteria and default to ascending order
      setSortCriteria(criteria);
      setSortOrder('asc');
    }
  };

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
    {data && data.groups && data.groups[groupKey] ? data.groups[groupKey] : 'Unknown Group'}
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
      <SortableTableHeader
        key={index}
        column={{ fieldName: column, farsiName: data.fields[column] }}
        criteria={sortCriteria}
        order={sortOrder}
        onSort={handleSort}
      />
    ))}
    <th className="py-2 px-4 border border-[#343434] w-20"></th>
  </tr>
</thead>
            <tbody>
              {filteredData.length > 0 ? (
                sortData(filteredData, sortCriteria, sortOrder).map((item, itemIndex) => (
                  <tr
                    key={itemIndex}
                    className={itemIndex % 2 === 0 ? 'bg-gray-100 ' : 'bg-white'}
                    onMouseEnter={() => setHoveredRowIndex(itemIndex)}
                    onMouseLeave={() => setHoveredRowIndex(null)}
                  >
                    {columns.map((column, columnIndex) => (
                      <td key={columnIndex} className="py-2 px-4 border border-gray-800">
                        {item[column] instanceof Date
                          ? item[column].toLocaleDateString()
                          : typeof item[column] === 'number'
                          ? formatNumberWithSeparator(item[column])
                          : item[column]}
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
            <MyChart
              data={chartData.data}
              annotations={chartData.annotations}
              width={chartData.width}
              height={chartData.height}
            />
          ) : (
            <div>No chart data available.</div>
          )}
        </Modal>
      )}
    </div>
  );
};


export default MyTable;
