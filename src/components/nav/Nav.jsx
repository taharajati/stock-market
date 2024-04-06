import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  return (
<<<<<<< HEAD
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
=======
    <div className="flex flex-col items-center pb-9 text-xs text-center text-black bg-white">
      <div className="flex gap-5 justify-between items-start self-stretch px-6 py-3 w-full whitespace-nowrap bg-emerald-300 max-md:flex-wrap max-md:pl-5 max-md:max-w-full">
        <Link to="/exit">خروج</Link>
        <Link to="/login">ورود</Link>
        <div className="flex gap-5 justify-between">
          <Link to="/users">کارکنان</Link>
          <Link to="/branches">شعب</Link>
          <Link to="/reports">گزارشات</Link>
          <Link to="/files">پرونده</Link>
        </div>
      </div>
>>>>>>> 19be6ef33508cbbb3d5fb6f17bc25ec75f8945de
    </div>
  );
}

export default Nav;
