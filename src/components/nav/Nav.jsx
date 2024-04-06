import React from 'react'
import './Nav.css'

const Nav = () => {
  return (
    <div className="flex flex-col items-center pb-9 text-xs text-center text-black bg-white max-w-[756px]">
      <div className="flex gap-5 justify-between items-start self-stretch px-6 py-3 w-full whitespace-nowrap bg-emerald-300 max-md:flex-wrap max-md:pl-5 max-md:max-w-full">
        <div>خروج</div>
        <div className="flex gap-5 justify-between">
          <a href="#" >کارکنان </a>
          <a href="#"> شعب </a>
          <a href="#"> گزارشات </a>
          <a href="#"> پرونده </a>
        </div>
      </div>
      <div className="shrink-0 mt-2 max-w-full h-0.5 bg-black border border-black border-solid w-[634px]" />
    </div>
  );
}

export default Nav