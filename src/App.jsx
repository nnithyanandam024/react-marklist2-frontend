import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import MarkEntry from './components/MarkEntry';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/marks" element={<MarkEntry />} />
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;
