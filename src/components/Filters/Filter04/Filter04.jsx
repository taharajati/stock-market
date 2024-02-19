import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const Filter04 = ({ onFilterChange }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onFilterChange(value); // Add this line to update the filter value
  };

 
  return (
    <>
      <span className='mr-2 text-right float-right ms-3' htmlFor="profitState">نوع اختیار</span>
      <div className="text-right flex items-center justify-end mb-3 w-[10%] ml-auto">
        <Form>
          <Form.Group controlId="profitState">
            <Form.Select
              className="form-control border w-30 text-center"
              value={selectedValue}
              onChange={handleChange}
            >
              <option value=""> </option>
              <option value="c">اختیار خرید</option>
            <option value="p">اختیار فروش</option>
            </Form.Select>
          </Form.Group>
        </Form>
       
       
      </div>
    </>
  );
};

export default Filter04;


