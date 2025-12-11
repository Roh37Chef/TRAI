// src/pages/JungwhaDetailPage.jsx (최종 - 전용 Header, 로고 100px)

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// Header 컴포넌트 import는 필요 없음

import TraiLogo from '../assets/logo2.jpg'; 
import JungwhaMapImage from '../assets/jungwha_map_image.jpg'; 
// ... (나머지 이미지 import 유지)

const styles = {
// ... (styles 유지)
};

const CustomHeader = ({ navigate }) => (
    <header style={styles.header}>
        <img 
            src={TraiLogo}
            alt="TRAI Logo" 
            style={{ height: '100px', cursor: 'pointer' }} // 로고 크기 100px 적용
            onClick={() => navigate('/loginsuccess')} 
        />
        <button 
            onClick={() => navigate('/gangneungreview')}
            style={{ 
                background: 'none', 
                border: '1px solid #333',
                padding: '8px 15px',
                borderRadius: '4px',
                cursor: 'pointer'
            }}
        >
            강릉 목록으로
        </button>
    </header>
);

// ... (StarRating, generateDummyReviews, DUMMY_REVIEWS, ReviewModal 유지)

function JungwhaDetailPage() {
    const navigate = useNavigate();
    const [sortType, setSortType] = useState('latest');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

    // ... (로직 유지)

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
            <CustomHeader navigate={navigate} />
            
            {/* ... (나머지 JSX 유지) */}
        </div>
    );
}

export default JungwhaDetailPage;
