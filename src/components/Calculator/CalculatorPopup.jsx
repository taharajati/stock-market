// CalculatorPopup.js
import React, { useState } from 'react';
import Modal from '../mainTable/Modal';

const CalculatorPopup = ({ onClose }) => {
  const [riskFree, setRiskFree] = useState(20);
  const [volatility, setVolatility] = useState(24);
  const [strikePrice, setStrikePrice] = useState(100);
  const [optionType, setOptionType] = useState('call');
  const [uaPrice, setUaPrice] = useState(200);
  const [daysToMaturity, setDaysToMaturity] = useState(10);
  const [calculatorResult, setCalculatorResult] = useState(null);

  const handleInputChange = (field, value) => {
    switch (field) {
      case 'riskFree':
        setRiskFree(value);
        break;
      case 'volatility':
        setVolatility(value);
        break;
      case 'strikePrice':
        setStrikePrice(value);
        break;
      case 'optionType':
        setOptionType(value);
        break;
      case 'uaPrice':
        setUaPrice(value);
        break;
      case 'daysToMaturity':
        setDaysToMaturity(value);
        break;
      default:
        break;
    }
  };

  const handleCalculate = async () => {
    try {
      const response = await fetch('https://api.optionscreener.ir/api/options/pricing_calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          risk_free: riskFree,
          volatility: volatility,
          strike_price: strikePrice,
          option_type: optionType,
          ua_price: uaPrice,
          days_to_maturity: daysToMaturity,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setCalculatorResult(result);
    } catch (error) {
      console.error('Error calculating options:', error);
    }
  };

  return (
    <Modal onClose={onClose}>
       <div className="p-4 space-y-4 max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
        {/* Form Row 1 */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block mb-2">
              Risk Free Rate (%)
              <input type="number" value={riskFree} onChange={(e) => handleInputChange('riskFree', e.target.value)} className="border p-2 w-full" />
            </label>
          </div>
          <div className="flex-1">
            <label className="block mb-2">
              Volatility
              <input type="number" value={volatility} onChange={(e) => handleInputChange('volatility', e.target.value)} className="border p-2 w-full" />
            </label>
          </div>
        </div>

        {/* Form Row 2 */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block mb-2">
              Strike Price
              <input type="number" value={strikePrice} onChange={(e) => handleInputChange('strikePrice', e.target.value)} className="border p-2 w-full" />
            </label>
          </div>
          <div className="flex-1">
            <label className="block mb-2">
              Option Type
              <select value={optionType} onChange={(e) => handleInputChange('optionType', e.target.value)} className="border p-2 w-full">
                <option value="call">اختیار خرید</option>
                <option value="put">اختیار فروش</option>
              </select>
            </label>
          </div>
        </div>

        {/* Form Row 3 */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block mb-2">
              UA Price
              <input type="number" value={uaPrice} onChange={(e) => handleInputChange('uaPrice', e.target.value)} className="border p-2 w-full" />
            </label>
          </div>
          <div className="flex-1">
            <label className="block mb-2">
              Days to Maturity
              <input type="number" value={daysToMaturity} onChange={(e) => handleInputChange('daysToMaturity', e.target.value)} className="border p-2 w-full" />
            </label>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          className="px-4 py-2 bg-[#2F657D] text-white rounded-lg scale-105 transition duration-500"
          onClick={handleCalculate}
        >
          Calculate
        </button>

        {calculatorResult && (
  <div className="mt-4 border p-4 bg-gray-100 flex">
    {/* First Column */}
    <div className="flex-1 pr-4">
      <div className="mb-2">
        <p>D1: {calculatorResult.d1}</p>
        <p>D2: {calculatorResult.d2}</p>
        <p>Price: {calculatorResult.price}</p>
      </div>
    </div>

    {/* Second Column */}
    <div className="flex-1">
      <div>
        <p>Delta: {calculatorResult.delta}</p>
        <p>Theta: {calculatorResult.theta}</p>
        <p>Gamma: {calculatorResult.gamma}</p>
        <p>Vega: {calculatorResult.vega}</p>
        <p>Prob: {calculatorResult.prob}</p>
      </div>
    </div>
  </div>
)}
      </div>
    </Modal>
  );
};

export default CalculatorPopup;
