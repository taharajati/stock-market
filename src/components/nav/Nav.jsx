import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  return (
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
    </div>
  );
}

export default Nav;
