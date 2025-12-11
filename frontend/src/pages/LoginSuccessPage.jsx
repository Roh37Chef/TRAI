// src/pages/LoginSuccessPage.jsx (최종 메뉴 구현 버전)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TraiLogoFull from '../assets/logo2.jpg'; 
import MainBackgroundImage from '../assets/background.jpg'; 

const backgroundStyle = {
    backgroundImage: `url(${MainBackgroundImage})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '0 80px',
    color: 'white',
    textShadow: '0 0 5px rgba(0,0,0,0.8)',
    backgroundColor: 'rgba(0,0,0,0.5)',
};

// 햄버거 메뉴를 위한 Sidebar 컴포넌트
const Sidebar = ({ isOpen, onClose, navigate }) => {
    const [isMyPageOpen, setIsMyPageOpen] = useState(false);

    const sidebarStyle = {
        position: 'fixed',
        top: 0,
        right: isOpen ? 0 : '-350px', // 메뉴가 열리면 0, 닫히면 오른쪽으로 숨김
        width: '300px',
        height: '100%',
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
        transition: 'right 0.3s ease-in-out',
        zIndex: 1000,
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
    };

    const menuButtonStyle = {
        padding: '15px 10px',
        textAlign: 'left',
        fontSize: '1.2em',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        borderBottom: '1px solid #eee',
        fontWeight: '500',
        color: '#333'
    };

    const submenuButtonStyle = {
        ...menuButtonStyle,
        paddingLeft: '30px',
        fontSize: '1.1em',
        backgroundColor: '#f5f5f5',
        borderBottom: 'none'
    };
    
    const handleNavigation = (path) => {
        onClose(); // 메뉴 닫기
        navigate(path);
    };
    
    const handleMyPageClick = () => {
        setIsMyPageOpen(!isMyPageOpen);
    };

    return (
        <>
            {/* 어두운 배경 (메뉴가 열렸을 때만 표시) */}
            {isOpen && <div 
                style={{ 
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    zIndex: 999 
                }} 
                onClick={onClose} 
            />}
            
            <div style={sidebarStyle}>
                
                {/* 닫기 버튼 */}
                <button 
                    onClick={onClose} 
                    style={{ 
                        alignSelf: 'flex-end', 
                        fontSize: '2em', 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer',
                        marginBottom: '30px',
                        color: '#333'
                    }}
                >
                    &times;
                </button>

                {/* 메뉴 항목들 */}
                <button style={menuButtonStyle} onClick={() => handleNavigation('/moneypage')}>
                    가계부
                </button>
                <button style={menuButtonStyle} onClick={() => handleNavigation('/reviewpage')}>
                    여행 후기
                </button>
                <button style={menuButtonStyle} onClick={() => handleNavigation('/disabledpersonpage')}>
                    장애인 지원제도 안내
                </button>
                
                <button style={menuButtonStyle} onClick={handleMyPageClick}>
                    마이페이지 {isMyPageOpen ? '▲' : '▼'}
                </button>
                
                {isMyPageOpen && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <button style={submenuButtonStyle} onClick={() => handleNavigation('/myplanpage')}>
                            여행 계획
                        </button>
                        <button style={submenuButtonStyle} onClick={() => handleNavigation('/myreviewpage')}>
                            리뷰
                        </button>
                    </div>
                )}
                
                <button style={{...menuButtonStyle, marginTop: 'auto', borderTop: '1px solid #eee'}} onClick={() => handleNavigation('/login')}>
                    로그아웃
                </button>

            </div>
        </>
    );
};


const LoginSuccessPageHeader = ({ onMenuClick }) => {
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
                style={{ height: '40px', cursor: 'pointer' }} 
                onClick={() => navigate('/loginsuccess')} 
            />
            
            {/* 햄버거 아이콘 */}
            <button 
                onClick={onMenuClick}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '24px',
                    padding: '5px',
                }}
            >
                &#9776;
            </button>
        </header>
    );
};

function LoginSuccessPage() {
    const navigate = useNavigate();
    const [url, setUrl] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleGenerateSchedule = () => {
        if (!url) {
            alert("URL을 입력해 주세요.");
            return;
        }
        navigate('/option1', { state: { url } });
    };

    return (
        <>
            <LoginSuccessPageHeader onMenuClick={() => setIsSidebarOpen(true)} /> 
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} navigate={navigate} />

            <div style={backgroundStyle}>
                <p style={{ fontSize: '1.2em', marginBottom: '10px' }}>
                    블로그 속 여행 경로를 분석하여, 나만을 위한 일정을 생성합니다.
                </p>
                <h1 style={{ fontSize: '3em', fontWeight: 'bold', margin: '0 0 30px 0' }}>
                    여행 정보를 입력해 주세요
                </h1>
                
                <input
                    type="url"
                    placeholder="분석할 블로그 글의 URL을 여기에 붙여넣어 주세요."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    style={{
                        width: '800px', 
                        padding: '15px 20px', 
                        fontSize: '1.1em',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        marginBottom: '20px',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    }}
                />
                
                <button 
                    style={{ 
                        padding: '15px 40px', 
                        backgroundColor: '#1B2C4F', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '1.2em',
                        fontWeight: 'bold'
                    }}
                    onClick={handleGenerateSchedule}
                >
                    일정 생성
                </button>
            </div>
        </>
    );
}

export default LoginSuccessPage;
