import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const Filter02 = ({ onFilterChange }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onFilterChange(value); // Add this line to update the filter value
  };

  return (
    <>
    <div className="text-right my-3 ">
      <span className='mr-6 text-right float-right ms-3' htmlFor="profitState">وضعیت سود</span>
      <div className="flex items-center justify-end mb-3 w-[14%] ml-auto m-1 ">
        <Form>
          <Form.Group controlId="profitState">
            <Form.Select
              className="form-control border text-center w-48"
              value={selectedValue}
              onChange={handleChange}
            >
              <option value=""> </option>
              <option value="ATM">At the Money</option>
              <option value="ITM">In the Money</option>
              <option value="OTM">Out of the Money</option>
            </Form.Select>
          </Form.Group>
        </Form>
        </div>
      </div>
    </>
  );
};

export default Filter02;
