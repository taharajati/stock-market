import React, { useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { parseISO } from 'date-fns';

const DateFilter = ({ onFilterChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleFilterClick = () => {
    // Log the value of startDate and endDate
    console.log('startDate:', startDate && startDate.format());
    console.log('endDate:', endDate && endDate.format());
  
    // Check if startDate is valid
    if (!startDate || typeof startDate !== 'object') {
      console.error('Invalid startDate:', startDate);
      return;
    }
  
    // Convert the selected start date to a formatted string
    const startFormatted = convertDateToApiFormat(startDate);
  
    // Check if endDate is valid
    if (!endDate || typeof endDate !== 'object') {
      console.error('Invalid endDate:', endDate);
      return;
    }
  
    // Convert the selected end date to a formatted string
    const endFormatted = convertDateToApiFormat(endDate);
  
    // Call the callback function to pass the filter values to the parent component
    onFilterChange({ startDate: startFormatted, endDate: endFormatted });
  };
  

  // Custom function to convert date to API format
  const convertDateToApiFormat = (date) => {
    // Check if the date object is valid
    if (!date || typeof date !== 'object' || !date.format) {
      console.error('Invalid date:', date);
      return;
    }
  
    // Use the library's methods to get year, month, and day
    const year = date.format('YYYY');
    const month = date.format('MM');
    const day = date.format('DD');
  
    return `${year}${month}${day}`;
  };
  return (
    <>
    
    <div className='flex  float-right'>
    <div className=' float-left'>
        <button className='mx-2 ' onClick={handleFilterClick}>
          اعمال
        </button>
        </div>

    <div className='flex items-center mb-4 '>
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        value={endDate}
        onChange={(date) => setEndDate(date)}
        calendarPosition="bottom-right"
      />
      <label className='ml-2'> : تاریخ پایان  </label>
    </div>

    <div className='flex items-center mb-4 mx-6'>
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        value={startDate}
        onChange={(date) => setStartDate(date)}
        calendarPosition="bottom-right"
      />
      <label className='ml-2'> : تاریخ شروع   </label>
    </div>
     
  </div>

</>
);
};

export default DateFilter;
