/*import './style.css';
import React, { useState } from 'react';
import Nav from './components/nav/Nav';
import MyTable from './components/mainTable/MyTable';
import Filter01 from './components/Filters/Filter01/Filter01';
import Filter02 from './components/Filters/Filter02/Filter02';
import Filter04 from './components/Filters/Filter04/Filter04';
import DateFilter from './components/Filters/datefilter/DateFilter';
import MyChart from './components/charts/MyChart';



function App() {
  const [filterValues, setFilterValues] = useState({
    filter01: '',
    filter02: '', // Add filter02 state
    startDate: null,
    endDate: null,
    filter04: '',
    filter05: 1,
  });

  const handleFilter02Change = (value) => {
    setFilterValues({ ...filterValues, filter02: value });
  };

  const handleDateFilterChange = (dateFilterValues) => {
    setFilterValues({ ...filterValues, ...dateFilterValues });
  };

  const handleFilter04Change = (optionType) => {
    setFilterValues({ ...filterValues, filter04: optionType });
    console.log('Filter04 Value:', optionType);
  };
  return (
    <>
    
      <Nav />
     
      <Filter01 setFilterValue={(value) => setFilterValues({ ...filterValues, filter01: value })} />
      <Filter02 onFilterChange={handleFilter02Change} />
      <Filter04 onFilterChange={handleFilter04Change} />
     

      <DateFilter onFilterChange={handleDateFilterChange} />

      //<br />
  
      <MyTable filterValues={filterValues} />
    </>
  );
}

export default App;
*/

import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './style.css';
import Nav from './components/nav/Nav';
import Login from './components/Login/Login';
import MyTable from './components/mainTable/MyTable';
import Filter01 from './components/Filters/Filter01/Filter01';
import Filter02 from './components/Filters/Filter02/Filter02';
import Filter04 from './components/Filters/Filter04/Filter04';
import DateFilter from './components/Filters/datefilter/DateFilter';
import MyChart from './components/charts/MyChart';
import OpStrategies from './components/operational_strategies/operational_strategies';
import Home from './components/operational_strategies/operational_strategies';

import { ReportProvider } from './components/context';

export const PermissionsContext = createContext();
export const LogoutContext = createContext();


function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [permissions, setPermissions] = useState(null);


  useEffect(() => {
    const checkTokenValidity = async () => {
      const storedToken = localStorage.getItem('accessToken');
      if (storedToken) {
        try {
          const response = await fetch('https://api.optionscreener.ir/api/auth/get_user', {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            setPermissions(data.data.permission); // Set permissions
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            localStorage.removeItem('accessToken');
          }
        } catch (error) {
          console.error('Error checking token validity:', error);
          setIsAuthenticated(false);
          localStorage.removeItem('accessToken');
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkTokenValidity();
  }, []);



  if (loading) {
    return null; // Render nothing until token validation is complete
  }

  return (
    <ReportProvider>
      <PermissionsContext.Provider value={permissions}>
      <LogoutContext.Provider value={{ setIsAuthenticated, setPermissions }}>

        <Router>
          <div>
          {isAuthenticated && window.location.pathname !== '/login' && <Nav />}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/screener" element={isAuthenticated ? <MyTable /> : <Navigate to="/login" />} />
              <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
              <Route path="/operational_strategies" element={isAuthenticated ? <OpStrategies /> : <Navigate to="/login" />} />
              <Route path="/" element={<Navigate to="/login" />} />

            </Routes>
          </div>
        </Router>
        </LogoutContext.Provider>

      </PermissionsContext.Provider>
    </ReportProvider>
  );
}

export default App;
