// src/components-ui/OptionHeader.jsx

import React from 'react';
import TraiLogo from '../assets/logo2.jpg'; // Option 1, 2, 4, 5에서 사용할 로고

const OptionHeader = () => {
    return (
        <header style={{ 
            padding: '40px 0', 
            borderBottom: 'none', 
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <img 
                src={TraiLogo} 
                alt="TRAI Logo" 
                style={{ height: '70px', marginBottom: '10px' }} 
            />
            <p style={{ fontSize: '0.9em', color: '#32CD32', fontWeight: 'bold' }}>
                AI-PLANNED, PERSONALIZED ADVENTURES
            </p>
        </header>
    );
};

export default OptionHeader;
