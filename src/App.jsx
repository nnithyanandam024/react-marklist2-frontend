import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import MarkEntry from './components/MarkEntry';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/marks" element={<MarkEntry />} />
    </Routes>
  );
}

export default App;
