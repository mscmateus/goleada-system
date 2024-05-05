import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <link rel="stylesheet" href="@sweetalert2/theme-material-ui/material-ui.css"></link>
    <script src="sweetalert2/dist/sweetalert2.min.js"></script>
    <App />
  </React.StrictMode>
);
