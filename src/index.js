import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";

import { store } from './redux/store'
import { Provider } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
  <BrowserRouter>
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
  </BrowserRouter>
 
  </Provider>
);

reportWebVitals();
