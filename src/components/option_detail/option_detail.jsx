// CalculatorPopup.js
import React, { useState } from 'react';
import Modal from '../screener/mainTable/Modal';




// Dummy components for different tabs
const TabContent1 = ({ data }) => (
  <div>
    <h2>Tab 1 Content</h2>
    <p>Data for Tab 1: {data}</p>
  </div>
);

const TabContent2 = ({ data }) => (
  <div>
    <h2>Tab 2 Content</h2>
    <p>Data for Tab 2: {data}</p>
  </div>
);

const TabContent3 = ({ data }) => (
  <div>
    <h2>Tab 3 Content</h2>
    <p>Data for Tab 3: {data}</p>
  </div>
);


const DetailPopup = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('tab1');
  const [data, setData] = useState('Sample Data');

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    backdropFilter: 'blur(8px)', // Blur effect
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    background: 'white',
    padding: '10px',
    margin:'10px',
    borderRadius: '8px',
    maxWidth: '95%',
    maxHeight: '95%',
    overflowY: 'auto',
    position: 'relative',
    zIndex: 1001,
  },
};

const tabStyles = {
  tabs: {
    display: 'flex',
    marginBottom: '16px',
  },
  tab: {
    background: '#e0e0e0',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginRight: '4px',
  },
  activeTab: {
    background: '#2F657D',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginRight: '4px',
  },
  content: {
    padding: '16px',
  },
};

  return (
    <Modal onClose={onClose}>
       <div >

        <button onClick={onClose} style={{ position: 'absolute', top: 18, right: 35 }}>بستن</button>
        <div style={modalStyles.content}>
        <div style={tabStyles.tabs}>
          <button
            style={activeTab === 'tab1' ? tabStyles.activeTab : tabStyles.tab}
            onClick={() => handleTabChange('tab1')}
          >
            Tab 1
          </button>
          <button
            style={activeTab === 'tab2' ? tabStyles.activeTab : tabStyles.tab}
            onClick={() => handleTabChange('tab2')}
          >
            Tab 2
          </button>
          <button
            style={activeTab === 'tab3' ? tabStyles.activeTab : tabStyles.tab}
            onClick={() => handleTabChange('tab3')}
          >
            Tab 3
          </button>
        </div>

        <div style={tabStyles.content}>
          {activeTab === 'tab1' && <TabContent1 data={data} />}
          {activeTab === 'tab2' && <TabContent2 data={data} />}
          {activeTab === 'tab3' && <TabContent3 data={data} />}
        </div>
      </div>
    </div>
    </Modal>
  );
};

export default DetailPopup;



