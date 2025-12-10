// src/pages/LoadingPage.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LargeLogo from '../assets/logo2.jpg'; 
import '../styles/Loading.css'; // 스피너 CSS import

const LoadingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/busan1'); // 3초 후 결과 페이지로 이동
        }, 3000); 

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={{ 
            height: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center',
            backgroundColor: '#f9f9f9' 
        }}>
            <img 
                src={LargeLogo} 
                alt="TRAI Logo" 
                style={{ height: '100px', margin: '0 auto 20px auto', display: 'block' }} 
            />
            
            {/* 로딩 스피너 */}
            <div className="spinner"></div> 
            
            <p style={{ 
                marginTop: '50px', 
                fontSize: '1.5em', 
                color: '#333',
                fontWeight: 'bold'
            }}>
                AI가 일정을 분석하고 있습니다.
            </p>
            <p style={{ fontSize: '1.2em', color: '#666' }}>
                이 계획은 이제 당신의 것입니다.
            </p>
        </div>
    );
};

export default LoadingPage;
