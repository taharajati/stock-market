import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import Select from 'react-select';

const Filter01 = ({ setFilterValue }) => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://optionscreener.ir/api/options/uainstruments')
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const options = data.map((item) => ({
    label: item.ua_instrument_symbol_fa,
    value: item.ua_instrument_id,
  }));

  const handleSelectChange = (selectedOption) => {
    setSelectedItem(selectedOption);
    setFilterValue(selectedOption ? selectedOption.value : ''); // Set the selected value as the filter value
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (data.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <div className="text-right my-3">
      <span className="mr-6 my-1 text-right  float-right ms-3">نماد سهم پایه</span>
      <div className="flex items-center justify-end mb-3 w-[15%] ml-auto m-1">
        <Select
          className="w-48"
          value={selectedItem}
          onChange={handleSelectChange}
          options={options}
          placeholder=""
          isClearable
        />
      </div>
    </div>
  );
};

export default Filter01;
