// src/pages/MyPlanPage.jsx

import React, { useState } from 'react';
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
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '50px'
    },
    card: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'left',
        minHeight: '120px',
        position: 'relative'
    },
    cardTitle: {
        fontSize: '1.2em',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#1B2C4F'
    },
    cardDetail: {
        fontSize: '0.9em',
        color: '#666'
    },
    reviewButton: {
        position: 'absolute',
        bottom: '15px',
        right: '15px',
        padding: '8px 15px',
        backgroundColor: '#333',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '0.8em'
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
            로그아웃
        </button>
    </header>
);

// 임시 저장된 여행 데이터 (요청하신 부산 여행 포함)
const SAMPLE_PLANS = [
    {
        id: 1,
        title: "방학여행",
        location: "부산",
        dates: "2026.01.13. ~ 2026.01.",
        icon: '🌊',
        isSaved: true // 이 항목만 저장된 것으로 간주
    },
    {
        id: 2,
        title: "가족여행",
        location: "강릉",
        dates: "2025.11.30.",
        icon: '🏂',
        isSaved: false
    },
    {
        id: 3,
        title: "야구 직관",
        location: "대구",
        dates: "2024.04.17.",
        icon: '⚾',
        isSaved: false
    },
    {
        id: 4,
        title: "빵집 투어",
        location: "대전",
        dates: "2023.12.12.",
        icon: '🥐',
        isSaved: false
    }
];

function MyPlanPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('plan'); // 'plan' or 'review'

    const handleTabClick = (tabName) => {
        if (tabName === 'review') {
            navigate('/myreviewpage'); // '리뷰' 탭 클릭 시 라우팅
        } else {
            setActiveTab('plan');
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
                        style={styles.tabButton(activeTab === 'plan')}
                        onClick={() => handleTabClick('plan')}
                    >
                        여행 계획
                    </button>
                    <button 
                        style={styles.tabButton(activeTab === 'review')}
                        onClick={() => handleTabClick('review')}
                    >
                        리뷰
                    </button>
                </div>
                
                {/* 여행 계획 목록 */}
                {activeTab === 'plan' && (
                    <div style={styles.grid}>
                        {SAMPLE_PLANS.map(plan => (
                            <div key={plan.id} style={styles.card}>
                                <h3 style={styles.cardTitle}>{plan.title}</h3>
                                <p style={styles.cardDetail}>
                                    <span style={{ fontSize: '1.2em', marginRight: '5px' }}>{plan.icon}</span> 
                                    {plan.location}
                                </p>
                                <p style={styles.cardDetail}>{plan.dates}</p>
                                
                                <button 
                                    style={{...styles.reviewButton, backgroundColor: plan.isSaved ? '#1B2C4F' : '#333'}}
                                    onClick={() => alert(`'${plan.title}'에 대한 후기 작성 페이지로 이동합니다.`)}
                                >
                                    후기 작성하기
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <span style={{ padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px' }}>1</span>
                </div>
            </div>
        </div>
    );
}

export default MyPlanPage;
