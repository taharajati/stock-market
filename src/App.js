import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './style.css'
import Nav from './components/nav/Nav';
import Login from './components/Login/Login';
import UserList from './components/UserList/UserList';
import BranchList from './components/BranchList/BranchList';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/branches" element={<BranchList/>} />
          {/* Add more routes for other pages */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
