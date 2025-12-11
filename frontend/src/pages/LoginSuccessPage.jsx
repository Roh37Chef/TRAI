// src/pages/LoginSuccessPage.jsx (최종 - 햄버거 메뉴 작동 복구 및 UI 정리)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Header 대신 필요한 부분만 사용
import TraiLogoFull from '../assets/logo2.jpg'; 
import MainBackgroundImage from '../assets/background.jpg'; 

const backgroundStyle = {
    // 배경 스타일 유지
    backgroundImage: `url(${MainBackgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 'calc(100vh - 100px)', // 헤더 높이 100px에 맞춰 조정
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    padding: '0 20px',
};

const HeaderStyle = {
    padding: '20px 40px', 
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #eee',
    height: '100px',
};

const LogoStyle = {
    height: '100px', // 로고 크기 100px
    cursor: 'pointer'
};

const MenuButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '28px', // 햄버거 아이콘 크기
    padding: '5px',
    color: '#333'
};


const MENU_ITEMS = [
    { name: '마이페이지', submenu: [
        { name: '여행 계획', path: '/myplanpage' },
        { name: '리뷰', path: '/myreviewpage' },
    ]},
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
            // 햄버거 팝업이 열릴 때 헤더 위에 오도록 Z-Index를 높여줍니다.
        }}>
            <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>메뉴</h3>
            <ul>
                {MENU_ITEMS.map(item => (
                    <React.Fragment key={item.name}>
                        <li style={{ listStyle: 'none', padding: '15px 0', borderBottom: '1px dotted #eee', cursor: 'pointer', fontWeight: item.submenu ? 'bold' : 'normal' }}
                            onClick={() => {
                                if (item.path) {
                                    navigate(item.path);
                                    onClose();
                                }
                            }}
                        >
                            {item.name}
                        </li>
                        {item.submenu && item.submenu.map(sub => (
                            <li key={sub.name} style={{ listStyle: 'none', padding: '5px 0 5px 20px', fontSize: '0.9em', color: '#666', cursor: 'pointer' }}
                                onClick={() => {
                                    navigate(sub.path);
                                    onClose();
                                }}
                            >
                                - {sub.name}
                            </li>
                        ))}
                    </React.Fragment>
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
            {/* LoginSuccessPage 전용 헤더 (로고와 햄버거 아이콘) */}
            <header style={HeaderStyle}>
                <img 
                    src={TraiLogoFull}
                    alt="TRAI Logo" 
                    style={LogoStyle} 
                    onClick={() => navigate('/loginsuccess')} 
                />
                <button onClick={toggleSidebar} style={MenuButtonStyle}>
                    &#9776; {/* 햄버거 아이콘 */}
                </button>
            </header>


            {/* 햄버거 메뉴 클릭 시 나타나는 사이드바 */}
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} navigate={navigate} />

            <div style={backgroundStyle}>
                <h1 style={{ fontSize: '3em', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                    나를 위한 여행, TRAI
                </h1>
                <p style={{ fontSize: '1.2em', marginBottom: '30px' }}>
                    블로그 속 여행 경로를 분석하여, 나만을 위한 일정을 생성합니다.
                </p>
                {/* ... (나머지 입력 필드와 버튼 JSX 유지) */}
            </div>
        </>
    );
}

export default LoginSuccessPage;
