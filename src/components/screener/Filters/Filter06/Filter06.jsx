// src/Filters/Filter06/Filter06.js
import React from 'react';

const Filter06 = ({ value, onFilterChange }) => {
    const handleChange = (e) => {
        onFilterChange(e.target.value);
    };

    return (
        <div className='text-right my-3'>
                  <span className="mr-6 text-right float-right ms-3">ارزش معاملات (میلیارد ریال)</span>
                  <div className="flex items-center justify-end mb-3 w-[14%] ml-auto m-1 text-black">
            <input
            className='form-control border text-center w-48'
                type="number"
                value={value}
                onChange={handleChange}
                min="0"
                step="1"
            />
        </div>
        </div>
    );
};

export default Filter06;
