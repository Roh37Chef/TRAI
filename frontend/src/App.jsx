import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { NavermapsProvider } from 'react-naver-maps';

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage'; 
import MapPage from './pages/MapPage'; 
import WelfarePage from './pages/WelfarePage'; 

function App() {
    return (
        <NavermapsProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/main" element={<MainPage />} />
                    
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/welfare" element={<WelfarePage />} />
                </Routes>
            </Router>
        </NavermapsProvider>
    );
}

export default App;
