// src/pages/MainPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import TraiLogoFull from '../assets/logo2.jpg'; // <-- 파일 이름 logo2.jpg로 수정
import MainBackgroundImage from '../assets/background.jpg'; // <-- 배경 이미지 이름 background.jpg로 수정

const backgroundStyle = {
    // import한 변수를 사용하도록 변경
    backgroundImage: `url(${MainBackgroundImage})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 'calc(100vh - 70px)', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '0 80px',
    color: 'white',
    textShadow: '0 0 5px rgba(0,0,0,0.8)',
    backgroundColor: 'rgba(0,0,0,0.5)', 
};

const MainPageHeader = () => {
    const navigate = useNavigate();
    
    return (
        <header style={{ 
            padding: '20px 40px', 
            borderBottom: '1px solid #eee', 
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <img 
                src={TraiLogoFull}
                alt="TRAI Logo" 
                style={{ height: '30px', cursor: 'pointer' }} 
                onClick={() => navigate('/')} 
            />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate('/login')}>
                    Login
                </span>
                <span style={{ 
                    cursor: 'pointer', 
                    border: '1px solid #333', 
                    padding: '8px 15px', 
                    borderRadius: '4px' 
                }} onClick={() => navigate('/signup')}>
                    Sign up
                </span>
            </div>
        </header>
    );
};

function MainPage() {
    // ... (MainPage 컴포넌트 내용은 변경 없음)
    return (
        <>
            <MainPageHeader /> 
            
            <div style={backgroundStyle}>
                <p style={{ fontSize: '1.2em', marginBottom: '10px' }}>
                    블로그 속 여행 경로, 내 취향을 읽다
                </p>
                <h1 style={{ fontSize: '3em', fontWeight: 'bold', margin: '0' }}>
                    나를 위한 여행, TRAI
                </h1>
                
                <button 
                    style={{ 
                        padding: '12px 30px', 
                        backgroundColor: '#1B2C4F', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginTop: '30px',
                        fontSize: '1em'
                    }}
                    onClick={() => console.log('AI 추천 시작')}
                >
                    AI 여행 추천 시작하기
                </button>
            </div>
        </>
    );
}

export default MainPage;
