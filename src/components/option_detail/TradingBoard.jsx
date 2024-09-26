import React from 'react';

const TradingBoard = ({ data }) => {
  if (!data) {
    return <div>بارگذاری...</div>;
  }

  // Extracting relevant data
  const {
    ua_instrument_id,
    ua_instrument_code,
    ua_final,
    ua_close,
    ua_volatility_week,
    ua_volatility_year,
    ua_instrument_symbol_fa,
    ua_volume,
    ua_volume_count,
    ua_volatility_day,
  } = data.data;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">مشخصات دارایی پایه</h2>
      <div className="grid grid-cols-2 gap-4 text-right">
        <div>
          <span className="font-bold">نماد پایه: </span>{ua_instrument_symbol_fa}
        </div>
        <div>
          <span className="font-bold">قیمت پایانی: </span>{ua_final}
        </div>
        <div>
          <span className="font-bold">قیمت آخرین معامله: </span>{ua_close}
        </div>
        <div>
          <span className="font-bold">حجم معاملات: </span>{ua_volume_count}
        </div>
        <div>
          <span className="font-bold">ارزش معاملات: </span>{ua_volume}
        </div>
        <div>
          <span className="font-bold">نوسان‌پذیری هفته: </span>{ua_volatility_week}%
        </div>
        <div>
          <span className="font-bold">نوسان‌پذیری سال: </span>{ua_volatility_year}%
        </div>
        <div>
          <span className="font-bold">نوسان‌پذیری روز: </span>{ua_volatility_day}%
        </div>
        <div>
          <span className="font-bold">کد نماد پایه: </span>{ua_instrument_code}
        </div>
        <div>
          <span className="font-bold">شناسه نماد پایه: </span>{ua_instrument_id}
        </div>
      </div>
    </div>
  );
};

export default TradingBoard;
