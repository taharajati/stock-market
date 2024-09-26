import React from 'react';

const SpecificationsTab = ({ data }) => {
  if (!data || !data.data) {
    return <div>بارگذاری...</div>;
  }

  const {
    symbol_fa,
    buy_positions,
    sell_positions,
    contract_size,
    option_type_fa,
    strike_price,
    begin_date_fa,
    end_date_fa,
    days_to_maturity_fa,
    industry_name,
    option_status
  } = data.data;
  const {
    buy_price,
    buy_price_l2,
    buy_price_l3,
    sell_price,
    sell_price_l2,
    sell_price_l3,
    buy_order_volume,
    buy_order_volume_l2,
    buy_order_volume_l3,
    sell_order_volume,
    sell_order_volume_l2,
    sell_order_volume_l3,
  } = data.data;
console.log("data",data)
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4 text-right">
        <div>
          <span className="font-bold">نماد: </span>{symbol_fa}
        </div>
        <div>
          <span className="font-bold">تعداد موقعیت های باز: </span>{buy_positions}
        </div>
        <div>
          <span className="font-bold">اندازه هر قرارداد: </span>{contract_size}
        </div>
        <div>
          <span className="font-bold">نوع اختیار: </span>{option_type_fa}
        </div>
        <div>
          <span className="font-bold">قیمت اعمال: </span>{strike_price}
        </div>
        <div>
          <span className="font-bold">تاریخ شروع قرارداد: </span>{begin_date_fa}
        </div>
        <div>
          <span className="font-bold">تاریخ سررسید: </span>{end_date_fa}
        </div>
        <div>
          <span className="font-bold">تعداد روز کاری تا سررسید: </span>{days_to_maturity_fa}
        </div>
        <div>
          <span className="font-bold">صنعت: </span>{industry_name}
        </div>
        <div>
          <span className="font-bold">وضعیت سود: </span>{option_status}
        </div>
      </div>

      <div className="w-full overflow-x-auto mt-5">
      <table className="min-w-full bg-white border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border-b bg-green-300 border-gray-300">تعداد</th>
            <th className="px-4 py-2 border-b bg-green-300 border-gray-300">حجم</th>
            <th className="px-4 py-2 border-b bg-green-300 border-gray-300">فروش</th>
            <th className="px-4 py-2 border-b bg-red-300 border-gray-300">خرید</th>
            <th className="px-4 py-2 border-b bg-red-300 border-gray-300">حجم</th>
            <th className="px-4 py-2 border-b bg-red-300 border-gray-300">تعداد</th>
          </tr>
        </thead>
        <tbody>
          {/* Level 3 */}
          <tr>
            <td className="px-4 py-2 border-b bg-green-100 border-gray-300">{buy_order_volume_l3}</td>
            <td className="px-4 py-2 border-b bg-green-100 border-gray-300">-</td>
            <td className="px-4 py-2 border-b bg-green-100 border-gray-300">{sell_price_l3}</td>
            <td className="px-4 py-2 border-b bg-red-100    border-gray-300">{buy_price_l3}</td>
            <td className="px-4 py-2 border-b bg-red-100    border-gray-300">-</td>
            <td className="px-4 py-2 border-b bg-red-100    border-gray-300">{sell_order_volume_l3}</td>
          </tr>
          {/* Level 2 */}
          <tr>
            <td className="px-4 py-2 border-b bg-green-100  border-gray-300">{buy_order_volume_l2}</td>
            <td className="px-4 py-2 border-b bg-green-100  border-gray-300">-</td>
            <td className="px-4 py-2 border-b bg-green-100  border-gray-300">{sell_price_l2}</td>
            <td className="px-4 py-2 border-b bg-red-100    border-gray-300">{buy_price_l2}</td>
            <td className="px-4 py-2 border-b bg-red-100    border-gray-300">-</td>
            <td className="px-4 py-2 border-b bg-red-100    border-gray-300">{sell_order_volume_l2}</td>
          </tr>
          {/* Level 1 */}
          <tr>
            <td className="px-4 py-2 border-b bg-green-100  border-gray-300">{buy_order_volume}</td>
            <td className="px-4 py-2 border-b bg-green-100  border-gray-300">-</td>
            <td className="px-4 py-2 border-b bg-green-100  border-gray-300">{sell_price}</td>
            <td className="px-4 py-2 border-b bg-red-100    border-gray-300">{buy_price}</td>
            <td className="px-4 py-2 border-b bg-red-100    border-gray-300">-</td>
            <td className="px-4 py-2 border-b bg-red-100    border-gray-300">{sell_order_volume}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default SpecificationsTab;
