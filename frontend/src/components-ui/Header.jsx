// src/components-ui/Header.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import TraiLogo from '../assets/logo1.jpg'; // 파일 이름 logo1.jpg로 통일

const Header = () => {
    const navigate = useNavigate();

    return (
        <header style={{ 
            padding: '20px 40px', 
            borderBottom: '1px solid #eee', 
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            justifyContent: 'flex-start'
        }}>
            <img 
                src={TraiLogo} 
                alt="TRAI Logo" 
                style={{ height: '40px' }} // <-- 로고 크기 수정
                onClick={() => navigate('/login')}
            />
        </header>
    );
};

export default Header;
