import React, { useEffect, useState } from 'react';

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
  const [selectedSymbol, setSelectedSymbol] = useState('');

  useEffect(() => {
    // Fetch strategy details
    fetch('https://api.optionscreener.ir/api/strategies/')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setStrategies(data);
      });

    // Fetch strategy names
    fetch('https://api.optionscreener.ir/api/strategies/strategies_list')
      .then(response => response.json())
      .then(data => setStrategyList(data));

    // Fetch instrument list
    fetch('https://api.optionscreener.ir/api/options/uainstruments')
      .then(response => response.json())
      .then(data => setInstruments(data.data));
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

    // Update price based on action selection
    if (field === 'action' || field === 'endDate') {
      const selectedIntraData = intraData.find(item => item.end_date_fa === updatedData[index].endDate);
      if (selectedIntraData) {
        // Set price based on action
        updatedData[index].price = updatedData[index].action === 'sell' 
          ? selectedIntraData.sell_price || 'N/A' // Use 'N/A' if sell_price is empty
          : updatedData[index].action === 'buy' 
          ? selectedIntraData.buy_price || 'N/A' // Use 'N/A' if buy_price is empty
          : '';
      } else {
        updatedData[index].price = 'N/A'; // Set to 'N/A' if no corresponding intraData found
      }
    }

    setEditableData(updatedData);
  };
  useEffect(() => {
    if (selectedInstrument) {
      fetch(`https://api.optionscreener.ir/api/options/intradata?ua_instrument_id=${selectedInstrument.ua_instrument_id}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setIntraData(data.data);
        });
    }
  }, [selectedInstrument]);

  const handleEndDateChange = (index, value) => {
    handleFieldChange(index, 'endDate', value);
    setSelectedEndDate(value);
    const foundItem = intraData.find(item => item.end_date_fa === value);
    if (foundItem) {
      setSelectedSymbol(foundItem.symbol_fa);
    } else {
      setSelectedSymbol('');
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto float-right mr-[60px]" dir='rtl'>
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

      {/* Display selected instrument */}
      {selectedInstrument && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-right">دارایی انتخاب شده:</h2>
          <p className="text-right">نماد: {selectedInstrument.ua_instrument_symbol_fa}</p>
          <p className="text-right">ID: {selectedInstrument.ua_instrument_id}</p>
        </div>
      )}

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

              {/* End Date Selector */}
              <div className="flex flex-col w-1/5 pr-2">
                <label className="block font-semibold text-right">تاریخ سررسید:</label>
                <select
                  className="border p-2 rounded w-full"
                  onChange={(e) => handleEndDateChange(index, e.target.value)}
                >
                  {intraData.map((item, idx) => (
                    <option key={idx} value={item.end_date_fa}>
                      {item.end_date_fa}
                    </option>
                  ))}
                </select>
              </div>

              {/* Display the selected symbol based on end date */}
              <div className="flex flex-col w-1/5 pr-2">
                <label className="block font-semibold text-right">نماد:</label>
                <input
                  type="text"
                  placeholder="نماد را وارد کنید"
                  className="border p-2 rounded w-full"
                  value={selectedSymbol || ''}
                  readOnly
                  onChange={(e) => handleFieldChange(index, 'symbol', e.target.value)}
                />
              </div>

               {/* Price Input Field */}
               <div className="flex flex-col w-1/5 pr-2">
                <label className="block font-semibold text-right">قیمت:</label>
                <input
                  type="text"
                  placeholder="قیمت را وارد کنید"
                  className="border p-2 rounded w-full"
                  value={data.price || 'N/A'} // Display 'N/A' if price is empty
                  readOnly
                  onChange={(e) => handleFieldChange(index, 'price', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calculation;
