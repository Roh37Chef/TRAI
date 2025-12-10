import React from 'react';
import TraiLogo from '../assets/logo2.jpg'; // Option 1, 2, 4, 5에서 사용할 로고

const OptionHeader = () => {
    return (
        <header style={{ 
            padding: '40px 0', // 상하 패딩 증가
            borderBottom: 'none', 
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center', // 중앙 정렬
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <img 
                src={TraiLogo} 
                alt="TRAI Logo" 
                style={{ height: '70px', marginBottom: '10px' }} 
            />
            {/* 로고 아래에 TRAI 슬로건 추가 (선택 사항) */}
            <p style={{ fontSize: '0.9em', color: '#32CD32', fontWeight: 'bold' }}>
                AI-PLANNED, PERSONALIZED ADVENTURES
            </p>
        </header>
    );
};

export default OptionHeader;
