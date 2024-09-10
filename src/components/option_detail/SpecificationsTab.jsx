import React from 'react';

// Utility function to convert numbers to Persian numerals
const toPersianNumerals = (number) => {
  const persianNumerals = '۰۱۲۳۴۵۶۷۸۹';
  return String(number).replace(/\d/g, (digit) => persianNumerals[digit]);
};

// Utility function to format date in Persian (assuming you have a function to convert Gregorian to Persian)
const formatDateToPersian = (date) => {
  // Implement conversion logic if you have it
  return date; // Placeholder
};

const SpecificationsTab = ({ data }) => {
  if (!data) {
    return <div className="text-center text-lg text-blue-700">در حال بارگذاری...</div>; // Persian for "Loading..."
  }

  // Extracting the necessary data from specificationsResponse
  const {
    open,
    high,
    low,
    close,
    volume,
    volume_count,
    trades_count,
    implied_volatility_last,
    implied_volatility_mean_month,
    historicalPriceData
  } = data.data;

  // Format 5-Day Change and 52-Week Range (placeholders as actual calculation requires historical data)
  const fiveDayChange = "N/A"; // Placeholder
  const fiveDayChangePercent = "N/A"; // Placeholder
  const fiftyTwoWeekRange = `${toPersianNumerals(low.toFixed(2))} - ${toPersianNumerals(high.toFixed(2))}`;

  // Generate performance data rows if available
  const performanceRows = historicalPriceData?.slice(0, 5).map((item, index) => (
    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
      <td className="py-2 px-4 border-b">{formatDateToPersian(item.date)}</td>
      <td className="py-2 px-4 border-b">{toPersianNumerals(item.last)}</td>
      <td className="py-2 px-4 border-b">{toPersianNumerals(item.change)}</td>
      <td className="py-2 px-4 border-b">{toPersianNumerals(item.chgPercent)}</td>
    </tr>
  )) || (
    <tr>
      <td colSpan="4" className="py-2 text-center italic text-gray-500">اطلاعات عملکرد در دسترس نیست</td> {/* Persian for "No performance data available" */}
    </tr>
  );

  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-white max-w-md mx-auto shadow-md">
      <h2 className="text-center text-2xl font-bold text-[color:var(--color-bg-variant)] mb-4">بررسی اجمالی</h2> {/* Persian for "Overview" */}
      <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <div className="mb-2 text-lg text-gray-700">
          <strong>پایین‌ترین قیمت روز:</strong> {toPersianNumerals(low.toFixed(2))}
        </div>
        <div className="mb-2 text-lg text-gray-700">
          <strong>بالا‌ترین قیمت روز:</strong> {toPersianNumerals(high.toFixed(2))}
        </div>
        <div className="mb-2 text-lg text-gray-700">
          <strong>قیمت باز شدن:</strong> {toPersianNumerals(open.toFixed(2))}
        </div>
        <div className="mb-2 text-lg text-gray-700">
          <strong>بسته شدن قبلی:</strong> {toPersianNumerals(close.toFixed(2))}
        </div>
        <div className="mb-2 text-lg text-gray-700">
          <strong>حجم:</strong> {toPersianNumerals(volume.toLocaleString())}
        </div>
        <div className="mb-2 text-lg text-gray-700">
          <strong>میانگین حجم:</strong> {toPersianNumerals(volume_count.toLocaleString())}
        </div>
        <div className="mb-2 text-lg text-gray-700">
          <strong>تغییر ۵ روزه:</strong> {fiveDayChange} ({fiveDayChangePercent})
        </div>
        <div className="text-lg text-gray-700">
          <strong>دامنه ۵۲ هفته:</strong> {fiftyTwoWeekRange}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-[color:var(--color-primary)] mb-4">عملکرد - ۵ روز گذشته</h3> {/* Persian for "Performance - Past 5 Days" */}
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b text-left">تاریخ</th> {/* Persian for "Date" */}
              <th className="py-2 px-4 border-b text-left">آخرین</th> {/* Persian for "Last" */}
              <th className="py-2 px-4 border-b text-left">تغییر</th> {/* Persian for "Change" */}
              <th className="py-2 px-4 border-b text-left">% تغییر</th> {/* Persian for "%Chg" */}
            </tr>
          </thead>
          <tbody>
            {performanceRows}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpecificationsTab;
