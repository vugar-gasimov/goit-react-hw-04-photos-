import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App.jsx';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContextProvider } from 'Context/ContextProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <App />
    <ToastContainer autoClose={1000} />
  </ContextProvider>
);
//  <React.StrictMode basename="/vugar-gasimov/">
//    <App />
//    <ToastContainer autoClose={1000} />
//  </React.StrictMode>;
