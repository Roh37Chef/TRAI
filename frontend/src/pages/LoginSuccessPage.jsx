import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Main Page와 동일한 로고, 배경을 사용합니다.
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

const LoginSuccessPageHeader = () => {
    const navigate = useNavigate();
    
    // 로그인 성공 후에는 우측 상단 메뉴를 다르게 보여줍니다.
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
                onClick={() => navigate('/loginsuccess')} // 로그인 후 메인 화면 역할
            />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                    마이페이지
                </span>
                <span style={{ 
                    cursor: 'pointer', 
                    border: '1px solid #333', 
                    padding: '8px 15px', 
                    borderRadius: '4px' 
                }}>
                    로그아웃
                </span>
            </div>
        </header>
    );
};

function LoginSuccessPage() {
    const navigate = useNavigate();
    const [url, setUrl] = useState('');

    const handleGenerateSchedule = () => {
        if (!url) {
            alert("URL을 입력해 주세요.");
            return;
        }
        // URL을 가지고 다음 페이지로 이동
        navigate('/option1', { state: { url } }); 
    };

    return (
        <>
            <LoginSuccessPageHeader /> 
            
            <div style={backgroundStyle}>
                <p style={{ fontSize: '1.2em', marginBottom: '10px' }}>
                    블로그 속 여행 경로를 분석하여, 나만을 위한 일정을 생성합니다.
                </p>
                <h1 style={{ fontSize: '3em', fontWeight: 'bold', margin: '0 0 30px 0' }}>
                    여행 정보를 입력해 주세요
                </h1>
                
                {/* 👇 URL 입력 박스 👇 */}
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
