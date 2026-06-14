// src/pages/ReviewPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import TraiLogo from '../assets/logo2.jpg'; 

// 👇 도시 아이콘 이미지 파일을 불러옵니다. 👇
import GangneungLogo from '../assets/gangneung_logo.jpg';
import SeoulLogo from '../assets/seoul_logo.jpg';
import BusanLogo from '../assets/busan_logo.jpg';
import JejuLogo from '../assets/jeju_logo.jpg';
import DaeguLogo from '../assets/daegu_logo.jpg';
import DaejeonLogo from '../assets/daejeon_logo.jpg';

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
        textAlign: 'center'
    },
    title: {
        fontSize: '2.5em',
        color: '#333',
        marginBottom: '10px',
    },
    divider: {
        width: '100%',
        borderBottom: '1px solid #ddd',
        marginBottom: '60px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // 3열 배치
        gap: '30px',
        marginBottom: '50px'
    },
    card: {
        padding: '25px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '200px',
        '&:hover': {
            transform: 'translateY(-5px)'
        }
    },
    logoImage: {
        height: '50px',
        marginBottom: '10px',
        objectFit: 'contain'
    },
    cityName: {
        fontSize: '1.5em',
        fontWeight: 'bold',
        color: '#1B2C4F',
        marginBottom: '5px'
    },
    count: {
        fontSize: '1em',
        color: '#666'
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

const CITIES = [
    { name: '강릉', count: 143, logo: GangneungLogo, route: '/gangneungreview' }, // 강릉은 개별 페이지로 라우팅
    { name: '서울', count: 275, logo: SeoulLogo, route: '/review/seoul' },
    { name: '부산', count: 197, logo: BusanLogo, route: '/review/busan' },
    { name: '제주', count: 164, logo: JejuLogo, route: '/review/jeju' },
    { name: '대구', count: 89, logo: DaeguLogo, route: '/review/daegu' },
    { name: '대전', count: 57, logo: DaejeonLogo, route: '/review/daejeon' },
];

function ReviewPage() {
    const navigate = useNavigate();

    const handleCityClick = (cityRoute) => {
        // 강릉이 아닌 다른 도시는 일반적인 상세 페이지로 이동
        navigate(cityRoute);
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
            <Header navigate={navigate} />
            
            <div style={styles.container}>
                <p style={{ textAlign: 'left', color: '#666', marginBottom: '20px', fontSize: '0.9em' }}>
                    홈 &gt; 여행 후기
                </p>
                
                <h1 style={styles.title}>여행 후기</h1>
                
                <div style={styles.divider}></div>
                
                <div style={styles.grid}>
                    {CITIES.map((city) => (
                        <div 
                            key={city.name} 
                            style={styles.card} 
                            onClick={() => handleCityClick(city.route)}
                        >
                            <img src={city.logo} alt={city.name} style={styles.logoImage} />
                            <h3 style={styles.cityName}>{city.name}</h3>
                            <p style={styles.count}>등록된 장소 : {city.count}개</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ReviewPage;
