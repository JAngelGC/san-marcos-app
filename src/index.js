import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// import { BrowserRouter } from 'react-router-dom'

import Produccion from './pages/Produccion';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Compras from './pages/Compras';
import Forecast from './pages/Forecast';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>


    <BrowserRouter>
      <App />
      <Routes>
        <Route exact path="/produccion" element={<Produccion />} />
        <Route exact path="/compras" element={<Compras />} />
        <Route exact path="/forecast" element={<Forecast />} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);

