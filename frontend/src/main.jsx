// src/main.jsx (최종 - MapProvider 제거 후 복구)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// MapProvider import를 제거합니다.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* MapProvider를 제거합니다. */}
    <App />
  </React.StrictMode>,
)
