// MyTable.js

import React, { useEffect, useState } from 'react';
import DataFilter from './DataFilter';
import MyChart from '../../charts/MyChart';
import Modal from './Modal';
import SortableTableHeader from './SortableTableHeader';
import CalculatorPopup from '../../Calculator/CalculatorPopup';
import DetailPopup from '../../option_detail/option_detail';
import { FaChartLine } from "react-icons/fa6";
import { IoMdCalculator } from "react-icons/io";
import { CgDetailsMore} from "react-icons/cg";

  const MyTable = ({ filterValues }) => {

  const OpenTSE = (instrumentCode) => {
      const url = `https://tsetmc.ir/instInfo/${instrumentCode}`; // Replace with your specific URL pattern
      window.open(url, '_blank'); // Opens the URL in a new tab
    };


    const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
    const [intradata, setIntradata] = useState();
    const [data, setData] = useState();
    const [selectedGroup, setSelectedGroup] = useState('summary');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [columns, setColumns] = useState([]);
    const [validGroups, setValidGroups] = useState([]);
    const [showChart, setShowChart] = useState(false);
    const [chartData, setChartData] = useState(null);
    const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
    const [selectedInstrumentId, setSelectedInstrumentId] = useState(null);
    const [sortCriteria, setSortCriteria] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [calculatorVisible, setCalculatorVisible] = useState(false);
    const [detailVisible, setDetailVisible] = useState(false);


    const columnStyles = {
      symbol_fa: { style: { textAlign: 'center', padding: '10px' } },
      a_factor: { style: { textAlign: 'center', padding: '10px' } },
      b_factor: { style: { textAlign: 'center', padding: '10px' } },
      c_factor: { style: { textAlign: 'center', padding: '10px' } },
      contract_size: { style: { textAlign: 'center', padding: '10px' } },
      today_return: { style: { textAlign: 'center', padding: '10px' } },
      strike_price_ua_price_difference: { style: { textAlign: 'center', padding: '10px' } },
      required_change_per_day: { style: { textAlign: 'center', padding: '10px' } },
      ua_final: { style: { textAlign: 'center', padding: '10px' } },
      ua_close: { style: { textAlign: 'center', padding: '10px' } },
      strike_price: { style: { textAlign: 'center', padding: '10px' } },
      end_date_fa: { style: { textAlign: 'center', padding: '10px' } },
      leverage: { style: { textAlign: 'center', padding: '10px' } },
      days_to_maturity: { style: { textAlign: 'center', padding: '10px' } },
      implied_volatility_sell_price: { style: { textAlign: 'center', padding: '10px' } },
      ua_instrument_symbol_fa: { style: { textAlign: 'center', padding: '10px' } },
      days_to_maturity_business_days: { style: { textAlign: 'center', padding: '10px' } },
      begin_date: { style: { textAlign: 'center', padding: '10px' } },
      end_date: { style: { textAlign: 'center', padding: '10px' } },
      industry_code: { style: { textAlign: 'center', padding: '10px' } },
      industry_name: { style: { textAlign: 'center', padding: '10px' } },
      instrument_code: { style: { textAlign: 'center', padding: '10px' } },
      instrument_id: { style: { textAlign: 'center', padding: '10px' } },
      average_spread: { style: { textAlign: 'center', padding: '10px' } },
      average_spread_percent_of_mid_price: { style: { textAlign: 'center', padding: '10px' } },
      bid_ask_spread_percent: { style: { textAlign: 'center', padding: '10px' } },
      bid_ask_spread_score: { style: { textAlign: 'center', padding: '10px' } },
      bs_price_to_buy_price: { style: { textAlign: 'center', padding: '10px' } },
      bs_price_to_sell_price: { style: { textAlign: 'center', padding: '10px' } },
      buy_positions: { style: { textAlign: 'center', padding: '10px' } },
      buy_price: { style: { textAlign: 'center', padding: '10px' } },
      close: { style: { textAlign: 'center', padding: '10px' } },
      final: { style: { textAlign: 'center', padding: '10px' } },
      high: { style: { textAlign: 'center', padding: '10px' } },
      implied_volatility_last: { style: { textAlign: 'center', padding: '10px' } },
      implied_volatility_max_all: { style: { textAlign: 'center', padding: '10px' } },
      implied_volatility_max_month: { style: { textAlign: 'center', padding: '10px' } },
      implied_volatility_mean_month: { style: { textAlign: 'center', padding: '10px' } },
      implied_volatility_min_all: { style: { textAlign: 'center', padding: '10px' } },
      implied_volatility_min_month: { style: { textAlign: 'center', padding: '10px' } },
      implied_volatility_rank: { style: { textAlign: 'center', padding: '10px' } },
      implied_volatility_to_average_month: { style: { textAlign: 'center', padding: '10px' } },
      implied_volatility_to_same_ua_implied_volatility_percent: { style: { textAlign: 'center', padding: '10px' } },
      implied_volatility_vs_realized_volatility_month: { style: { textAlign: 'center', padding: '10px' } },
      intrinsic_value_bs: { style: { textAlign: 'center', padding: '10px' } },
      is_tab: { style: { textAlign: 'center', padding: '10px' } },
      liquidity_score: { style: { textAlign: 'center', padding: '10px' } },
      low: { style: { textAlign: 'center', padding: '10px' } },
      open: { style: { textAlign: 'center', padding: '10px' } },
      notional_value: { style: { textAlign: 'center', padding: '10px' } },
      old: { style: { textAlign: 'center', padding: '10px' } },
      open_interest_score: { style: { textAlign: 'center', padding: '10px' } },
      option_status: { style: { textAlign: 'center', padding: '10px' } },
      option_type: { style: { textAlign: 'center', padding: '10px' } },
      option_type_fa: { style: { textAlign: 'center', padding: '10px' } },
      probability_of_profit: { style: { textAlign: 'center', padding: '10px' } },
      put_call_ratio: { style: { textAlign: 'center', padding: '10px' } },
      rho: { style: { textAlign: 'center', padding: '10px' } },
      theta: { style: { textAlign: 'center', padding: '10px' } },
      delta: { style: { textAlign: 'center', padding: '10px' } },
      gamma: { style: { textAlign: 'center', padding: '10px' } },
      vega: { style: { textAlign: 'center', padding: '10px' } },
      same_ua_average_implied_volatility: { style: { textAlign: 'center', padding: '10px' } },
      sell_positions: { style: { textAlign: 'center', padding: '10px' } },
      sell_price: { style: { textAlign: 'center', padding: '10px' } },
      trades_count: { style: { textAlign: 'center', padding: '10px' } },
      ua_instrument_code: { style: { textAlign: 'center', padding: '10px' } },
      ua_instrument_id: { style: { textAlign: 'center', padding: '10px' } },
      ua_instrument_symbol_fa: { style: { textAlign: 'center', padding: '10px' } },
      ua_volatility_day: { style: { textAlign: 'center', padding: '10px' } },
      ua_volatility_week: { style: { textAlign: 'center', padding: '10px' } },
      ua_volatility_year: { style: { textAlign: 'center', padding: '10px' } },
      ua_volume: { style: { textAlign: 'center', padding: '10px' } },
      ua_volume_count: { style: { textAlign: 'center', padding: '10px' } },
      volatility_skew_horizontal: { style: { textAlign: 'center', padding: '10px' } },
      volatility_skew_horizontal_value: { style: { textAlign: 'center', padding: '10px' } },
      volatility_skew_vertical: { style: { textAlign: 'center', padding: '10px' } },
      volatility_skew_vertical_value: { style: { textAlign: 'center', padding: '10px' } },
      volume: { style: { textAlign: 'center', padding: '10px' } },
      volume_count: { style: { textAlign: 'center', padding: '10px' } },
      volume_score: { style: { textAlign: 'center', padding: '10px' } },
  };

    const getCellStyle = (columnName, value) => {
        let baseStyle = columnStyles[columnName]?.style || {};

        // Example conditional styling logic
        if (columnName === 'delta' && value < 0) {
            return { ...baseStyle, backgroundColor: 'red' };
        } else if (columnName === 'delta' && value >= 0) {
            return { ...baseStyle, color: 'lightgreen' };
        } else if (columnName === 'bs_price_to_buy_price' && value >= 0) {
            return { ...baseStyle, color: 'rgb(102,43,50)' ,backgroundColor:'rgb(196,132,146)'};
        } else if (columnName === 'bs_price_to_buy_price' && value < 0) {
            return { ...baseStyle, color: 'rgb(40,102,50)' ,backgroundColor:'rgb(163,240,173)' };
        } else if (columnName === 'bs_price_to_sell_price' && value >= 0) {
            return { ...baseStyle, color: 'rgb(34, 139, 34)' ,backgroundColor:'rgb(144, 238, 144)'};
        } else if (columnName === 'bs_price_to_sell_price' && value < 0) {
            return { ...baseStyle, color: 'rgb(139, 0, 0)' ,backgroundColor:'rgb(255, 99, 71)' };
        }  else if (columnName === 'today_return' && value >=0) {
            return { ...baseStyle, color: 'rgb(20,180,20)',fontWeight:'bold'}; //,backgroundColor:'rgb(163,240,173)'

        }  else if (columnName === 'today_return' && value < 0) {
            return { ...baseStyle, color: 'rgb(180,20,50)', fontWeight:'bold'}; //,backgroundColor:'rgb(196,132,146)'
            }
         else if (columnName === 'bid_ask_spread_percent' && value >=0) {
            return { ...baseStyle, color: 'rgb(20,180,20)',fontWeight:'bold' //,backgroundColor:'rgb(163,240,173)'
             }
        }  else if (columnName === 'bid_ask_spread_percent' && value < 0) {
            return { ...baseStyle, color: 'rgb(180,20,50)', fontWeight:'bold' //,backgroundColor:'rgb(196,132,146)'
            };
        }else if (columnName === 'option_status' && value ==='ITM') {
            return { ...baseStyle, color: 'rgb(40,102,50)' ,backgroundColor:'rgb(163,240,173)'
            };
        }else if (columnName === 'option_status' && value ==='OTM') {
            return { ...baseStyle, color: 'rgb(102,43,50)' ,backgroundColor:'rgb(196,132,146)'
            };
        }
        else if (columnName === 'option_status' && value ==='ATM') {
            return { ...baseStyle, color: 'rgb(150,150,150)' ,backgroundColor:'rgb(100,100,100)'
            };
        }


        return baseStyle; // Return the base style if no condition matches
    };

    const handlePostRequest = async (selectedRowData) => {
      try {
          const postData = {
              stock: [],
              options: [
                  {
                      option_type: selectedRowData.option_type,
                      premium: selectedRowData.buy_price,
                      strike_price: selectedRowData.strike_price,
                      position: 'buyer',
                  },
              ],
          };

          const postResponse = await fetch(`https://api.optionscreener.ir/api/options/chart`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(postData),
          });

          if (!postResponse.ok) {
              throw new Error(`HTTP error! Status: ${postResponse.status}`);
          }

          const responseData = await postResponse.json();
          console.log('POST Response:', responseData);

          // Update chart data state
          setChartData({
              data: responseData.data,
              annotations: responseData.annotations,
              width: responseData.width,
              height: responseData.height,
          });

          // Open chart modal
          setShowChart(true);
      } catch (error) {
          console.error('Error in POST request:', error);
      }
  };

  useEffect(() => {
    console.log('Data loaded:', intradata, data);

      const fetchData = async () => {
          try {
              const intradatacolsResponse = await fetch('https://api.optionscreener.ir/api/options/intradatacols');
              if (!intradatacolsResponse.ok) {
                  throw new Error(`HTTP error! Status: ${intradatacolsResponse.status}`);
              }

              const intradatacolsData = await intradatacolsResponse.json();
              setData(intradatacolsData);

              const groups = Object.keys(intradatacolsData.groups);
              setValidGroups(groups);

              const initialColumns = intradatacolsData.groupscolumn[selectedGroup] || [];
              setColumns(initialColumns);

              if (!groups.includes(selectedGroup)) {
                  console.error(`Invalid selectedGroup: ${selectedGroup}`);
                  return;
              }

              const intradataResponse = await fetch('https://api.optionscreener.ir/api/options/intradata');
              if (!intradataResponse.ok) {
                  throw new Error(`HTTP error! Status: ${intradataResponse.status}`);
              }

              const intradataData = await intradataResponse.json();
              setIntradata(intradataData.data);
          } catch (error) {
              console.error('Error fetching data:', error);
              setError(error.message || 'An error occurred while fetching data.');
          } finally {
              setLoading(false);
          }
      };

      // Initial fetch
      fetchData();

      // Set up interval for data refresh
      const intervalId = setInterval(fetchData, 15000); // 15000 ms = 15 seconds

      // Clear the interval on component unmount
      return () => clearInterval(intervalId);
  }, [selectedGroup, filterValues.filter04]);

  if (loading) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            ...در حال دریافت دیتا 
        </div>
    );
}
  if (error) {
      return <div>Error: {error}</div>;
  }

  if (!intradata || !data || !data.groups || !data.groupscolumn) {
      return <div>No data available</div>;
  }

  const formatNumberWithSeparator = (number) => {
    if (number === null || number === undefined) {
        return ''; // Return an empty string or a placeholder if number is null or undefined
    }

    // Ensure that the number is indeed a number type
    const numericValue = Number(number);
    if (isNaN(numericValue)) {
        return ''; // Return an empty string or a placeholder if it's not a valid number
    }

    // Convert the number to a string with separators based on the locale
    const formattedNumber = numericValue.toLocaleString();

    // If the number is negative, ensure the minus sign is at the front
    if (numericValue < 0) {
        return `-${formattedNumber.replace('-', '')}`;
    }

    return formattedNumber;
};


  // Filter data where volume > 1
  const filteredData = DataFilter({
      intradata,
      filterValues,
      columns,
  }).filter(item => item.volume >= 0 ).filter(item => item.sell_price > 0 || item.buy_price > 0)    ; // Apply the volume filter here

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

  const handleSort = (criteria) => {
      if (sortCriteria === criteria) {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
          setSortCriteria(criteria);
          setSortOrder('asc');
      }
  };
  const handleRowClick = (instrumentId) => {
    console.log('Selected instrumentId:', instrumentId); // Log the ID

    setSelectedInstrumentId(instrumentId);
    setDetailVisible(true); // Show the DetailPopup
};
  return (
      <div className=" mx-auto p-4 w-[1600px] " dir="rtl">
          <div className="flex items-center justify-between mb-3 ">
          <div className="space-x-4">
  {validGroups.map((groupKey) => (
    <button
      key={groupKey}
      type="button"
      className={`px-3 py-1 hover:bg-[color:var(--color-primary)] hover:text-white transition duration-500 ${selectedGroup === groupKey ? 'bg-[color:var(--color-bg-variant)]  text-white px-4 py-2 rounded-lg scale-105 transition duration-500' : 'bg-[#F4F2F2] rounded-md'}`}
      onClick={() => setSelectedGroup(groupKey)}
    >
      {data && data.groups && data.groups[groupKey] ? data.groups[groupKey] : 'Unknown Group'}
    </button>
  ))}

  {/* Add the new button "نمودار" here */}
  <button
    type="button"
    className="px-4 py-2 bg-[color:var(--color-primary)] text-white rounded-lg hover:bg-[color:var(--color-bg-variant)] transition duration-500"
    onClick={() => {
      // Trigger the logic to show the chart here
      setShowChart(true);
      setChartData(data); // Assuming 'data' is your table data for chart
    }}
  >
    نمودار
  </button>

</div>
{showChart && (
  <Modal onClose={() => setShowChart(false)}>  {/* Assuming you use a Modal to show the chart */}
    <MyChart data={chartData} />  {/* Pass the data to the chart */}
  </Modal>
)}

          </div>

          <div className="m-2 items-center  w-[1900px]">
              <div
                  className="table-container overflow-x-auto"
                  onMouseLeave={() => setHoveredRowIndex(null)}
              >
      <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm lg:text-base">
      <thead className="bg-[#2F657D] text-white sticky top-0 z-2">
                          <tr>
                              <th></th>
                              {columns.map((column, index) => (
                                  <SortableTableHeader
                                      key={index}
                                      column={{ fieldName: column, farsiName: data.fields[column] }}
                                      criteria={sortCriteria}
                                      order={sortOrder}
                                      onSort={handleSort}
                                  />
                              ))}
                          </tr>
                      </thead>
                      <tbody className="bg-[#F4F2F2] ">
    {sortData(filteredData, sortCriteria, sortOrder).map((item, itemIndex) => (
      <tr
      key={itemIndex}
      className={itemIndex % 2 === 0 ? 'bg-gray-100 ' : 'bg-white '}
      onMouseEnter={() => setHoveredRowIndex(itemIndex)}
    >


      {/* Render other columns if no icons are displayed */}
      <td className="py-2 gap-4  px-4 flex items-center space-x-2 mx-3" colSpan="4">

            {/* <span
              className="cursor-pointer text-2xl"
              onClick={() => {
                handlePostRequest(item);
                setSelectedInstrumentId(item['instrument_id']);
                // Remove setShowChart(true) from here
              }}
            >
              <FaChartLine />
            </span> */}
            <span
              className="cursor-pointer text-4xl"
              onClick={() => setDetailVisible(true)}
            >
                <CgDetailsMore
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRowClick(item.instrument_id);
                                            }}
                                            className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer"
                                        />

            </span>

            {/* <span
              className="cursor-pointer  rounded-md py-1 text-[color:var(--color-light)]   px-1 bg-[color:var(--color-primary)]"
              onClick={() => OpenTSE(item['instrument_code'])}
            >
              TSE

            </span> */}

            </td>
      {//hoveredRowIndex !== itemIndex &&
        columns.map((column, columnIndex) => (

          <td key={columnIndex}
          className={`py-2 px-4 ${
            hoveredRowIndex === itemIndex ? 'font-bold' : ''
          }`}
          style={{...getCellStyle(column, item[column]),whiteSpace: 'nowrap' }} dir="ltr">
            {item[column] instanceof Date
                ? item[column].toLocaleDateString()
                : typeof item[column] === 'number'
                ? column === 'today_return' || column === 'bid_ask_spread_percent'
                  ? `${formatNumberWithSeparator(item[column])} %`  // Add "%" for specific columns
                  : formatNumberWithSeparator(item[column])
                : item[column]}

          </td>
        ))}
    </tr>
    ))}
</tbody>
                  </table>
              </div>
          </div>

          {showPopup && <Modal onClose={togglePopup} />}
          {showChart && chartData && (
              <MyChart
                  data={chartData.data}
                  annotations={chartData.annotations}
                  width={chartData.width}
                  height={chartData.height}
                  onClose={() => setShowChart(false)}
              />
          )}
          {calculatorVisible && <CalculatorPopup onClose={() => setCalculatorVisible(false)} />}
          {detailVisible && (
                <DetailPopup
                    instrumentId={selectedInstrumentId}
                    onClose={() => setDetailVisible(false)}
                />
            )}      </div>
  );
};

export default MyTable;