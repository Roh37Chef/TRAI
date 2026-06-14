// src/components-ui/Header.jsx (로고 100px, 햄버거 메뉴 복구)

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
        // 헤더 영역 높이 100px로 복구
        height: '100px', 
    },
    logo: {
        // 👇 로고 크기 100px로 재조정 👇
        height: '100px', 
        cursor: 'pointer'
    },
    menuButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '28px', // 햄버거 아이콘 크기
        padding: '5px',
        color: '#333'
    },
    loginButton: {
        border: '1px solid #333',
        padding: '8px 15px',
        borderRadius: '4px',
        cursor: 'pointer',
        background: 'none',
    }
};

const Header = ({ showMenuButton = false, onMenuClick }) => {
    const navigate = useNavigate();

    return (
        <header style={styles.header}>
            <img 
                src={TraiLogo}
                alt="TRAI Logo" 
                style={styles.logo} 
                onClick={() => navigate('/loginsuccess')} 
            />
            {showMenuButton ? (
                // 로그인 성공 후: 햄버거 메뉴 버튼
                <button onClick={onMenuClick} style={styles.menuButton}>
                    &#9776; {/* 햄버거 아이콘 */}
                </button>
            ) : (
                // 로그인 전: 로그인/회원가입 버튼
                <div>
                    <button onClick={() => navigate('/login')} style={styles.loginButton}>
                        Login
                    </button>
                    <button onClick={() => navigate('/signup')} style={{...styles.loginButton, marginLeft: '10px', backgroundColor: '#32CD32', color: 'white'}}>
                        Sign up
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
