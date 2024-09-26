import React, { useState, useEffect } from 'react';
import Modal from '../screener/mainTable/Modal'; // Ensure the correct path
import CandlestickChart from './CandlestickChart'; // Adjust path as necessary
import SpecificationsTab from './SpecificationsTab'; // Adjust path as necessary
import TradingBoard from './TradingBoard'; // Adjust path as necessary

const fetchData = async (instrumentId, adjusted) => {
  if (!instrumentId) {
    console.error('Instrument ID is required');
    return { historicalPriceData: null, specificationsData: null };
  }

  try {
    const historicalPriceResponse = await fetch(`https://api.optionscreener.ir/api/prices/historicalprice?instrument_id=${instrumentId}&adjusted=${adjusted}`);
    if (!historicalPriceResponse.ok) {
      throw new Error(`Error fetching historical prices: ${historicalPriceResponse.statusText}`);
    }
    const historicalPriceData = await historicalPriceResponse.json();

    const specificationsResponse = await fetch(`https://api.optionscreener.ir/api/options/detail?instrument_id=${instrumentId}`);
    if (!specificationsResponse.ok) {
      throw new Error(`Error fetching specifications: ${specificationsResponse.statusText}`);
    }
    const specificationsData = await specificationsResponse.json();

    return { historicalPriceData, specificationsData };
  } catch (error) {
    console.error(error.message);
    return { historicalPriceData: null, specificationsData: null };
  }
};

const DetailPopup = ({ instrumentId, onClose }) => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [data, setData] = useState({
    historicalPriceData: null,
    specificationsData: null
  });
  const [symbolFa, setSymbolFa] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData(instrumentId, 'False'); // Adjusted value is 'False'
      setData({
        historicalPriceData: fetchedData.historicalPriceData,
        specificationsData: fetchedData.specificationsData
      });

      // Debugging log for fetchedData
      console.log('Fetched Specifications Data:', fetchedData.specificationsData);

      // Extract and set the symbol_fa if it exists
      if (fetchedData.specificationsData && fetchedData.specificationsData.data && fetchedData.specificationsData.data.symbol_fa) {
        setSymbolFa(fetchedData.specificationsData.data.symbol_fa);
        console.log('Symbol FA:', fetchedData.specificationsData.data.symbol_fa); // Log the symbol
      } else {
        console.log('symbol_fa not found in specificationsData');
      }
    };

    if (instrumentId) {
      loadData();
    }
  }, [instrumentId]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleArrowClick = (direction) => {
    const tabs = ['tab1', 'tab2', 'tab3', 'tab4'];
    const currentIndex = tabs.findIndex((tab) => tab === activeTab);
    const newIndex = (currentIndex + direction + tabs.length) % tabs.length;
    setActiveTab(tabs[newIndex]);
  };

  const tabs = [
    { id: 'tab1', label: 'نمودار', content: <CandlestickChart data={data.historicalPriceData} data2={data.specificationsData} /> },
    { id: 'tab2', label: 'مشخصات', content: <SpecificationsTab data={data.specificationsData} /> },
    { id: 'tab3', label: ' مشخصات دارایی پایه', content: <TradingBoard data={data.specificationsData} /> },
    { id: 'tab4', label: 'Valuation', content: <div>Valuation Content</div> }
  ];

  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
  const underlineWidth = 100 / tabs.length;
  const underlineTransform = `translateX(${100 * (tabs.length - 1 - activeIndex)}%)`;

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col h-full bg-white p-4 m-2 rounded-lg max-w-full max-h-[95%] overflow-hidden relative transition-all duration-300 ease-in-out md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1500px] 2xl:max-w-[1800px] ">
        
        {/* Display Symbol at the top */}
        <div className="text-center font-bold text-xl mb-4 text-[color:var(--color-primary-variant2)]">
          {symbolFa || 'بارگذاری...'} {/* Display 'Loading...' if symbol is not yet available */}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {tabs.find((tab) => tab.id === activeTab).content}
        </div>

        <div className="flex items-center justify-center mt-auto flex-wrap">
          <button
            className="text-gray-500 p-4 text-2xl hover:text-[#2F657D] transition-colors duration-300"
            onClick={() => handleArrowClick(-1)}
            disabled={tabs.findIndex((tab) => tab.id === activeTab) === 0}
          >
            &lt;
          </button>

          <div className="flex-1 flex justify-between relative mx-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex-1 text-center py-2 transition-colors duration-300 ${activeTab === tab.id ? 'text-[#2F657D]' : 'text-gray-500'}`}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
            <span
              className="absolute bottom-[-2px] left-0 h-0.5 bg-[#2F657D] transition-transform duration-300"
              style={{
                width: `${underlineWidth}%`,
                transform: underlineTransform,
              }}
            ></span>
          </div>

          <button
            className="text-gray-500 p-4 text-2xl hover:text-[#2F657D] transition-colors duration-300"
            onClick={() => handleArrowClick(1)}
            disabled={tabs.findIndex((tab) => tab.id === activeTab) === tabs.length - 1}
          >
            &gt;
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DetailPopup;
