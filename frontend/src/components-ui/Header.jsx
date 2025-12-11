// src/components-ui/Header.jsx (로고 확대 100px 적용)

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
        height: '100px', 
    },
    logo: {
        // 👇 로고 크기 100px로 최종 확대 👇
        height: '100px', 
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

// 기본 헤더 컴포넌트 (로그아웃 버튼 기능 포함)
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
                        onMenuClick(); // 햄버거 메뉴를 위한 클릭 핸들러
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
