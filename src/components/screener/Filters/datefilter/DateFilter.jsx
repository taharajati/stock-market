import React, { useState, useEffect } from 'react';

// Function to fetch intradata from the API
const fetchIntradata = async () => {
  try {
    const response = await fetch('https://api.optionscreener.ir/api/options/intradata'); // Replace with your actual endpoint
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.data; // Assuming the API returns an object with a 'data' array
  } catch (error) {
    console.error('Error fetching intradata:', error);
    return []; // Return an empty array in case of an error
  }
};

const DateFilter = ({ onFilterChange }) => {
  const [dueDateOptions, setDueDateOptions] = useState([]);
  const [selectedDueDate, setSelectedDueDate] = useState('');

  // Fetch unique days_to_maturity_fa values from intradata
  useEffect(() => {
    const fetchDueDateOptions = async () => {
      try {
        const intradata = await fetchIntradata();

        // Filter and extract unique days_to_maturity_fa values
        const uniqueDays = Array.from(
          new Set(
            intradata
              .filter(item => item.days_to_maturity_fa) // Include only items with a valid days_to_maturity_fa
              .map(item => item.days_to_maturity_fa)
          )
        );

        setDueDateOptions(uniqueDays);
      } catch (error) {
        console.error('Error fetching due date options:', error);
      }
    };

    fetchDueDateOptions();
  }, []);

  const handleFilterClick = () => {
    console.log('Selected Due Date:', selectedDueDate);

    // Call the callback function to pass the selected due date to the parent component
    onFilterChange({ dueDate: selectedDueDate });
  };

  return (
    <div className='flex float-right'>
      <div className='float-left'>
        <button className='mx-2' onClick={handleFilterClick}>
          اعمال
        </button>
      </div>

      <div className='flex items-center mb-4'>
        <select
          className='form-select border w-48' dir='rtl'
          value={selectedDueDate}
          onChange={(e) => setSelectedDueDate(e.target.value)}
        >
          <option value=''>انتخاب تاریخ سررسید</option>
          {dueDateOptions.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>
        <label className='ml-2'>: تاریخ سررسید</label>
      </div>
    </div>
  );
};

export default DateFilter;
