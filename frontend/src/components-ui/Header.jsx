// src/components-ui/Header.jsx (로고 크기 500px 적용)

import React from 'react';
import { useNavigate } from 'react-router-dom';
import TraiLogo from '../assets/logo2.jpg'; 

const styles = {
    header: {
        padding: '20px 40px', 
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #eee',
        // 헤더 영역 높이도 로고 크기에 맞게 500px로 설정
        height: '500px', 
    },
    logo: {
        // 👇 로고 크기 500px로 확대 👇
        height: '500px', 
        cursor: 'pointer'
    },
    button: {
        background: 'none', 
        border: '1px solid #333',
        padding: '8px 15px',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

const Header = ({ showMenuButton = false, onMenuClick }) => {
    const navigate = useNavigate();
    const buttonText = showMenuButton ? '메뉴 닫기' : '로그인';
    const buttonPath = showMenuButton ? '/loginsuccess' : '/login';

    return (
        <header style={styles.header}>
            <img 
                src={TraiLogo}
                alt="TRAI Logo" 
                style={styles.logo} 
                onClick={() => navigate('/loginsuccess')} 
            />
            <button 
                onClick={() => {
                    if (onMenuClick) {
                        onMenuClick(); 
                    } else {
                        navigate(buttonPath);
                    }
                }}
                style={styles.button}
            >
                {buttonText}
            </button>
        </header>
    );
};

export default Header;
