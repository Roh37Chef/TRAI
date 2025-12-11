// src/pages/LoginSuccessPage.jsx (최종 - 사이드바 메뉴 복구)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components-ui/Header'; // 👈 경로 수정

import TraiLogoFull from '../assets/logo2.jpg'; 
import MainBackgroundImage from '../assets/background.jpg'; 

const backgroundStyle = {
    // ... (배경 스타일 유지)
    height: 'calc(100vh - 100px)', // 헤더 높이 100px에 맞춰 조정
};

const MENU_ITEMS = [
    // 👇 마이페이지 항목 복구 및 포함
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
            // ... (사이드바 스타일 유지)
        }}>
            <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>메뉴</h3>
            <ul>
                {MENU_ITEMS.map(item => (
                    // 일반 메뉴 또는 서브메뉴가 있는 마이페이지 메뉴 처리
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
    // ... (나머지 로직 유지)
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
            {/* Header 컴포넌트로 대체 및 햄버거 메뉴 기능 연결 */}
            {/* showMenuButton={true}로 햄버거 아이콘 표시 */}
            <Header showMenuButton={true} onMenuClick={toggleSidebar} /> 
            
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} navigate={navigate} />

            <div style={backgroundStyle}>
                {/* ... (나머지 JSX 유지) */}
            </div>
        </>
    );
}

export default LoginSuccessPage;
