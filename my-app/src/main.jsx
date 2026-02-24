import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// This is the new line that imports the analytics tool
import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* This is the tag that actually tracks the visits */}
    <Analytics />
  </React.StrictMode>,
)
