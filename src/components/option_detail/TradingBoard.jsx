import React from 'react';

const TradingBoard = ({ data }) => {
  if (!data) {
    return <div>بارگذاری...</div>;
  }

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
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4 w-[650px] mr-6">
        <div>
          <div className="float-right">
            <span className="font-bold">نماد پایه: </span>
          </div>
          <div className="float-left">
            {ua_instrument_symbol_fa}
          </div>
        </div>
        <div>
          <div className="float-right">
            <span className="font-bold">قیمت پایانی: </span>
          </div>
          <div className="float-left">
            {ua_final}
          </div>
        </div>
        <div>
          <div className="float-right">
            <span className="font-bold">قیمت آخرین معامله: </span>
          </div>
          <div className="float-left">
            {ua_close}
          </div>
        </div>
        <div>
          <div className="float-right">
            <span className="font-bold">حجم معاملات: </span>
          </div>
          <div className="float-left">
            {ua_volume_count}
          </div>
        </div>
        <div>
          <div className="float-right">
            <span className="font-bold">ارزش معاملات: </span>
          </div>
          <div className="float-left">
            {ua_volume}
          </div>
        </div>
        <div>
          <div className="float-right">
            <span className="font-bold">نوسان‌پذیری هفته: </span>
          </div>
          <div className="float-left">
            {ua_volatility_week}%
          </div>
        </div>
        <div>
          <div className="float-right">
            <span className="font-bold">نوسان‌پذیری سال: </span>
          </div>
          <div className="float-left">
            {ua_volatility_year}%
          </div>
        </div>
        <div>
          <div className="float-right">
            <span className="font-bold">نوسان‌پذیری روز: </span>
          </div>
          <div className="float-left">
            {ua_volatility_day}%
          </div>
        </div>
        <div>
          <div className="float-right">
            <span className="font-bold">کد نماد پایه: </span>
          </div>
          <div className="float-left">
            {ua_instrument_code}
          </div>
        </div>
        <div>
          <div className="float-right">
            <span className="font-bold">شناسه نماد پایه: </span>
          </div>
          <div className="float-left">
            {ua_instrument_id}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingBoard;
