import React from 'react';

const Filter07 = ({ value, onFilterChange }) => {
    const handleCheckboxChange = (e) => {
        onFilterChange(e.target.checked);
    };

    return (
        <div className='flex items-center justify-start my-3' dir='rtl'>
            <span className="mr-6 pl-2">  فقط معامله شده   </span>
            <input
                type="checkbox"
                checked={value}
                onChange={handleCheckboxChange}
                className='form-checkbox h-5 w-5 text-blue-600'
            />
        </div>
    );
};

export default Filter07;
