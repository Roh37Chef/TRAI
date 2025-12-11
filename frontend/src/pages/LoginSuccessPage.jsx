// src/pages/LoginSuccessPage.jsx (최종 - Header 컴포넌트 사용 및 경로 수정)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components-ui/Header'; // 👈 경로 수정

import TraiLogoFull from '../assets/logo2.jpg'; 
import MainBackgroundImage from '../assets/background.jpg'; 

const backgroundStyle = {
    backgroundImage: `url(${MainBackgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 'calc(100vh - 100px)', // 헤더 높이 100px 제외
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    padding: '0 20px',
};

const MENU_ITEMS = [
    { name: '여행 계획', path: '/myplanpage' },
    { name: '리뷰', path: '/myreviewpage' },
    { name: '가계부', path: '/moneypage' },
    { name: '티켓 구매', path: '/ticketpage' },
    { name: '여행 후기', path: '/reviewpage' },
    { name: '장애인 여행 지원 제도 안내', path: '/disabledpersonpage' },
];

const Sidebar = ({ isOpen, onClose, navigate }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '300px',
            height: '100%',
            backgroundColor: 'white',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease-in-out',
            zIndex: 1000,
            padding: '20px',
        }}>
            <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>메뉴</h3>
            <ul>
                {MENU_ITEMS.map(item => (
                    <li key={item.name} style={{ listStyle: 'none', padding: '15px 0', borderBottom: '1px dotted #eee', cursor: 'pointer' }}
                        onClick={() => {
                            navigate(item.path);
                            onClose();
                        }}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
            <button onClick={onClose} style={{ marginTop: '20px', padding: '10px 20px', background: '#ccc', border: 'none', cursor: 'pointer' }}>닫기</button>
        </div>
    );
};


function LoginSuccessPage() {
    const navigate = useNavigate();
    const [url, setUrl] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleGenerateSchedule = () => {
        if (!url) {
            alert("URL을 입력해 주세요.");
            return;
        }
        navigate('/option1', { state: { url } });
    };

    return (
        <>
            <Header showMenuButton={true} onMenuClick={toggleSidebar} /> 
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} navigate={navigate} />

            <div style={backgroundStyle}>
                <h1 style={{ fontSize: '3em', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                    나를 위한 여행, TRAI
                </h1>
                <p style={{ fontSize: '1.2em', marginBottom: '30px' }}>
                    블로그 속 여행 경로를 분석하여, 나만을 위한 일정을 생성합니다.
                </p>
                <input
                    type="text"
                    placeholder="여행 블로그 URL을 입력하세요"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    style={{ 
                        padding: '12px', 
                        width: '400px', 
                        maxWidth: '80%', 
                        marginBottom: '20px', 
                        borderRadius: '4px',
                        border: 'none',
                        fontSize: '1em'
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
                    AI 여행 추천 시작하기
                </button>
            </div>
        </>
    );
}

export default LoginSuccessPage;
