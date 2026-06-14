// src/pages/GangneungReviewPage.jsx (10개 식당 목록 및 정화식당 라우팅 적용)

import React from 'react';
import { useNavigate } from 'react-router-dom';
import TraiLogo from '../assets/logo2.jpg'; 
import GangneungLogo from '../assets/gangneung_logo.jpg'; // ReviewPage에서 사용한 강릉 로고

// 👇 10개 식당 이미지를 불러옵니다. (파일 이름을 위 표와 일치시켜 주세요) 👇
import Img1 from '../assets/may_choudang.jpg'; 
import Img2 from '../assets/budnamu_brewery.jpg';
import Img3 from '../assets/squid_mulhoe.jpg';
import Img4 from '../assets/yeongdong_noodle.jpg';
import Img5 from '../assets/jungwha_restaurant.jpg'; // 정화식당
import Img6 from '../assets/local_noodle.jpg';
import Img7 from '../assets/gangneung_market.jpg';
import Img8 from '../assets/seafood_jeongol.jpg';
import Img9 from '../assets/sundubu_gelato.jpg';
import Img10 from '../assets/anmok_cafe.jpg';


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
    },
    titleSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '40px',
    },
    cityLogo: {
        height: '80px',
        width: '80px',
        marginRight: '20px',
        objectFit: 'contain'
    },
    title: {
        fontSize: '3em',
        color: '#1B2C4F',
        margin: 0,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)', // 2열 배치
        gap: '30px',
        padding: '20px 0'
    },
    itemCard: (isJungwha) => ({
        display: 'flex',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: isJungwha ? '#fff9e6' : 'white', // 정화식당 강조
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
        cursor: 'pointer',
        borderLeft: isJungwha ? '5px solid #FFC107' : 'none',
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'translateY(-3px)'
        }
    }),
    itemImage: {
        width: '120px',
        height: '120px',
        borderRadius: '5px',
        objectFit: 'cover',
        marginRight: '20px'
    },
    itemDetails: {
        textAlign: 'left',
        flexGrow: 1
    },
    itemTitle: {
        fontSize: '1.5em',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '5px'
    },
    itemRating: {
        color: '#FFD700',
        fontSize: '1.2em'
    },
    itemDesc: {
        fontSize: '0.9em',
        color: '#666',
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
            onClick={() => navigate('/reviewpage')} // 후기 목록으로 돌아가기
            style={{ 
                background: 'none', 
                border: '1px solid #333',
                padding: '8px 15px',
                borderRadius: '4px',
                cursor: 'pointer'
            }}
        >
            목록으로
        </button>
    </header>
);

const RESTAURANT_LIST = [
    { name: '정화식당', route: '/jungwha-detail', image: Img5, rating: 5, desc: '강릉의 명물, 푸짐한 토속 한정식 전문점' },
    { name: '오월에초당', route: '/review/detail/1', image: Img1, rating: 4, desc: '한옥에서 즐기는 피자/파스타 맛집' },
    { name: '버드나무 브루어리', route: '/review/detail/2', image: Img2, rating: 5, desc: '수제 맥주와 맛있는 안주로 유명한 곳' },
    { name: '현지 해물 칼국수', route: '/review/detail/6', image: Img6, rating: 4, desc: '해물 가득! 시원한 국물이 일품' },
    { name: '오징어회 물회', route: '/review/detail/3', image: Img3, rating: 4, desc: '신선한 오징어와 시원한 물회 전문' },
    { name: '강릉 중앙시장', route: '/review/detail/7', image: Img7, rating: 5, desc: '다양한 먹거리와 길거리 음식 천국' },
    { name: '영동 막국수', route: '/review/detail/4', image: Img4, rating: 3, desc: '지역 주민들이 찾는 전통 막국수' },
    { name: '해물 전골', route: '/review/detail/8', image: Img8, rating: 4, desc: '깊은 국물 맛의 해물 전골 맛집' },
    { name: '순두부 젤라또', route: '/review/detail/9', image: Img9, rating: 5, desc: '초당 순두부마을의 명물 디저트' },
    { name: '안목해변 카페거리', route: '/review/detail/10', image: Img10, rating: 4, desc: '바다를 보며 커피를 즐기는 명소' },
];

const StarRating = ({ rating }) => {
    return (
        <span style={styles.itemRating}>
            {'★'.repeat(rating)}
            {'☆'.repeat(5 - rating)}
        </span>
    );
};


function GangneungReviewPage() {
    const navigate = useNavigate();

    const handleItemClick = (route) => {
        navigate(route);
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
            <Header navigate={navigate} />
            
            <div style={styles.container}>
                <div style={styles.titleSection}>
                    <img src={GangneungLogo} alt="강릉 로고" style={styles.cityLogo} />
                    <h1 style={styles.title}>강릉 추천 맛집 후기</h1>
                </div>
                
                <div style={styles.grid}>
                    {RESTAURANT_LIST.map((item, index) => (
                        <div 
                            key={index} 
                            style={styles.itemCard(item.name === '정화식당')}
                            onClick={() => handleItemClick(item.route)}
                        >
                            <img src={item.image} alt={item.name} style={styles.itemImage} />
                            <div style={styles.itemDetails}>
                                <h3 style={styles.itemTitle}>{item.name}</h3>
                                <StarRating rating={item.rating} />
                                <p style={styles.itemDesc}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GangneungReviewPage;
