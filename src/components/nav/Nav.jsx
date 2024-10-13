/*import React from 'react'
import './Nav.css'

const Nav = () => {
  return (
    <>
      <div className="bg-cyan-800 flex h-20 w-full flex-col ">
       <p className=' text-right my-6 me-2 text-white'>دیدبان اختیار</p>
       <p className=' text-right my-6 me-2 text-white'>IV chart</p>
      </div>




     </>
  )
}

export default Nav*/

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { PermissionsContext, LogoutContext } from '../../App'; // Import the contexts

const Nav = () => {
  //const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const permissions = useContext(PermissionsContext); // Use the context
  const navigate = useNavigate();
  const { setIsAuthenticated, setPermissions } = useContext(LogoutContext); // Use the logout context


  //const toggleDropdown = () => {
  //  setIsDropdownOpen(!isDropdownOpen);
  //};

  //const closeDropdown = () => {
  //  setIsDropdownOpen(false);
  //};

  const logout = () => {
    setIsAuthenticated(false);
    setPermissions(null);
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center pb-9 text-center text-[color:var(--color-light)] bg-white">
      <div className="flex gap-5 justify-between items-start self-stretch px-6 py-3 w-full whitespace-nowrap bg-[color:var(--color-primary)]  max-md:flex-wrap max-md:pl-5 max-md:max-w-full">
        <div className='flex gap-5 justify-between'>
          <Link to="/login" onClick={logout} className='hover:bg-[color:var(--color-bg-variant)] p-2 rounded-lg scale-105 transition duration-500'>خروج</Link>
          {/* <FaUserCircle className='mt-1 top-20' />*/}
        </div>
        <div className="flex gap-5 justify-between ">
          {permissions?.operational_strategies && <Link to="/operational_strategies " className='hover:bg-[color:var(--color-bg-variant)] p-2 rounded-lg scale-105 transition duration-500 '>استراتژی های عملیاتی</Link>}
          <Link to="/ChartIV " className='hover:bg-[color:var(--color-bg-variant)] p-2 rounded-lg scale-105 transition duration-500 '>نمودار  </Link>
          {permissions?.calculator && <Link to="/Calculation" className='hover:bg-[color:var(--color-bg-variant)] p-2 rounded-lg scale-105 transition duration-500'>ماشین حساب</Link>}
          {permissions?.screener && <Link to="/screener" className='hover:bg-[color:var(--color-bg-variant)] p-2 rounded-lg scale-105 transition duration-500'>دیدبان</Link>}
          {permissions?.home && <Link to="/home" className='hover:bg-[color:var(--color-bg-variant)] p-2 rounded-lg scale-105 transition duration-500'>صفحه اصلی </Link>}

        </div>
      </div>
    </div>
  );
}

export default Nav;
