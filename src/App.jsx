
import React, { useState } from 'react';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
function App() {
  const [accessToken, setAccessToken] = useState(null);
  return (
    <>
     <BrowserRouter>
      <Routes>
         <Route path="*" element={accessToken ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
         <Route path="/login" element={<Login setAccessToken={setAccessToken} />} />
         <Route path="/dashboard" element={<Dashboard setAccessToken={setAccessToken} />} />
         </Routes> 
    </BrowserRouter>
    </>
  )
}

export default App
