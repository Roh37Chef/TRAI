// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { NavermapsProvider } from 'react-naver-maps';

// ... (기존 import 유지)
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage'; 
import LoginSuccessPage from './pages/LoginSuccessPage';
import Option1Page from './pages/Option1Page'; 
import Option2Page from './pages/Option2Page';
import Option3Page from './pages/Option3Page';
import Option4Page from './pages/Option4Page';
import Option5Page from './pages/Option5Page';
import Option6Page from './pages/Option6Page';

// 👇 새로 추가된 Pages import 👇
import LoadingPage from './pages/LoadingPage'; 
import Busan1Page from './pages/Busan1Page';

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
                    <Route path="/loginsuccess" element={<LoginSuccessPage />} /> 
                    
                    <Route path="/option1" element={<Option1Page />} />
                    <Route path="/option2" element={<Option2Page />} />
                    <Route path="/option3" element={<Option3Page />} />
                    <Route path="/option4" element={<Option4Page />} />
                    <Route path="/option5" element={<Option5Page />} />
                    <Route path="/option6" element={<Option6Page />} />
                    
                    {/* 👇 새로운 경로 추가 👇 */}
                    <Route path="/loading" element={<LoadingPage />} />
                    <Route path="/busan1" element={<Busan1Page />} />
                    
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/welfare" element={<WelfarePage />} />
                </Routes>
            </Router>
        </NavermapsProvider>
    );
}

export default App;
