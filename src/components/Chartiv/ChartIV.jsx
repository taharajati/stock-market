import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const ChartIV = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartOptions, setChartOptions] = useState({});
  const [selectedField, setSelectedField] = useState('implied_volatility'); // Default filter
  const [selectedDueDate, setSelectedDueDate] = useState('');
  const [selectedOptionType, setSelectedOptionType] = useState('');
  const [selectedUaInstrumentSymbolFa, setSelectedUaInstrumentSymbolFa] = useState(''); // New filter

  // Fetch data from the API for charts
  const fetchChartData = async () => {
    try {
      const response = await fetch('https://api.optionscreener.ir/api/options/option_strike_chart');
      const jsonData = await response.json();

      if (jsonData && jsonData.data && Array.isArray(jsonData.data)) {
        setData(jsonData.data);
      } else {
        throw new Error('Data format is not an array or is empty');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch chart options from the API
  const fetchChartOptions = async () => {
    try {
      const response = await fetch('https://api.optionscreener.ir/api/options/option_strike_chart_option');
      const jsonData = await response.json();

      if (jsonData && jsonData.data) {
        setChartOptions(jsonData.data);
      } else {
        throw new Error('Chart options data is missing or invalid');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchChartData();
    fetchChartOptions();
  }, []);

  // Extract unique values for filters
  const getUniqueValues = (key) => {
    const values = data?.map(item => item[key]).flat();
    return Array.from(new Set(values)).filter(value => value != null);
  };

  // Filter data based on selected due date, option type, and ua_instrument_symbol_fa
  const filteredData = data?.filter(item =>
    (selectedDueDate ? item.end_date_fa === selectedDueDate : true) &&
    (selectedOptionType ? item.option_type === selectedOptionType : true) &&
    (selectedUaInstrumentSymbolFa ? item.ua_instrument_symbol_fa === selectedUaInstrumentSymbolFa : true)
  );

  // Prepare chart data with multiple y-axes
  const getChartData = () => {
    const fieldOptions = chartOptions[selectedField];
    if (!fieldOptions) return [];

    return filteredData?.map((item, index) => {
      const datasets = fieldOptions.yaxis.map(yaxisConfig => ({
        label: yaxisConfig.name,
        data: item[yaxisConfig.variable],
        borderColor: yaxisConfig.color || 'rgba(75, 192, 192, 1)',
        backgroundColor: yaxisConfig.chart_type === 'bar' ? (yaxisConfig.color || 'rgba(75, 192, 192, 0.2)') : 'transparent',
        type: yaxisConfig.chart_type,
        fill: yaxisConfig.chart_type === 'line',
        tension: yaxisConfig.chart_type === 'line' ? 0.4 : 0,
        yAxisID: `y-axis-${yaxisConfig.yaxis_id}`,
      }));
      return {
        labels: item.strike_price,
        datasets,
        metaData: {
          ua_instrument_symbol_fa: item.ua_instrument_symbol_fa,
          option_type_fa: item.option_type_fa,
          end_date_fa: item.end_date_fa,
        }
      };
    }) || [];
  };

  const filteredCharts = getChartData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available to display.</div>;

  // List of field types for buttons
  const fieldTypes = Object.keys(chartOptions).map(key => ({
    key,
    label: chartOptions[key].title,
  }));

  return (
    <div className="chart-container">
      <h3 className='mb-6 mr-6 text-right text-[30px] text-[color:var(--color-primary-variant)]'>اطلاعات نمودار</h3>

   {/* ua_instrument_symbol_fa Filter */}
   <div className="filter-container text-right my-3 mr-6">
        <label htmlFor="uaInstrumentSymbolFaFilter" className="my-1 text-right float-right ms-3">نماد پایه</label>
        <select
          id="uaInstrumentSymbolFaFilter"
          value={selectedUaInstrumentSymbolFa}
          onChange={(e) => setSelectedUaInstrumentSymbolFa(e.target.value)}
          className="filter-select text-center flex items-center justify-end mb-3 w-[200px] ml-auto m-1 text-black border"
        >
          <option value="">انتخاب همه</option>
          {getUniqueValues('ua_instrument_symbol_fa').map((symbol, index) => (
            <option key={index} value={symbol}>{symbol}</option>
          ))}
        </select>
      </div>
      {/* Due Date Filter */}
      <div className="filter-container text-right my-3 mr-6">
        <label htmlFor="dueDateFilter" className="my-1 text-right float-right ms-3">تاریخ سر رسید</label>
        <select
          id="dueDateFilter"
          value={selectedDueDate}
          onChange={(e) => setSelectedDueDate(e.target.value)}
          className="filter-select text-center flex items-center justify-end mb-3 w-[200px] ml-auto m-1 text-black border"
        >
          <option value="">انتخاب همه تاریخ‌ها</option>
          {getUniqueValues('end_date_fa').map((date, index) => (
            <option key={index} value={date}>{date}</option>
          ))}
        </select>
      </div>

      {/* Option Type Filter */}
      <div className="filter-container text-right my-3 mr-6">
        <label htmlFor="optionTypeFilter" className="my-1 text-right float-right ms-3">نوع اختیار</label>
        <select
          id="optionTypeFilter"
          value={selectedOptionType}
          onChange={(e) => setSelectedOptionType(e.target.value)}
          className="filter-select text-center flex items-center justify-end mb-3 w-[200px] ml-auto m-1 text-black border"
        >
          <option value="">تمام انواع اختیار</option>
          {getUniqueValues('option_type').map((type, index) => (
            <option key={index} value={type}>
              {type === 'c' ? 'اختیار خرید' : 'اختیار فروش'}
            </option>
          ))}
        </select>
      </div>

   

      {/* Field Filter Buttons */}
      <div className="filter-container text-right my-3 mr-6">
        <label>انتخاب نوع نمودار</label>
        <div className="space-x-4">
          {fieldTypes.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className={`px-3 py-1 hover:bg-[color:var(--color-primary)] hover:text-white transition duration-500 ${selectedField === key ? 'bg-[color:var(--color-bg-variant)] text-white px-4 py-2 rounded-lg scale-105 transition duration-500' : 'bg-[#F4F2F2] rounded-md'}`}
              onClick={() => setSelectedField(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>




      {/* Render charts for the selected field */}
      <div className="chart-group w-[1100px] text-right my-3  float-right mr-[60px]">
        <h4 className="chart-box text-xl ">{fieldTypes.find(type => type.key === selectedField)?.label}</h4>
        {filteredCharts.map((chart, chartIndex) => (
          <div key={chartIndex} className="chart-box my-4 ">
            <h5>نمودار {chartIndex + 1}</h5>
            <div className="chart-meta text-lg">
              <p>نماد: {chart.metaData.ua_instrument_symbol_fa}</p>
              <p>نوع اختیار: {chart.metaData.option_type_fa}</p>
              <p>تاریخ سررسید: {chart.metaData.end_date_fa}</p>
            </div>
            {chart.labels.length > 0 ? (
           <Line
           className=''
           data={chart}
           options={{
             responsive: true,
             plugins: {
               title: {
                 display: true,
                 text: `${chartOptions[selectedField].title}`,
                 font: {
                   size: 20, // Title font size
                   family: "Vazir-Medium", // Font family
                   weight: 'bold', // Font weight for title
                 },
               },
               legend: {
                 position: 'top',
                 labels: {
                   font: {
                     size: 17, // Legend font size
                     family: "Vazir-Medium", // Font family for legend
                   },
                 },
               },
             },
             scales: {
               x: {
                 title: {
                   display: true,
                   text: chartOptions[selectedField]?.xaxis_title || 'X Axis',
                   font: {
                     size: 17, // X-axis title font size
                     family: "Vazir-Medium", // Font family for X-axis title
                   },
                 },
                 ticks: {
                   font: {
                     size: 14, // X-axis labels font size
                     family: "Vazir-Medium", // Font family for X-axis labels
                   },
                 },
               },
               y: {
                 title: {
                   display: true,
                   text: fieldTypes.find(type => type.key === selectedField)?.label,
                   font: {
                     size: 16, // Y-axis title font size
                     family: "Vazir-Medium", // Font family for Y-axis title
                   },
                 },
                 ticks: {
                   font: {
                     size: 14, // Y-axis labels font size
                     family: "Vazir-Medium", // Font family for Y-axis labels
                   },
                   callback: function(value) {
                     return value.toFixed(2); // Format ticks
                   },
                 },
                 beginAtZero: true,
               },
               ...chartOptions[selectedField].yaxis.reduce((acc, yaxisConfig) => {
                 acc[`y-axis-${yaxisConfig.yaxis_id}`] = {
                   type: 'linear',
                   display: true,
                   position: yaxisConfig.position || 'left',
                   title: {
                     display: true,
                     text: yaxisConfig.name,
                     font: {
                       size: 14, // Custom font size for y-axis titles
                       family: "Vazir-Medium", // Font family for custom y-axis titles
                     },
                   },
                   beginAtZero: true,
                 };
                 return acc;
               }, {}),
             },
           }}
         />
            ) : (
              <div>No data to display for this chart.</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartIV;
