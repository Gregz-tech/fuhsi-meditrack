import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Import Bootstrap CSS and your custom CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);