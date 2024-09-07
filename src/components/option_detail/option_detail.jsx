import React, { useState, useEffect } from 'react';
import Modal from '../screener/mainTable/Modal'; // Ensure the correct path
import PriceChart from './PriceChart'; // Adjust path as necessary
import SpecificationsTab from './SpecificationsTab'; // Adjust path as necessary

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

const DetailPopup = ({ instrumentId, instrumentCode, onClose }) => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [data, setData] = useState({
    historicalPriceData: null,
    specificationsData: null
  });

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData(instrumentId, 'False'); // Adjusted value is 'False'
      setData({
        historicalPriceData: fetchedData.historicalPriceData,
        specificationsData: fetchedData.specificationsData
      });
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
    { id: 'tab1', label: 'Diagram', content: <PriceChart data={data.historicalPriceData} /> },
    { id: 'tab2', label: 'Specifications', content: <SpecificationsTab data={data.specificationsData} /> },
    { id: 'tab3', label: 'Trading Board', content: <div>Trading Board Content</div> },
    { id: 'tab4', label: 'Valuation', content: <div>Valuation Content</div> }
  ];

  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
  const underlineWidth = 100 / tabs.length;
  const underlineTransform = `translateX(${100 * (tabs.length - 1 - activeIndex)}%)`;

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col h-full bg-white p-4 m-2 rounded-lg max-w-full max-h-[95%] overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-4">
          {tabs.find((tab) => tab.id === activeTab).content}
        </div>

        <div className="flex items-center justify-center mt-auto">
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
                className={`flex-1 text-center py-2 transition-colors duration-300 ${
                  activeTab === tab.id ? 'text-[#2F657D]' : 'text-gray-500'
                }`}
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
