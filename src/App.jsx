import React, { useState } from 'react';
import GeneratePrim from './components/GeneratePrim';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Store from './components/Store';
import './styles/main.css'

function App() {

  return (
    <div className="cont">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/math' element={<GeneratePrim/>}/>
        <Route path='/store' element={<Store/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;