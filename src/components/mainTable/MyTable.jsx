// MyTable.js

import React, { useEffect, useState } from 'react';
import DataFilter from './DataFilter';
import MyChart from '../charts/MyChart';
import Modal from './Modal';
import SortableTableHeader from './SortableTableHeader';
import CalculatorPopup from '../Calculator/CalculatorPopup';
import { FaChartLine } from "react-icons/fa6";
import { IoMdCalculator } from "react-icons/io";

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
    const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
    const [selectedInstrumentId, setSelectedInstrumentId] = useState(null);
    const [sortCriteria, setSortCriteria] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [calculatorVisible, setCalculatorVisible] = useState(false);
    const columnStyles = {
    symbol_fa: {
      style: { width: '150px', textAlign: 'right', color: 'black',fontWeight:"bold" },

    },
    a_factor: {
      style: { textAlign: 'center', color: 'black' },

    },
    b_factor: {
      style: { textAlign: 'center', color: 'black' },

    },
    c_factor: {
      style: { textAlign: 'center', color: 'black' },
    },
    contract_size: {
      style: { textAlign: 'center', color: 'black' },
    },
    days_to_maturity: {
      style: { textAlign: 'center', color: 'black' },
    },
    days_to_maturity_business_days: {
      style: { textAlign: 'center', color: 'black' },
    },
    begin_date: {
      style: { textAlign: 'center', color: 'black' },
    },

    end_date: {
      style: { textAlign: 'center', color: 'black' },
    },

    industry_code: {
      style: { textAlign: 'center', color: 'black' },
    },
    industry_name: {
      style: { textAlign: 'center', color: 'black' },
    },
    instrument_code: {
      style: { textAlign: 'center', color: 'black' },
    },
    instrument_id: {
      style: { textAlign: 'center', color: 'black' },
    },


    average_spread: {
      style: { textAlign: 'center', color: 'black' },
    },
    average_spread_percent_of_mid_price: {
      style: { textAlign: 'center', color: 'black' },
    },


    bid_ask_spread_percent: {
      style: { textAlign: 'center', color: 'black' },
    },
    bid_ask_spread_score: {
      style: { textAlign: 'center', color: 'black' },
    },

    bs_price_to_buy_price: {
      style: { textAlign: 'center'},
    },
    bs_price_to_sell_price: {
      style: { textAlign: 'center'},
    },
    buy_positions: {
      style: { textAlign: 'center', color: 'black' },
    },
    buy_price: {
      style: { textAlign: 'center', color: 'black' },
    },

    close: {
      style: { textAlign: 'center', color: 'black' },
    },


    final: {
      style: { textAlign: 'center', color: 'black' },
    },
    high: {
      style: { textAlign: 'center', color: 'black' },
    },
    implied_volatility_last: {
      style: { textAlign: 'center', color: 'black' },
    },
    implied_volatility_max_all: {
      style: { textAlign: 'center', color: 'black' },
    },implied_volatility_max_month: {
      style: { textAlign: 'center', color: 'black' },
    },implied_volatility_mean_month: {
      style: { textAlign: 'center', color: 'black' },
    },
    implied_volatility_min_all: {
      style: { textAlign: 'center', color: 'black' },
    },
    implied_volatility_min_month: {
      style: { textAlign: 'center', color: 'black' },
    },
    implied_volatility_rank: {
      style: { textAlign: 'center', color: 'black' },
    },
    implied_volatility_to_average_month: {
      style: { textAlign: 'center', color: 'black' },
    },implied_volatility_to_same_ua_implied_volatility_percent: {
      style: { textAlign: 'center', color: 'black' },
    },implied_volatility_vs_realized_volatility_month: {
      style: { textAlign: 'center', color: 'black' },
    },

    intrinsic_value_bs: {
      style: { textAlign: 'center', color: 'black' },
    },
    is_tab: {
      style: { textAlign: 'center', color: 'black' },
    },
    liquidity_score: {
      style: { textAlign: 'center', color: 'black' },
    },
    low: {
      style: { textAlign: 'center', color: 'black' },
    },
    open: {
      style: { textAlign: 'center', color: 'black' },
    },
    notional_value: {
      style: { textAlign: 'center', color: 'black' },
    },
    old: {
      style: { textAlign: 'center', color: 'black' },
    },

    open_interest_score: {
      style: { textAlign: 'center', color: 'black' },
    },
    option_status: {
      style: { textAlign: 'center', color: 'black' },
    },
    option_type: {
      style: { textAlign: 'center', color: 'black' },
    },
    option_type_fa: {
      style: { textAlign: 'center', color: 'black' },
    },
    probability_of_profit: {
      style: { textAlign: 'center', color: 'black' },
    },
    put_call_ratio: {
      style: { textAlign: 'center', color: 'black' },
    },
    rho: {
      style: { textAlign: 'center', color: 'black' },
    },
    theta: {
      style: { textAlign: 'center', color: 'black' },
    },
    delta: {
      style: { textAlign: 'center', color: 'black' },
    },
    gamma: {
      style: { textAlign: 'center', color: 'black' },
    },
    vega: {
      style: { textAlign: 'center', color: 'black' },
    },

    same_ua_average_implied_volatility: {
      style: { textAlign: 'center', color: 'black' },
    },
    sell_positions: {
      style: { textAlign: 'center', color: 'black' },
    },
    sell_price: {
      style: { textAlign: 'center', color: 'black' },
    },
    strike_price: {
      style: { textAlign: 'center', color: 'black' },
    },

    trades_count: {
      style: { textAlign: 'center', color: 'black' },
    },
    ua_close: {
      style: { textAlign: 'center', color: 'black' },
    },
    ua_final: {
      style: { textAlign: 'center', color: 'black' },
    },
    ua_instrument_code: {
      style: { textAlign: 'center', color: 'black' },
    },
    ua_instrument_id: {
      style: { textAlign: 'center', color: 'black' },
    },
    ua_instrument_symbol_fa: {
      style: { textAlign: 'center', color: 'black' },
    },
    ua_volatility_day: {
      style: { textAlign: 'center', color: 'black' },
    },
    ua_volatility_week: {
      style: { textAlign: 'center', color: 'black' },
    },
    ua_volatility_year: {
      style: { textAlign: 'center', color: 'black' },
    },
    ua_volume: {
      style: { textAlign: 'center', color: 'black' },
    },
    ua_volume_count: {
      style: { textAlign: 'center', color: 'black' },
    },

    volatility_skew_horizontal: {
      style: { textAlign: 'center', color: 'black' },
    },
    volatility_skew_horizontal_value: {
      style: { textAlign: 'center', color: 'black' },
    },
    volatility_skew_vertical: {
      style: { textAlign: 'center', color: 'black' },
    },
    volatility_skew_vertical_value: {
      style: { textAlign: 'center', color: 'black' },
    },
    volume: {
      style: { textAlign: 'center', color: 'black' },
    },
    volume_count: {
      style: { textAlign: 'center', color: 'black' },
    },
    volume_score: {
      style: { textAlign: 'center', color: 'black' },
    },
    yesterday_positions: {
      style: { textAlign: 'center', color: 'black' },
    },

    // Add more columns as needed
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
            return { ...baseStyle, color: 'rgb(102,43,50)' ,backgroundColor:'rgb(196,132,146)'};
        } else if (columnName === 'bs_price_to_sell_price' && value < 0) {
            return { ...baseStyle, color: 'rgb(40,102,50)' ,backgroundColor:'rgb(163,240,173)' };
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

    fetchData();
  }, [selectedGroup, filterValues.filter04]);


  if (loading) {
    return <div>در حال دریافت دیتا ...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!intradata || !data || !data.groups || !data.groupscolumn) {
    return <div>No data available</div>;
  }

  const formatNumberWithSeparator = (number) => {
    return number.toLocaleString();
  };

  const filteredData = DataFilter({
    intradata,
    filterValues,
    columns,
  });

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

  return (
    <div className="mt-4 mx-auto p-4 w-full" dir="rtl">
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

      <div className="m-2 items-center ">
        <div
          className="table-container overflow-x-auto overflow-y-auto"
          //style={{ maxWidth: '3000px', maxHeight: '500px' }}
          onMouseLeave={() => setHoveredRowIndex(null)}

        >
          <table className="table-auto  border-collapse border border-gray-800 w-full">
            <thead className="bg-[#2F657D] text-white sticky top-0 z-2">
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
                sortData(filteredData, sortCriteria, sortOrder).map((item, itemIndex) => {
                  const firstNonEmptyColumnIndex = columns.findIndex(
                    (column) => item[column] !== null && item[column] !== undefined && item[column] !== ''
                  );

                  console.log(item);
                  console.log(itemIndex);

                  return (
                    <tr
                      key={itemIndex}
                      className={itemIndex % 2 === 0 ? 'bg-gray-100 ' : 'bg-white'}
                      onMouseEnter={() => setHoveredRowIndex(itemIndex)}
                    >
                      {/* Render icons in a straight line when hovered */}
                      {hoveredRowIndex === itemIndex && firstNonEmptyColumnIndex !== -1 && (
                        <>
                          {/* Render other columns up to the first non-empty column */}
                          {columns.slice(0, firstNonEmptyColumnIndex).map((column, columnIndex) => (
                                /*console.log("1111")
                               console.log(column)*/
                            <td key={columnIndex} className="py-2 px-4 border border-gray-800" style={getCellStyle(column, item[column])}>
                              {item[column] instanceof Date
                                ? item[column].toLocaleDateString()
                                : typeof item[column] === 'number'
                                ? formatNumberWithSeparator(item[column])
                                : item[column]}
                            </td>
                          ))}

                          {/* Render icons in a straight line */}
                          <td className="py-2 gap-4  px-4 flex space-x-2 mx-3">

                            <span
                              className="cursor-pointer text-2xl"
                              onClick={() => {
                                handlePostRequest(item);
                                setSelectedInstrumentId(item['instrument_id']);
                                // Remove setShowChart(true) from here
                              }}
                            >
                              <FaChartLine />
                            </span>
                            <span
                              className="cursor-pointer text-2xl"
                              //onClick={() => setCalculatorVisible(true)}
                            >
                              <IoMdCalculator />

                            </span>
                            {/* Add more icons if needed */}
                          </td>



                          {/* Render remaining columns after the first non-empty column */}
                          {columns.slice(firstNonEmptyColumnIndex + 1).map((column, columnIndex) => (
                            <td key={columnIndex} className="py-2 px-4 border border-gray-800" style={getCellStyle(column, item[column])}>
                              {item[column] instanceof Date
                                ? item[column].toLocaleDateString()
                                : typeof item[column] === 'number'
                                ? formatNumberWithSeparator(item[column])
                                : item[column]}
                            </td>
                          ))}
                        </>
                      )}

                      {/* Render other columns if no icons are displayed */}
                      {hoveredRowIndex !== itemIndex &&
                        columns.map((column, columnIndex) => (
                          <td key={columnIndex} className="py-2 px-4 border border-gray-800" style={getCellStyle(column, item[column])}>
                            {item[column] instanceof Date
                              ? item[column].toLocaleDateString()
                              : typeof item[column] === 'number'
                              ? formatNumberWithSeparator(item[column])
                              : item[column]}
                          </td>
                        ))}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={columns.length} className="py-2 px-4 border border-gray-800">
                    No matching data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calculator Popup */}
      {calculatorVisible && <CalculatorPopup onClose={() => setCalculatorVisible(false)} />}

      {/* Chart Modal */}
      {showChart && (
        <Modal onClose={() => setShowChart(false)}>
          {chartData ? (
            <MyChart chartData={chartData} showChart={showChart} setShowChart={setShowChart} />
          ) : (
            <div>No chart data available.</div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default MyTable;