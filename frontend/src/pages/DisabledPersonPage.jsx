import React from 'react';
import { useNavigate } from 'react-router-dom';
import TraiLogo from '../assets/logo2.jpg'; 

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
        maxWidth: '800px',
        margin: '50px auto',
        padding: '0 20px',
        textAlign: 'center'
    },
    title: {
        fontSize: '2.5em',
        color: '#333',
        marginBottom: '60px',
    },
    cardGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        textAlign: 'left'
    },
    card: {
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
        borderLeft: '5px solid #32CD32',
        cursor: 'pointer',
        transition: 'transform 0.2s',
    },
    logo: {
        height: '35px',
        marginRight: '15px',
    },
    cardTitle: {
        fontSize: '1.4em',
        fontWeight: 'bold',
        color: '#1B2C4F',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '5px'
    },
    cardDetail: {
        fontSize: '1em',
        color: '#666',
        marginLeft: '50px'
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

const getLogo = (name) => {
    switch(name) {
        case '열린관광': return <span style={{ ...styles.logo, fontSize: '2em', color: '#ff6600' }}>☀</span>;
        case '공감여행': return <span style={{ ...styles.logo, fontSize: '2em', color: '#008000' }}>🌳</span>;
        case '경기여행누림': return <span style={{ ...styles.logo, fontSize: '2em', color: '#0000ff' }}>♿</span>;
        case '무의': return <span style={{ ...styles.logo, fontSize: '2em', color: '#8A2BE2' }}>🦽</span>;
        default: return <span style={{ ...styles.logo, fontSize: '2em', color: '#1B2C4F' }}>ℹ️</span>;
    }
};

function DisabledPersonPage() {
    const navigate = useNavigate();

    const SUPPORT_ITEMS = [
        { name: '열린관광', detail: '관광지(숙소, 음식점)별 편의 시설 안내', link: 'https://access.visitkorea.or.kr/main/main.do' },
        { name: '공감여행', detail: '인천시 여행 차량 지원 프로그램', link: 'http://www.공감여행.com' },
        { name: '경기여행누림', detail: '경기도 내 여행지 이동 지원 서비스', link: 'http://www.ggnurim.or.kr/cop' },
        { name: '무의', detail: '휠체어가 다니기 좋은 곳은 모든 사람이 다니기 좋은 곳', link: 'https://www.wearemuui.com/' },
        { name: '대한민국 구석구석', detail: '무장애 여행지 및 유용한 정보 모음', link: 'https://access.visitkorea.or.kr/travel/useful_info.do#none' },
        { name: '정책브리핑', detail: '장애인 여행 지원 정책 및 최신 뉴스', link: 'https://www.korea.kr/news/policyNewsView.do?newsId=148925368' },
        { name: '행복나눔재단', detail: '장애인 여행 지원 관련 상세 블로그 정보', link: 'https://blog.naver.com/happinessfoundation/223018585877' }
    ];

    const handleCardClick = (link) => {
        window.open(link, '_blank');
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
            <Header navigate={navigate} />
            
            <div style={styles.container}>
                <h1 style={styles.title}>장애인 여행 지원 제도 안내</h1>
                
                <div style={styles.cardGrid}>
                    {SUPPORT_ITEMS.map((item, index) => (
                        <div 
                            key={index} 
                            style={styles.card}
                            onClick={() => handleCardClick(item.link)}
                        >
                            <div style={styles.cardTitle}>
                                {getLogo(item.name)}
                                {item.name}
                            </div>
                            <p style={styles.cardDetail}>{item.detail}</p>
                        </div>
                    ))}
                </div>

                <p style={{ marginTop: '50px', fontSize: '0.9em', color: '#666' }}>
                    *상기 정보는 변동될 수 있으며, 클릭 시 해당 기관 웹사이트로 이동합니다.
                </p>
            </div>
        </div>
    );
}

export default DisabledPersonPage;
