// src/pages/JungwhaDetailPage.jsx (최종 - 로고 100px 유지 및 페이지 기능 복구)

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import TraiLogo from '../assets/logo2.jpg'; 
import JungwhaMapImage from '../assets/jungwha_map_image.jpg'; 

// 이미지 경로 (리뷰 팝업에 사용)
import UserProfile from '../assets/user.jpg'; 
import PopupImg1 from '../assets/popup_review_img1.jpg';
import PopupImg2 from '../assets/popup_review_img2.jpg';
import PopupImg3 from '../assets/popup_review_img3.jpg';
import PopupImg4 from '../assets/popup_review_img4.jpg';


const styles = {
    header: {
        padding: '20px 40px', 
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #eee',
        height: '100px', // 로고 크기 100px에 맞춰 헤더 높이 지정
    },
    container: {
        maxWidth: '1200px',
        margin: '50px auto',
        padding: '0 20px',
        display: 'flex',
        gap: '30px',
    },
    leftPanel: {
        flex: 1,
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        minWidth: '400px',
    },
    rightPanel: {
        flex: 2,
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    reviewItem: {
        padding: '15px',
        borderBottom: '1px solid #eee',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'background-color 0.1s',
        ':hover': {
            backgroundColor: '#f9f9f9',
        }
    },
    reviewDate: {
        fontSize: '0.85em',
        color: '#999',
        marginTop: '5px'
    },
    // 모달 스타일
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        maxWidth: '700px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto',
        position: 'relative',
    },
    modalCloseButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'none',
        border: 'none',
        fontSize: '1.5em',
        cursor: 'pointer',
    },
    modalReviewImage: {
        width: '100%',
        height: 'auto',
        marginBottom: '10px',
        borderRadius: '4px',
    },
};

const CustomHeader = ({ navigate }) => (
    <header style={styles.header}>
        <img 
            src={TraiLogo}
            alt="TRAI Logo" 
            style={{ height: '100px', cursor: 'pointer' }} // 로고 크기 100px 유지
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

const StarRating = ({ rating }) => {
    return (
        <span style={{ color: '#FFD700', fontSize: '1.2em' }}>
            {'★'.repeat(rating)}
            {'☆'.repeat(5 - rating)}
        </span>
    );
};

// 더미 데이터 생성 함수 (이전 상태 유지)
const generateDummyReviews = () => {
    const reviews = [];
    for (let i = 1; i <= 10; i++) {
        reviews.push({
            id: i,
            user: `사용자${i}`,
            date: `2025-12-${i < 10 ? '0' + i : i}`,
            rating: Math.floor(Math.random() * 5) + 1,
            content: `정화식당 ${i}번째 후기입니다. 맛과 서비스 모두 최고예요! 특히, 이 식당의 분위기가 너무 좋았습니다.`,
            images: [PopupImg1, PopupImg2, PopupImg3, PopupImg4].slice(0, Math.floor(Math.random() * 4) + 1),
            profileImage: UserProfile,
        });
    }
    return reviews;
};

const DUMMY_REVIEWS = generateDummyReviews();


const ReviewModal = ({ isOpen, onClose, review }) => {
    if (!isOpen || !review) return null;
    
    // 모달 내용 텍스트 (더미 데이터)
    const modalContentText = `
        여기 정화식당은 정말 잊을 수 없는 경험을 선사했습니다. 
        신선한 재료와 따뜻한 서비스 덕분에 즐거운 식사를 할 수 있었어요.
        다음 강릉 여행 때 꼭 다시 방문할 예정입니다.
        특히 ${review.content.substring(5, 10)}가 인상적이었습니다.
    `;

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <button onClick={onClose} style={styles.modalCloseButton}>&times;</button>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                    <img src={review.profileImage} alt="User Profile" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }} />
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.5em' }}>{review.user}님의 리뷰</h3>
                        <p style={styles.reviewDate}>{review.date} &nbsp; <StarRating rating={review.rating} /></p>
                    </div>
                </div>

                <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>{modalContentText.trim()}</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                    {review.images.map((img, index) => (
                        <img key={index} src={img} alt={`Review Image ${index + 1}`} style={styles.modalReviewImage} />
                    ))}
                </div>
            </div>
        </div>
    );
};


function JungwhaDetailPage() {
    const navigate = useNavigate();
    const [sortType, setSortType] = useState('latest'); // 정렬 기준: 'latest', 'rating'
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

    const handleReviewClick = (review) => {
        setSelectedReview(review); 
        setIsModalOpen(true);
    };

    const sortedReviews = useMemo(() => {
        let sorted = [...DUMMY_REVIEWS];
        
        if (sortType === 'rating') {
            sorted.sort((a, b) => b.rating - a.rating);
        } else { // latest
            sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        return sorted;
    }, [sortType]);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
            <CustomHeader navigate={navigate} />
            
            <div style={styles.container}>
                {/* 왼쪽 패널: 지도 및 정보 */}
                <div style={styles.leftPanel}>
                    <h1 style={{ fontSize: '2.5em', color: '#333', marginBottom: '10px' }}>정화식당</h1>
                    <p style={{ color: '#555', marginBottom: '20px' }}>주소: 강원 강릉시 옥천로 164-1</p>
                    
                    <img src={JungwhaMapImage} alt="정화식당 지도" style={{ width: '100%', borderRadius: '8px', marginBottom: '20px' }} />
                    
                    <h2 style={{ fontSize: '1.5em', color: '#1B2C4F', marginBottom: '15px' }}>영업 정보</h2>
                    <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', fontSize: '1em' }}>
                        <li style={{ marginBottom: '5px' }}>⏰ 영업시간: 11:00 ~ 21:00 (Break Time 15:00 ~ 17:00)</li>
                        <li style={{ marginBottom: '5px' }}>📞 전화번호: 033-644-4545</li>
                        <li style={{ marginBottom: '5px' }}>⭐ 평점: 4.5/5.0 (네이버 기준)</li>
                    </ul>
                </div>
                
                {/* 오른쪽 패널: 리뷰 목록 및 정렬 */}
                <div style={styles.rightPanel}>
                    <h2 style={{ fontSize: '2em', color: '#333', marginBottom: '10px', textAlign: 'left' }}>리뷰 ({DUMMY_REVIEWS.length}개)</h2>
                    
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                        <button 
                            onClick={() => setSortType('latest')}
                            style={{ 
                                padding: '8px 15px', 
                                border: `1px solid ${sortType === 'latest' ? '#1B2C4F' : '#ccc'}`,
                                backgroundColor: sortType === 'latest' ? '#1B2C4F' : 'white',
                                color: sortType === 'latest' ? 'white' : '#333',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            최신순
                        </button>
                        <button 
                            onClick={() => setSortType('rating')}
                            style={{ 
                                padding: '8px 15px', 
                                border: `1px solid ${sortType === 'rating' ? '#1B2C4F' : '#ccc'}`,
                                backgroundColor: sortType === 'rating' ? '#1B2C4F' : 'white',
                                color: sortType === 'rating' ? 'white' : '#333',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            별점순
                        </button>
                    </div>

                    <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                        {sortedReviews.map(review => (
                            <div 
                                key={review.id} 
                                style={styles.reviewItem}
                                onClick={() => handleReviewClick(review)}
                            >
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
            
            {/* 리뷰 상세 팝업 (모달) */}
            <ReviewModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                review={selectedReview}
            />
        </div>
    );
}

export default JungwhaDetailPage;
