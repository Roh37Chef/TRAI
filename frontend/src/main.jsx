// src/main.jsx (최종 - MapProvider 추가)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { MapProvider } from 'react-naver-maps'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 👇 전체 앱을 MapProvider로 감싸줍니다. (지도 오류 해결) */}
    <MapProvider> 
        <App />
    </MapProvider>
  </React.StrictMode>,
)
