import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

// Register Chart.js components and annotation plugin
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, annotationPlugin);


const ChartIV = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartOptions, setChartOptions] = useState({});
  const [selectedField, setSelectedField] = useState('implied_volatility'); // Default filter
  const [selectedDueDate, setSelectedDueDate] = useState('');
  const [selectedOptionType, setSelectedOptionType] = useState('');
  const [selectedUaInstrumentSymbolFa, setSelectedUaInstrumentSymbolFa] = useState(''); // New filter

    // Linear interpolation function
    const interpolateValue = (value, x1, y1, x2, y2) => {
      const slope = (y2 - y1) / (x2 - x1);
      const intercept = y1 - slope * x1;
      return slope * value + intercept;
    };


  // Fetch data from the API for charts
  const fetchChartData = async () => {
    try {
      setLoading(true)
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
      setLoading(true)
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




  // Find the closest lower and higher strike prices around ua_final
const getClosestStrikePrices= (strikePrices, ua_final) => {
  const sortedStrikePrices = [...strikePrices].sort((a, b) => a - b);
  let x1, x2, y1, y2;

  // Initialize x1 and x2 with default values
  x1 = x2 = undefined;
  y1 = y2 = undefined;

  // Iterate through the sorted array to find the closest lower and higher values
  for (let i = 0; i < sortedStrikePrices.length; i++) {
    if (ua_final < sortedStrikePrices[i]) {
      x2 = sortedStrikePrices[i];
      y2 = i;
      if (i > 0) {
        x1 = sortedStrikePrices[i - 1];
        y1 = i - 1;
      }
      break;
    }
  }

  // Handle edge case if ua_final is less than the smallest value
  if (x1 === undefined && y1 === undefined) {
    x1 = sortedStrikePrices[0];
    y1 = 0;
    x2 = sortedStrikePrices[1];
    y2 = 1;
  }

  // Handle edge case if ua_final is greater than the largest value
  if (x2 === undefined && y2 === undefined) {
    x1 = sortedStrikePrices[sortedStrikePrices.length - 2];
    y1 = sortedStrikePrices.length - 2;
    x2 = sortedStrikePrices[sortedStrikePrices.length - 1];
    y2 = sortedStrikePrices.length - 1;
  }

  return { x1, x2, y1, y2 };
};


  // Prepare chart data with multiple y-axes
  const getChartData = () => {
    const fieldOptions = chartOptions[selectedField];
    if (!fieldOptions) return [];

    return filteredData?.map((item, index) => {
      const strikePrices = Array.from(new Set(item.strike_price)); // Filtered strike prices for the current chart
      const { x1, x2, y1, y2 } = getClosestStrikePrices(strikePrices, item.ua_final);
      const datasets = fieldOptions.yaxis.map(yaxisConfig => ({
        label: yaxisConfig.name,
        data: item[yaxisConfig.variable],
        borderColor: yaxisConfig.color || 'rgba(75, 192, 192, 1)',
        backgroundColor: yaxisConfig.chart_type === 'bar' ? (yaxisConfig.color || 'rgba(75, 192, 192, 0.2)') : 'transparent',
        type: yaxisConfig.chart_type,
        fill: yaxisConfig.chart_type === 'line',
        tension: 0,  // Set this to 0 for straight lines
        yAxisID: `y-axis-${yaxisConfig.yaxis_id}`,
      }));


     console.log("strikePrices",strikePrices)

      console.log(`x1: ${x1}, y1: ${y1}`);

      console.log(`x2: ${x2}, y2: ${y2}`);
      const interpolatedValue = interpolateValue(item.ua_final, x1, y1, x2, y2);
      console.log("interpolatedValue",interpolatedValue)

   // Default annotation for ua_final for each chart
   const defaultAnnotation = {
    type: 'line',
    scaleID: 'x',
    value: interpolatedValue ,  // Use dynamic value from annotation or ua_final
    borderColor: 'blue',  // Default color for ua_final annotation
    borderWidth: 2,
    borderDash: [4,4],
    label: {
      content: 'UA Final',
      enabled: true,
      position: 'center',
    },
  };

  const annotations = fieldOptions.annotation?.map(annot => ({
    type: 'line',
    scaleID: 'x',
    value: item[annot.value],  // Use dynamic value from annotation
    borderColor: annot.borderColor || 'red',
    borderWidth: annot.borderWidth || 2,
    label: annot.displayLabel ? {
      content: annot.label || '',
      enabled: true,
      position: 'start',
    } : undefined,
  })) || [defaultAnnotation];  // Include defaultAnnotation if no other annotations
      console.log("annotationss",annotations)

      return {
        labels: item.strike_price,
        datasets,
        metaData: {
          ua_instrument_symbol_fa: item.ua_instrument_symbol_fa,
          option_type_fa: item.option_type_fa,
          end_date_fa: item.end_date_fa,
          symbol_fa: item.symbol_fa,  // Add symbol_fa for tooltips
        },
        annotations, // Add annotations here
      };
    }) || [];
  };
  const filteredCharts = getChartData();

  if (loading) return  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-700"></div>
</div>;
  if (error) return  <div className="fixed inset-0 flex items-center justify-center z-50">
  <div className="bg-white rounded-lg p-5 max-w-md w-full mx-auto shadow-lg border-e-red-50">
    <p className="text-2xl font-semibold mb-4 text-center text-[color:var(--color-primary-variant)]">{error}</p>
  </div></div>;
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
            <div className="chart-meta flex space-x-5 text-lg justify-center">
              <p className='bg-[color:var(--color-bg)] text-black  rounded-lg px-4 py-2'>نماد: {chart.metaData.ua_instrument_symbol_fa}</p>
              <p className='bg-[color:var(--color-bg)] text-black  rounded-lg px-4 py-2'>نوع اختیار: {chart.metaData.option_type_fa}</p>
              <p className='bg-[color:var(--color-bg)] text-black  rounded-lg px-4 py-2'>تاریخ سررسید: {chart.metaData.end_date_fa}</p>
            </div>
            {chart.labels.length > 0 ? (
        <Line
        data={chart}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `${chartOptions[selectedField].title}`,
              font: {
                size: 20,
                family: "Vazir-Medium",
                weight: 'bold',
              },
            },
            legend: {
              position: 'top',
              labels: {
                font: {
                  size: 17,
                  family: "Vazir-Medium",
                },
              },
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  const chartIndex = tooltipItem.datasetIndex;
                  const pointIndex = tooltipItem.dataIndex;
                  const symbol = filteredCharts[chartIndex].metaData.symbol_fa[pointIndex];
                  const value = tooltipItem.raw;
                  return `نماد پایه: ${symbol}, ارزش: ${value}`;
                },
              },
            },
            annotation: {
              annotations: chart.annotations, // Use the annotations here
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: chartOptions[selectedField]?.xaxis_title || 'X-Axis',
                font: {
                  size: 17,
                  family: "Vazir-Medium",
                },
              },
              ticks: {
                font: {
                  size: 14,
                  family: "Vazir-Medium",
                },
              },
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
                    size: 14,
                    family: "Vazir-Medium",
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
