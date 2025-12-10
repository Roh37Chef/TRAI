// src/components-ui/Header.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import TraiLogo from '../assets/Trai_logo1.jpg'; // <-- .jpg로 수정

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
                style={{ height: '30px' }} 
                onClick={() => navigate('/login')}
            />
        </header>
    );
};

export default Header;
