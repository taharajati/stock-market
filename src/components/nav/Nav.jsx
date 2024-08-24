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
      <div className="flex gap-5 justify-between items-start self-stretch px-6 py-3 w-full whitespace-nowrap bg-[color:var(--color-primary)] max-md:flex-wrap max-md:pl-5 max-md:max-w-full">
        <div className='flex gap-5 justify-between'>
          <Link to="/login" onClick={logout}>خروج</Link>
          <FaUserCircle className='mt-1' />
        </div>
        <div className="flex gap-5 justify-between">
          {permissions?.users && <Link to="/operational_strategies">استراتژی های عملیاتی</Link>}
          {permissions?.branch && <Link to="/calculator">ماشین حساب</Link>}
          {permissions?.branch && <Link to="/screener">دیدبان</Link>}
          {permissions?.branch && <Link to="/home">صفحه اصلی </Link>}

        </div>
      </div>
    </div>
  );
}

export default Nav;
