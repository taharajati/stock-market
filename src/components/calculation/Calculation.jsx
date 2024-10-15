import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const Calculation = () => {
  const [strategies, setStrategies] = useState([]);
  const [strategyList, setStrategyList] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [editableData, setEditableData] = useState([]);
  const [strategyDetails, setStrategyDetails] = useState(null);
  const [intraData, setIntraData] = useState([]);
  const [selectedKind, setSelectedKind] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState([]);
  const [groupSymbols, setGroupSymbols] = useState({}); // Stores symbols for each instrument group
  const [sigma, setSigma] = useState(0.3); // Default sigma value
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before the fetch
      try {
        // Fetch strategy details
        const strategyResponse = await fetch('https://api.optionscreener.ir/api/strategies/');
        const strategiesData = await strategyResponse.json();
        setStrategies(strategiesData);

        // Fetch strategy names
        const strategyListResponse = await fetch('https://api.optionscreener.ir/api/strategies/strategies_list');
        const strategyListData = await strategyListResponse.json();
        setStrategyList(strategyListData);

        // Fetch instrument list
        const instrumentsResponse = await fetch('https://api.optionscreener.ir/api/options/uainstruments');
        const instrumentsData = await instrumentsResponse.json();
        setInstruments(instrumentsData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    };

    fetchData();
  }, []);

  const handleInstrumentChange = (event) => {
    const selected = instruments.find(instrument => instrument.ua_instrument_id === event.target.value);
    setSelectedInstrument(selected);

    if (editableData.length > 0 && selected) {
      const updatedData = [...editableData];
      updatedData[0].assetType = selected.ua_instrument_symbol_fa;
      setEditableData(updatedData);
    }
  };

  const handleStrategyChange = (event) => {
    const selectedStrategyName = event.target.value;

    const selected = strategies[selectedStrategyName];

    setSelectedStrategy(selectedStrategyName);

    if (selected) {
      setEditableData(selected.instruments);
      setStrategyDetails(selected);
    } else {
      setEditableData([]);
      setStrategyDetails(null);
    }
  };

  const handleFieldChange = (index, field, value) => {
    const updatedData = [...editableData];
    updatedData[index][field] = value;

    if (field === 'action' || field === 'endDate') {
      const selectedIntraData = intraData.find(item => item.end_date_fa === updatedData[index].endDate);
      if (selectedIntraData) {
        updatedData[index].price = updatedData[index].action === 'sell'
          ? selectedIntraData.sell_price || 'N/A'
          : selectedIntraData.buy_price || 'N/A';
      } else {
        updatedData[index].price = 'N/A';
      }
    }

    setEditableData(updatedData);
  };

  useEffect(() => {
    if (selectedInstrument) {
      const fetchIntraData = async () => {
        setLoading(true); // Set loading to true before the fetch
        try {
          const response = await fetch(`https://api.optionscreener.ir/api/options/intradata?ua_instrument_id=${selectedInstrument.ua_instrument_id}`);
          const data = await response.json();
          setIntraData(data.data);
        } catch (error) {
          console.error('Error fetching intra data:', error);
        } finally {
          setLoading(false); // Set loading to false after the fetch is complete
        }
      };

      fetchIntraData();
    }
  }, [selectedInstrument]);

  const handleEndDateChange = (index, value) => {
    handleFieldChange(index, 'endDate', value);

    const foundItems = intraData.filter(item => item.end_date_fa === value);
    if (foundItems.length > 0) {
      const symbols = foundItems.map(item => item.symbol_fa);
      setGroupSymbols((prevSymbols) => ({
        ...prevSymbols,
        [index]: symbols,  // Assign symbols to the specific instrument group
      }));
    } else {
      setGroupSymbols((prevSymbols) => ({
        ...prevSymbols,
        [index]: [],  // Ensure empty array if no items found for this group
      }));
    }
  };

  // Function to get unique end dates
  const getUniqueEndDates = (data) => {
    const uniqueDates = [...new Set(data.map(item => item.end_date_fa))];
    return uniqueDates;
  };

  // POST request handler
  const handleCalculate = async () => {
    const requestData = {
      strategy: editableData,
      sigma,
    };

    setLoading(true); // Set loading to true before the fetch
    try {
      const response = await fetch('https://api.optionscreener.ir/api/strategies/calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
      setResponse(data);
      console.log('Calculation result:', data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // Set loading to false after the fetch is complete
    }
  };
 // Prepare chart data
 const chartData = {
  labels: response?.stock_price_array || [],  // Stock prices for x-axis
  datasets: [
    {
      label: 'Strategy Profit',
      data: response?.strategy_profit || [],  // Strategy profit for y-axis
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Strategy Profit vs Stock Price' },
  },
  scales: {
    x: { title: { display: true, text: 'Stock Price' } },
    y: { title: { display: true, text: 'Profit' } },
  },
};

  return (
    
    <div className="p-4 max-w-3xl mx-auto float-right mr-[60px]" dir='rtl'>
          {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-700"></div>
        </div>
      )}
      <h1 className="text-xl font-bold mb-4 text-right">ماشین حساب</h1>

      {/* Dropdown for Instruments */}
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2 text-right">دارایی پایه</label>
        <select
          className="p-2 border rounded w-full"
          onChange={handleInstrumentChange}
          defaultValue=""
        >
          <option value="" disabled>انتخاب دارایی پایه</option>
          {instruments.map(instrument => (
            <option key={instrument.ua_instrument_id} value={instrument.ua_instrument_id}>
              {instrument.ua_instrument_symbol_fa}
            </option>
          ))}
        </select>
      </div>

  

      {/* Dropdown for Strategies */}
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2 text-right">استراتژی</label>
        <select
          className="p-2 border rounded w-full"
          onChange={handleStrategyChange}
          defaultValue=""
        >
          <option value="" disabled>انتخاب استراتژی</option>
          {strategyList.map((strategy, index) => (
            <option key={index} value={strategy}>
              {strategy}
            </option>
          ))}
        </select>
      </div>

      {/* Display strategy details in a horizontal layout */}
      {selectedStrategy && (
        <div className="mb-4 w-[1600px]">
          <h2 className="text-lg font-semibold text-right">جزئیات استراتژی:</h2>
          {editableData.map((data, index) => (
            <div key={index} className="mb-4 p-4 border rounded bg-white shadow-md flex">
              <div className="flex flex-col w-1/5 pr-2">
                <label className="block font-semibold text-right">نوع دارایی:</label>
                <input
                  type="text"
                  placeholder="نوع دارایی را وارد کنید"
                  className="border p-2 rounded w-full"
                  value={data.assetType || selectedInstrument?.ua_instrument_symbol_fa || ''}
                  readOnly
                  onChange={(e) => handleFieldChange(index, 'assetType', e.target.value)}
                />
              </div>

              <div className="flex flex-col w-1/5 pr-2">
                <label className="block font-semibold text-right">نوع اختیار:</label>
                <select
                  className="p-2 border rounded w-full"
                  value={data.kind || ''}
                  onChange={(e) => {
                    handleFieldChange(index, 'kind', e.target.value);
                    setSelectedKind(e.target.value);
                  }}
                >
                  <option value="" disabled>انتخاب نوع اختیار</option>
                  <option value="call">Call</option>
                  <option value="put">Put</option>
                </select>
              </div>

              <div className="flex flex-col w-1/5 pr-2">
                <label className="block font-semibold text-right">عملیات:</label>
                <select
                  className="border p-2 rounded w-full"
                  value={data.action || ''}
                  onChange={(e) => {
                    handleFieldChange(index, 'action', e.target.value);
                    const selectedIntraData = intraData.find(item => item.end_date_fa === data.endDate);
                    // Set the price based on the selected action
                    if (selectedIntraData) {
                      const price = e.target.value === 'sell' 
                        ? selectedIntraData.sell_price 
                        : selectedIntraData.buy_price;
                      handleFieldChange(index, 'price', price); // Update price in editableData
                    }
                  }}
                >
                  <option value="" disabled>انتخاب عملیات</option>
                  <option value="buy">خرید</option>
                  <option value="sell">فروش</option>
                </select>
              </div>


              <div className="flex flex-col w-1/5 pr-2">
                <label className="block font-semibold text-right">تعداد (n):</label>
                <input
                  type="number"
                  placeholder="تعداد را وارد کنید"
                  className="border p-2 rounded w-full"
                  value={data.n || ''} // Use optional chaining to handle undefined
                  onChange={(e) => handleFieldChange(index, 'quantity', e.target.value)}
                />
              </div>
             {/* End Date Selector */}
                            <div className="flex flex-col w-1/5 pr-2">
                 <label className="block font-semibold text-right">تاریخ سررسید:</label>
                 <select
                   className="border p-2 rounded w-full"
                   onChange={(e) => handleEndDateChange(index, e.target.value)}
                   disabled={data.kind !== 'call'} // Disable if kind is not 'call'
                 >
                   <option value="" disabled>
                     {data.kind === 'call' ? 'انتخاب تاریخ سررسید' : 'تاریخ سررسید فقط برای اختیار Call'} {/* Show message if disabled */}
                   </option>
                   {data.kind === 'call' && getUniqueEndDates(intraData).map((date, idx) => (
                     <option key={idx} value={date}>
                       {date}
                     </option>
                   ))}
                 </select>
               </div>

     {/* Symbol Selection */}
     <div className="flex flex-col w-1/5 pr-2">
                <label className="block font-semibold text-right">نماد:</label>
                {groupSymbols[index]?.length > 0 ? (
                  <select
                    className="w-full border p-2 rounded text-right"
                    onChange={(e) => handleFieldChange(index, 'symbol', e.target.value)}
                  >
                    <option value="" disabled>انتخاب نماد</option>
                    {groupSymbols[index].map((symbol, idx) => (
                      <option key={idx} value={symbol}>
                        {symbol}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span>نمادی انتخاب نشده است</span>
                )}
              </div>
              
              {/* Editable Price Input Field */}
              <div className="flex flex-col w-1/5 pr-2">
                <label className="block font-semibold text-right">قیمت:</label>
                <input
                  type="number"
                  placeholder="قیمت را وارد کنید"
                  className="border p-2 rounded w-full"
                  value={data.price || ''} // Keeps the current price value, editable
                  onChange={(e) => handleFieldChange(index, 'price', e.target.value)}
                />
              </div>
               {/* Sigma Input */}
      <div className="flex flex-col w-1/5 pr-2">
        <label className="block font-semibold text-right">سیگما:</label>
        <input
          type="number"
          step="0.01"
          className="p-2 border rounded w-full"
          value={sigma}
          onChange={(e) => setSigma(parseFloat(e.target.value))}
        />
      </div>

   

            </div>
          ))}
             {/* POST Button */}
      <button
        onClick={handleCalculate}
        className="bg-[color:var(--color-primary)] text-white py-2 px-4 rounded-md hover:bg-[color:var(--color-primary)] transition-all w-full mt-4 shadow-lg"
      >
        محاسبه
      </button>

    {/* Display the response */}
{response && (
  <div className="mt-4 p-4 border rounded bg-gray-100">
    <h3 className="font-bold text-right">نتیجه:</h3>

    <div className="mt-2">
      <h4 className="font-semibold">استراتژی خلاصه:</h4>
      <div className="flex justify-between">
        <div className="text-right">
          <p><strong>حداکثر بازده:</strong> {response.max_return}</p>
          <p><strong>حداکثر ضرر:</strong> {response.max_loss}</p>
          <p><strong>هزینه استراتژی:</strong> {response.strategy_cost}</p>
        </div>
        <div className="text-right">
          <h5 className="font-semibold">دلتا:</h5>
          <ul className="list-disc list-inside">
            {response.delta.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    <div className="mt-4">
      <h4 className="font-semibold">سود استراتژی:</h4>
      {/* Chart to display strategy profit vs stock price */}
      {response && (
        <div className="mt-8">
          <Line data={chartData} options={options} />
        </div>
      )}
      <p className="text-right mt-2 text-sm text-gray-600">نمایش {response.strategy_profit.length} سود</p>
    </div>
  </div>
)}

        </div>
      )}
    </div>
  );
};

export default Calculation;
