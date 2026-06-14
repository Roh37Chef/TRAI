// src/pages/MyReviewPage.jsx (3개 이미지 적용 최종 버전)

import React from 'react';
import { useNavigate } from 'react-router-dom';
import TraiLogo from '../assets/logo2.jpg'; 

// 👇 3개의 리뷰 이미지 파일 경로를 정확하게 불러옵니다. 👇
import GangneungImage from '../assets/gangneung_restaurant.jpg'; 
import BusanHotelImage from '../assets/busan_hotel.jpg';
import BusanCafeImage from '../assets/busan_cafe.jpg';

const styles = {
    header: {
        padding: '20px 40px', 
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #eee'
    },
    container: {
        maxWidth: '1200px',
        margin: '30px auto',
        padding: '0 20px',
    },
    breadcrumbs: {
        textAlign: 'left',
        color: '#666',
        marginBottom: '20px',
        fontSize: '0.9em'
    },
    tabContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '40px',
        borderBottom: '1px solid #eee',
    },
    tabButton: (isActive) => ({
        padding: '15px 30px',
        fontSize: '1.4em',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontWeight: isActive ? 'bold' : 'normal',
        color: isActive ? '#1B2C4F' : '#999',
        borderBottom: isActive ? '3px solid #6200EE' : '3px solid transparent',
        transition: 'border-bottom 0.3s, color 0.3s'
    }),
    reviewGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', // 2열 레이아웃
        gap: '40px',
        marginBottom: '50px'
    },
    reviewItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        border: '1px solid #eee',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    reviewHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '15px',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px'
    },
    locationTag: {
        fontSize: '1.1em',
        fontWeight: 'bold',
        color: '#1B2C4F'
    },
    titleText: {
        fontSize: '1.3em',
        fontWeight: '500',
        color: '#333'
    },
    contentRow: {
        display: 'flex',
        width: '100%',
        alignItems: 'flex-start',
        marginTop: '10px'
    },
    reviewImage: {
        width: '100px',
        height: '100px',
        borderRadius: '5px',
        objectFit: 'cover',
        marginRight: '20px'
    },
    reviewContent: {
        fontSize: '1em',
        color: '#666',
        textAlign: 'left',
        lineHeight: '1.5'
    },
    dateRating: {
        fontSize: '0.9em',
        color: '#999',
        marginTop: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    }
};

const Header = ({ navigate }) => (
    <header style={styles.header}>
        <img 
            src={TraiLogo}
            alt="TRAI Logo" 
            style={{ height: '40px', cursor: 'pointer' }} 
            onClick={() => navigate('/loginsuccess')} 
        />
        <button 
            onClick={() => navigate('/loginsuccess')} 
            style={{ 
                background: 'none', 
                border: '1px solid #333',
                padding: '8px 15px',
                borderRadius: '4px',
                cursor: 'pointer'
            }}
        >
            메뉴 닫기
        </button>
    </header>
);

// 별점 렌더링 함수
const StarRating = ({ rating }) => {
    return (
        <span style={{ color: '#FFD700', fontSize: '1.2em' }}>
            {'★'.repeat(rating)}
            {'☆'.repeat(5 - rating)}
        </span>
    );
};

// 더미 리뷰 데이터 (스크린샷 기반)
const SAMPLE_REVIEWS = [
    {
        id: 1,
        location: '강릉',
        title: '오월에초당',
        content: '피자, 파스타를 먹을 수 있는 한옥 컨셉의 식당. 직원이 친절하고...',
        date: '2025.12.05',
        rating: 5,
        image: GangneungImage // 👈 '강릉 식당' 이미지 변수 적용
    },
    {
        id: 2,
        location: '부산',
        title: '센트럴베이호텔',
        content: '광안대교가 정면에 보이는 뷰파는 끝내주는 호텔입니다.',
        date: '2024.01.21',
        rating: 4,
        image: BusanHotelImage // 👈 '부산 호텔' 이미지 변수 적용
    },
    {
        id: 3,
        location: '부산',
        title: '나이브 브루어스',
        content: '전에 와있을 때도 자주 왔는데 사장도 분위기도 좋고 맛도 좋아요.',
        date: '2023.11.09',
        rating: 5,
        image: BusanCafeImage // 👈 '부산 카페' 이미지 변수 적용
    }
];

function MyReviewPage() {
    const navigate = useNavigate();

    const handleTabClick = (tabName) => {
        if (tabName === 'plan') {
            navigate('/myplanpage'); 
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
            <Header navigate={navigate} />
            
            <div style={styles.container}>
                <p style={styles.breadcrumbs}>홈 &gt; 마이페이지</p>

                {/* 탭 네비게이션 */}
                <div style={styles.tabContainer}>
                    <button 
                        style={styles.tabButton(false)} 
                        onClick={() => handleTabClick('plan')}
                    >
                        여행 계획
                    </button>
                    <button 
                        style={styles.tabButton(true)} 
                        onClick={() => handleTabClick('review')}
                    >
                        리뷰
                    </button>
                </div>
                
                {/* 리뷰 목록 */}
                <div style={styles.reviewGrid}>
                    {SAMPLE_REVIEWS.map(review => (
                        <div key={review.id} style={styles.reviewItem}>
                            <div style={styles.reviewHeader}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <span style={styles.locationTag}>{review.location}</span>
                                    <span style={styles.titleText}>{review.title}</span>
                                </div>
                            </div>

                            <div style={styles.contentRow}>
                                <img 
                                    src={review.image} 
                                    alt={review.title} 
                                    style={styles.reviewImage}
                                />
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <p style={styles.reviewContent}>{review.content}</p>
                                    <div style={styles.dateRating}>
                                        <span>{review.date}</span>
                                        <StarRating rating={review.rating} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <span style={{ padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px' }}>1</span>
                </div>
            </div>
        </div>
    );
}

export default MyReviewPage;
