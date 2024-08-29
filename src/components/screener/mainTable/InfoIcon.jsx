import React, { useState } from 'react';

// InfoIcon Component
const InfoIcon = ({ text }) => {

   const columnInfo = {
    symbol_fa: {
      style: { width: '150px', textAlign: 'right', color: 'black',fontWeight:"bold" },

    },
    a_factor: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",

    },
    b_factor: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",

    },
    c_factor: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    contract_size: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    days_to_maturity: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    days_to_maturity_business_days: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    begin_date: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },

    end_date: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },

    industry_code: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    industry_name: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    instrument_code: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    instrument_id: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },


    average_spread: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    average_spread_percent_of_mid_price: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },


    bid_ask_spread_percent: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    bid_ask_spread_score: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },

    bs_price_to_buy_price: {
      style: { textAlign: 'center'},
      text:"این اطلاعات است",
    },
    bs_price_to_sell_price: {
      style: { textAlign: 'center'},
      text:"این اطلاعات است",
    },
    buy_positions: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    buy_price: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },

    close: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },


    final: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    high: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    implied_volatility_last: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    implied_volatility_max_all: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },implied_volatility_max_month: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },implied_volatility_mean_month: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    implied_volatility_min_all: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    implied_volatility_min_month: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    implied_volatility_rank: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    implied_volatility_to_average_month: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },implied_volatility_to_same_ua_implied_volatility_percent: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },implied_volatility_vs_realized_volatility_month: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",

    },

    intrinsic_value_bs: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    is_tab: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    liquidity_score: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    low: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    open: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    notional_value: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    old: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },

    open_interest_score: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    option_status: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    option_type: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    option_type_fa: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    probability_of_profit: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    put_call_ratio: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    rho: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    theta: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    delta: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    gamma: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    vega: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },

    same_ua_average_implied_volatility: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    sell_positions: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    sell_price: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    strike_price: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },

    trades_count: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    ua_close: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    ua_final: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    ua_instrument_code: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    ua_instrument_id: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    ua_instrument_symbol_fa: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    ua_volatility_day: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    ua_volatility_week: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    ua_volatility_year: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    ua_volume: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    ua_volume_count: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },

    volatility_skew_horizontal: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    volatility_skew_horizontal_value: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    volatility_skew_vertical: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    volatility_skew_vertical_value: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    volume: {
      style: { textAlign: 'center', color: 'black' },
text:"این اطلاعات است",
    },
    volume_count: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    volume_score: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    },
    yesterday_positions: {
      style: { textAlign: 'center', color: 'black' },
      text:"این اطلاعات است",
    }
  };

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Circle with "?" Icon */}
      <div
        onClick={togglePopup}
        style={{
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          backgroundColor: '#2F657D',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '10px',
        }}
      >
        ?
      </div>

      {/* Popup Box */}
      {showPopup && (
        <div
          style={{
            position: 'absolute',
            top: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            width: '400px',
          }}
        >
          <p>{text}</p>
          <button
            onClick={togglePopup}
            style={{
              cursor: 'pointer',
              backgroundColor: '#2F657D',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '4px',
              marginTop: '10px',
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default InfoIcon;
