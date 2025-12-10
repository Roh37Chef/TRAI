

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components-ui/Header'; 
import TraiLogoFull from '../assets/Trai_logo2.jpg'; 


const backgroundStyle = {
    backgroundImage: `url('your_background_image_path.jpg')`,
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
            {/* TRAI 로고 (Header.jsx에서 가져온 스타일과 동일하게) */}
            <img 
                src={TraiLogoFull} 
                alt="TRAI Logo" 
                style={{ height: '30px', cursor: 'pointer' }} 
                onClick={() => navigate('/')} 
            />
            
            {/* Login 버튼 */}
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
                {/* 햄버거 메뉴는 일단 생략합니다. */}
            </div>
        </header>
    );
};


function MainPage() {
    return (
        <>
            {/* 메인 페이지는 Header.jsx 대신 Login 버튼이 있는 자체 헤더를 사용합니다. */}
            <MainPageHeader /> 
            
            <div style={backgroundStyle}>
                <p style={{ fontSize: '1.2em', marginBottom: '10px' }}>
                    블로그 속 여행 경로, 내 취향을 읽다
                </p>
                <h1 style={{ fontSize: '3em', fontWeight: 'bold', margin: '0' }}>
                    나를 위한 여행, TRAI
                </h1>
                
                {/* 메인 페이지의 AI 추천 시작 버튼 등을 여기에 추가합니다. */}
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
                    onClick={() => navigate('/main-input')}
                >
                    AI 여행 추천 시작하기
                </button>
            </div>
        </>
    );
}

export default MainPage;
