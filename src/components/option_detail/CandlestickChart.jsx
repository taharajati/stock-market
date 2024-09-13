import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import moment from 'moment-jalaali'; // Import moment-jalaali for Persian date handling

const monthNames = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];

const CandlestickChart = ({ data }) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        localization: {
          // Customize the time formatter for the x-axis labels
          timeFormatter: (time) => {
            // Convert Unix timestamp to Jalaali date and format it
            return moment.unix(time).format('jYYYY/jM/jD');
          },
        },
        timeScale: {
          timeVisible: true,
          tickMarksVisible: true,
          borderColor: '#4f4f4f',
          borderVisible: false,
        },
        layout: {
          textColor: '#000000', // Set text color to improve readability
          background: { type: 'solid', color: '#f8f8f8' }, // Optional: dark background for better contrast
        },
      });

      const series = chart.addCandlestickSeries({
        upColor: 'green',
        borderUpColor: 'green',
        wickUpColor: 'green',
        downColor: 'red',
        borderDownColor: 'red',
        wickDownColor: 'red',
      });

      // Custom time formatter for x-axis labels
      chart.timeScale().applyOptions({
        tickMarkFormatter: (time) => {
          const date = moment.unix(time);
          const month = date.format('jM') - 1; // Get the Persian month index (0-based)
          const year = date.format('jYYYY');
          return `${monthNames[month]} ${year}`;
        }
      });

      // Process and sort data
      if (data && Array.isArray(data.data)) {
        const processedData = data.data
          .map((item) => ({
            time: item.date_timestamp, // Unix timestamp in seconds
            open: item.open,
            high: item.high,
            low: item.low,
            close: item.close,
          }))
          .filter((item, index, self) =>
            index === self.findIndex((t) => t.time === item.time) // Remove duplicates
          )
          .sort((a, b) => a.time - b.time); // Sort by time in ascending order
          
        series.setData(processedData);
      } else {
        console.error('Invalid data format:', data);
      }

      return () => chart.remove();
    }
  }, [data]);

  return <div ref={chartContainerRef} style={{ position: 'relative', width: '100%', height: '350px' }} />;
};

export default CandlestickChart;
