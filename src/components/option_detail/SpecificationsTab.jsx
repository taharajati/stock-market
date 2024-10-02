import React from 'react';

const SpecificationsTab = ({ data }) => {
  if (!data || !data.data) {
    return <div>بارگذاری...</div>;
  }

  const {
    symbol_fa,
    buy_positions,
    sell_positions,
    days_to_maturity_business_days,
    contract_size,
    option_type_fa,
    strike_price,
    begin_date_fa,
    end_date_fa,
    days_to_maturity_fa,
    industry_name,
    option_status,
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

 // Find the maximum for sell_price and sell_order_volume separately for scaling the bars
const maxPrice = Math.max(sell_price_l3, sell_price_l2, sell_price);
const maxVolume = Math.max(sell_order_volume_l3, sell_order_volume_l2, sell_order_volume);

// Helper function to calculate bar width percentage
const getBarWidth = (value, max) => (value / max) * 100;


  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4  w-[650px] mr-6">
       
       <div >
         <div className=' float-right'>
           
         <span className="font-bold">نماد: </span>
         </div>
         <div className=' float-left'>
           
         {symbol_fa}              </div>
      
       </div>
       <div>
         <div className=' float-right'>
           
         <span className="font-bold">تعداد موقعیت های باز: </span>
         </div>
         <div className=' float-left'>
           
         {buy_positions}      
             </div>
      
       </div>
       <div>
         <div className=' float-right'>
           
         <span className="font-bold">اندازه هر قرارداد: </span>
         </div>
         <div className=' float-left'>
           
         {contract_size}          
             </div>
      
       </div>
       <div>
         <div className=' float-right'>
           
         <span className="font-bold">نوع اختیار: </span>
         </div>
         <div className=' float-left'>
           
         {option_type_fa}
             </div>
      
       </div>
       <div>
         <div className=' float-right'>
           
         <span className="font-bold">قیمت اعمال: </span>
         </div>
         <div className=' float-left'>
           
         {strike_price}
             </div>
      
       </div>
       <div>
         <div className=' float-right'>
           
         <span className="font-bold">تاریخ شروع قرارداد: </span>
         </div>
         <div className=' float-left'>
           
         {begin_date_fa}
             </div>
      
       </div>
       <div>
         <div className=' float-right'>
           
         <span className="font-bold">تاریخ سررسید: </span>
         </div>
         <div className=' float-left'>
           
         {end_date_fa}
             </div>
      
       </div>
       <div>
         <div className=' float-right'>
           
         <span className="font-bold">تعداد روز کاری تا سررسید: </span>
         </div>
         <div className=' float-left'>
           
         {days_to_maturity_business_days}
             </div>
      
       </div>
       <div>
         <div className=' float-right'>
           
         <span className="font-bold">صنعت: </span>
         </div>
         <div className=' float-left'>
           
         {industry_name}
             </div>
      
       </div>
       <div>
         <div className=' float-right'>
           
         <span className="font-bold">وضعیت سود: </span>
         </div>
         <div className=' float-left'>
           
         {option_status}
             </div>
      
       </div>
       </div>
     
      <div className="w-full overflow-x-auto mt-5">
        <table className="min-w-full bg-white border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border-b bg-green-300 border-gray-300">حجم</th>
              <th className="px-4 py-2 border-b bg-green-300 border-gray-300">فروش</th>
              <th className="px-4 py-2 border-b bg-red-300 border-gray-300">خرید</th>
              <th className="px-4 py-2 border-b bg-red-300 border-gray-300">حجم</th>
            </tr>
          </thead>
          <tbody>
  {/* Level 3 */}
  <tr>
    <td className="px-4 py-2 border-b bg-green-100 border-gray-300">{buy_price_l3}</td>
    <td className="relative px-4 py-2 border-b border-gray-300">
      <div className="absolute top-0 left-0 h-full bg-green-400 opacity-60" style={{ width: `${getBarWidth(sell_order_volume_l3, maxVolume)}%` }}></div>
      <span className="relative z-10">{sell_order_volume_l3}</span>
    </td>
    <td className="relative px-4 py-2 border-b border-gray-300">
      <div className="absolute top-0 right-0 h-full  bg-red-400 opacity-60" style={{ width: `${getBarWidth(sell_price_l3, maxPrice)}%` }}></div>
      <span className="relative z-10">{sell_price_l3}</span>
    </td>
    <td className="px-4 py-2 border-b bg-red-100 border-gray-300">{buy_order_volume_l3}</td>
  </tr>

  {/* Level 2 */}
  <tr>
    <td className="px-4 py-2 border-b bg-green-100 border-gray-300">{buy_price_l2}</td>
    <td className="relative px-4 py-2 border-b border-gray-300">
      <div className="absolute top-0 left-0 h-full bg-green-400 opacity-60" style={{ width: `${getBarWidth(sell_order_volume_l2, maxVolume)}%` }}></div>
      <span className="relative z-10">{sell_order_volume_l2}</span>
    </td>
    <td className="relative px-4 py-2 border-b border-gray-300">
      <div className="absolute top-0 right-0 h-full bg-red-400 opacity-60" style={{ width: `${getBarWidth(sell_price_l2, maxPrice)}%` }}></div>
      <span className="relative z-10">{sell_price_l2}</span>
    </td>
    <td className="px-4 py-2 border-b bg-red-100 border-gray-300">{buy_order_volume_l2}</td>
  </tr>

  {/* Level 1 */}
  <tr>
    <td className="px-4 py-2 border-b bg-green-100 border-gray-300">{buy_price}</td>
    <td className="relative px-4 py-2 border-b border-gray-300">
      <div className="absolute top-0 left-0 h-full bg-green-400 opacity-60" style={{ width: `${getBarWidth(sell_order_volume, maxVolume)}%` }}></div>
      <span className="relative z-10">{sell_order_volume}</span>
    </td>
    <td className="relative px-4 py-2 border-b border-gray-300">
      <div className="absolute top-0 right-0 h-full bg-red-400 opacity-60" style={{ width: `${getBarWidth(sell_price, maxPrice)}%` }}></div>
      <span className="relative z-10">{sell_price}</span>
    </td>
    <td className="px-4 py-2 border-b bg-red-100 border-gray-300">{buy_order_volume}</td>
  </tr>
</tbody>

        </table>
      </div>
    </div>
  );
};

export default SpecificationsTab;
