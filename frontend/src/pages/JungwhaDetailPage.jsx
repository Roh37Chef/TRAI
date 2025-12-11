// src/pages/JungwhaDetailPage.jsx (최종 정렬 및 20개 리뷰 반영)

import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TraiLogo from '../assets/logo2.jpg'; 
// 👇 지도 이미지 파일을 불러옵니다. (파일명 일치 필요) 👇
import JungwhaMapImage from '../assets/jungwha_map_image.jpg'; 

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
        margin: '50px auto',
        padding: '0 20px',
        display: 'flex',
    },
    leftPanel: {
        flex: 1,
        paddingRight: '40px',
        borderRight: '1px solid #eee',
    },
    rightPanel: {
        flex: 1,
        paddingLeft: '40px',
    },
    // 왼쪽 패널 스타일
    mapContainer: {
        width: '100%',
        height: '350px',
        marginBottom: '20px',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    infoBox: {
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
        textAlign: 'left',
        fontSize: '0.9em',
        color: '#666',
        marginTop: '15px'
    },
    // 오른쪽 패널 스타일
    sortContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
        marginBottom: '20px',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px'
    },
    sortButton: (isActive) => ({
        padding: '8px 15px',
        background: isActive ? '#1B2C4F' : '#f0f0f0',
        color: isActive ? 'white' : '#333',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '0.9em',
        fontWeight: '500',
    }),
    reviewItem: {
        padding: '15px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        marginBottom: '15px',
        backgroundColor: 'white',
        textAlign: 'left'
    },
    reviewDate: {
        fontSize: '0.85em',
        color: '#999',
        marginTop: '5px'
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
            onClick={() => navigate('/gangneungreview')} // 강릉 목록으로 돌아가기
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

const StarRating = ({ rating }) => {
    return (
        <span style={{ color: '#FFD700', fontSize: '1.2em' }}>
            {'★'.repeat(rating)}
            {'☆'.repeat(5 - rating)}
        </span>
    );
};

// 20개의 더미 리뷰 데이터 생성
const generateDummyReviews = () => {
    const reviews = [];
    const baseDate = new Date('2025-12-11');
    for (let i = 1; i <= 20; i++) {
        const daysAgo = Math.floor(Math.random() * 365) + 1;
        const reviewDate = new Date(baseDate.setDate(baseDate.getDate() - daysAgo));
        const rating = Math.floor(Math.random() * 5) + 1; // 1~5점
        reviews.push({
            id: i,
            content: `오징어볶음 ${i}인분을 시켰는데 양이 푸짐하고 신선해서 맛있었습니다. 서비스도 좋았어요.`,
            date: reviewDate.toISOString().split('T')[0],
            rating: rating,
            // 더미 이미지 없음 (요청 반영)
        });
    }
    return reviews;
};

const DUMMY_REVIEWS = generateDummyReviews();

function JungwhaDetailPage() {
    const navigate = useNavigate();
    const [sortType, setSortType] = useState('latest'); // latest, highRating, lowRating

    // 정렬 로직
    const sortedReviews = useMemo(() => {
        let sorted = [...DUMMY_REVIEWS];
        
        switch (sortType) {
            case 'latest':
                // 날짜 기준 내림차순 (최신순)
                sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'highRating':
                // 평점 기준 내림차순 (높은 평점순)
                sorted.sort((a, b) => b.rating - a.rating);
                break;
            case 'lowRating':
                // 평점 기준 오름차순 (낮은 평점순)
                sorted.sort((a, b) => a.rating - b.rating);
                break;
            default:
                break;
        }
        return sorted;
    }, [sortType]);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
            <Header navigate={navigate} />
            
            <div style={styles.container}>
                {/* 왼쪽 패널: 지도 및 정보 */}
                <div style={styles.leftPanel}>
                    <h1 style={{ fontSize: '2.5em', color: '#333', marginBottom: '10px' }}>정화식당</h1>
                    <div style={{ color: '#666', marginBottom: '20px' }}>
                        등록된 리뷰: {DUMMY_REVIEWS.length}개 &nbsp; | &nbsp; 
                        <StarRating rating={4} />
                    </div>
                    
                    {/* 지도 이미지 대체 */}
                    <div style={styles.mapContainer}>
                        <img 
                            src={JungwhaMapImage} 
                            alt="정화식당 지도" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                    </div>
                    
                    <div style={styles.infoBox}>
                        <p>📍 **주소:** 강원특별자치도 강릉시 강릉대로 202-3</p>
                        <p>🕒 **영업시간:** 매일 10:00 - 21:00 (화요일 휴무)</p>
                        <p>📞 **전화:** 033-642-6895</p>
                    </div>

                    <div style={{ marginTop: '30px', textAlign: 'center' }}>
                         {/* 페이지네이션 (더미) */}
                        <span style={{ padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px' }}>1</span>
                        <span style={{ padding: '5px 10px', cursor: 'pointer' }}>2</span>
                        <span style={{ padding: '5px 10px', cursor: 'pointer' }}>3</span>
                    </div>

                </div>
                
                {/* 오른쪽 패널: 리뷰 목록 및 정렬 */}
                <div style={styles.rightPanel}>
                    
                    {/* 정렬 버튼 */}
                    <div style={styles.sortContainer}>
                        <button 
                            style={styles.sortButton(sortType === 'latest')}
                            onClick={() => setSortType('latest')}
                        >
                            최신순
                        </button>
                        <button 
                            style={styles.sortButton(sortType === 'highRating')}
                            onClick={() => setSortType('highRating')}
                        >
                            높은 평점순
                        </button>
                        <button 
                            style={styles.sortButton(sortType === 'lowRating')}
                            onClick={() => setSortType('lowRating')}
                        >
                            낮은 평점순
                        </button>
                    </div>

                    {/* 리뷰 리스트 */}
                    {sortedReviews.map(review => (
                        <div key={review.id} style={styles.reviewItem}>
                            <p style={{ margin: '0', fontSize: '1em' }}>{review.content}</p>
                            <div style={styles.reviewDate}>
                                {review.date} &nbsp; 
                                <StarRating rating={review.rating} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default JungwhaDetailPage;
