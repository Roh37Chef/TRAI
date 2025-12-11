// src/pages/JungwhaDetailPage.jsx (리뷰 팝업 기능 추가 최종 버전)

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import TraiLogo from '../assets/logo2.jpg'; 
import JungwhaMapImage from '../assets/jungwha_map_image.jpg'; 

// 👇 팝업 이미지 파일들을 불러옵니다. 👇
import PopupImg1 from '../assets/popup_review_img1.jpg';
import PopupImg2 from '../assets/popup_review_img2.jpg';
import PopupImg3 from '../assets/popup_review_img3.jpg';
import PopupImg4 from '../assets/popup_review_img4.jpg';
import UserProfile from '../assets/user_profile_default.jpg'; // 사용자 프로필 이미지 (임시로 하나 추가)

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
        textAlign: 'left',
        cursor: 'pointer', // 클릭 가능 표시
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
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
    },
    modalContent: {
        backgroundColor: 'white',
        width: '800px', // 스크린샷과 유사한 너비
        maxHeight: '90%',
        borderRadius: '10px',
        padding: '30px',
        position: 'relative',
        overflowY: 'auto',
    },
    modalCloseButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'none',
        border: 'none',
        fontSize: '2em',
        cursor: 'pointer',
        color: '#333'
    },
    modalReviewHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        borderBottom: '1px solid #eee',
        paddingBottom: '15px'
    },
    profileImg: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        marginRight: '15px',
        objectFit: 'cover'
    },
    modalReviewBody: {
        fontSize: '1em',
        lineHeight: '1.6',
        color: '#333',
        textAlign: 'left'
    },
    photoGrid: {
        display: 'flex',
        gap: '10px',
        marginTop: '20px',
        overflowX: 'auto',
        paddingBottom: '10px'
    },
    photoItem: {
        width: '150px',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '5px'
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
            userName: `김여행${i}`,
        });
    }
    return reviews;
};

const DUMMY_REVIEWS = generateDummyReviews();

// 모달 컴포넌트
const ReviewModal = ({ isOpen, onClose, review }) => {
    if (!isOpen) return null;

    const dummyPhotos = [PopupImg1, PopupImg2, PopupImg3, PopupImg4];
    
    // 스크린샷의 내용에 맞춘 더미 텍스트
    const modalContentText = "솔을 주재료로 유튜버 2인이 오징어볶음을 극찬한 집. 오전 11시 20분 방문 리뷰, 내 앞에 대기 1팀 있었고, 기다리는 동안 대기 1팀 늘어남. 강릉에서 거진그것이 유행처럼 번져서 인기가 절정에 달하는 집인 것은 확실함. 대부분 갈치조림, 오징어볶음, 제육볶음을 먹었으며, 유튜버들이 극찬한 오징어볶음을 주문함. 공기밥은 포함되어 있음. 양념은 맵지 않고 구수함. 깨나 들깨맛, 떡볶이 양념을 연상시킴. 양념을 해물에 부을 정도는 아님. 오징어는 반건조 오징어가 아닌 생물 오징어이며, 해물 전골보다 해물 양이 적은 편이고, 미리 볶아 놓는 게 아니라 주문 후 바로 볶아 줘서 다소 시간이 걸릴 수 있음.";

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <button onClick={onClose} style={styles.modalCloseButton}>&times;</button>
                
                {/* 헤더: 프로필, 이름, 날짜, 별점 */}
                <div style={styles.modalReviewHeader}>
                    <img src={UserProfile} alt="프로필" style={styles.profileImg} />
                    <div>
                        <div style={{ fontWeight: 'bold', fontSize: '1.2em' }}>김여행</div>
                        <div style={styles.reviewDate}>2025.12.05 &nbsp; <StarRating rating={review.rating} /></div>
                    </div>
                </div>

                {/* 본문 */}
                <div style={styles.modalReviewBody}>
                    {modalContentText.split('\n').map((text, index) => (
                        <p key={index} style={{ marginBottom: '10px' }}>{text}</p>
                    ))}
                    
                    {/* 사진 Grid */}
                    <div style={styles.photoGrid}>
                        {dummyPhotos.map((img, index) => (
                            <img key={index} src={img} alt={`리뷰 사진 ${index + 1}`} style={styles.photoItem} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


function JungwhaDetailPage() {
    const navigate = useNavigate();
    const [sortType, setSortType] = useState('latest');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

    // 리뷰 아이템 클릭 핸들러 (어떤 리뷰든 동일 팝업을 띄움)
    const handleReviewClick = (review) => {
        setSelectedReview(review); // 클릭한 리뷰 데이터를 저장 (별점 반영)
        setIsModalOpen(true);
    };

    // 정렬 로직
    const sortedReviews = useMemo(() => {
        let sorted = [...DUMMY_REVIEWS];
        
        switch (sortType) {
            case 'latest':
                sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'highRating':
                sorted.sort((a, b) => b.rating - a.rating);
                break;
            case 'lowRating':
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
                    </div>

                    <div style={{ marginTop: '30px', textAlign: 'center' }}>
                        <span style={{ padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px' }}>1</span>
                    </div>

                </div>
                
                {/* 오른쪽 패널: 리뷰 목록 및 정렬 */}
                <div style={styles.rightPanel}>
                    
                    <div style={styles.sortContainer}>
                        <button style={styles.sortButton(sortType === 'latest')} onClick={() => setSortType('latest')}>최신순</button>
                        <button style={styles.sortButton(sortType === 'highRating')} onClick={() => setSortType('highRating')}>높은 평점순</button>
                        <button style={styles.sortButton(sortType === 'lowRating')} onClick={() => setSortType('lowRating')}>낮은 평점순</button>
                    </div>

                    {sortedReviews.map(review => (
                        <div 
                            key={review.id} 
                            style={styles.reviewItem}
                            onClick={() => handleReviewClick(review)} // 팝업 열기
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
            
            {/* 리뷰 상세 팝업 (모달) */}
            {selectedReview && (
                <ReviewModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    review={selectedReview}
                />
            )}
        </div>
    );
}

export default JungwhaDetailPage;
