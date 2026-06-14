// src/pages/TicketPage.jsx (최종 - 아이콘 중앙 정렬 및 통일)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 구문 오류 수정 완료!
import Header from '../components-ui/Header'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons'; // 티켓 아이콘 하나만 불러옴

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '50px auto',
        padding: '0 20px',
        textAlign: 'center',
    },
    title: {
        fontSize: '2.5em',
        color: '#1B2C4F',
        marginBottom: '10px',
        marginTop: '0',
    },
    subtitle: {
        fontSize: '1.2em',
        color: '#666',
        marginBottom: '50px',
    },
    ticketInfo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '50px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: 'white',
    },
    packageGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '30px',
    },
    packageCard: {
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
        cursor: 'pointer',
        border: '1px solid #eee',
        // 👇 중앙 정렬을 위한 Flexbox 설정
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        // 아이콘 크기 조정
        fontSize: '4em', 
        marginBottom: '15px',
    }
};

const TICKET_PACKAGES = [
    // 모든 아이콘을 faTicketAlt로 통일
    { name: 'Starter', tickets: 30, price: '5,000원', icon: faTicketAlt, color: '#4CAF50' },
    { name: 'Traveler', tickets: 70, price: '10,000원', icon: faTicketAlt, color: '#2196F3' },
    { name: 'Planner', tickets: 150, price: '20,000원', icon: faTicketAlt, color: '#FF9800' },
];

const TicketDisplay = ({ currentTickets }) => (
    <div style={styles.ticketInfo}>
        <FontAwesomeIcon icon={faTicketAlt} style={{ fontSize: '2em', color: '#1B2C4F' }} />
        <h3 style={{ margin: 0 }}>현재 보유 티켓: {currentTickets}개</h3>
    </div>
);

function TicketPage() {
    const navigate = useNavigate();
    const [currentTickets] = useState(25); // 더미 데이터

    const handleBuyClick = (packageName) => {
        alert(`${packageName} 패키지 구매 페이지로 이동합니다.`);
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
            <Header showMenuButton={true} />
            
            <div style={styles.container}>
                <h1 style={styles.title}>티켓 충전소</h1>
                <p style={styles.subtitle}>여행 계획 생성에 필요한 티켓을 충전하세요.</p>
                
                <TicketDisplay currentTickets={currentTickets} />

                <div style={styles.packageGrid}>
                    {TICKET_PACKAGES.map((pkg) => (
                        <div 
                            key={pkg.name} 
                            style={styles.packageCard} // styles.packageCard에 중앙 정렬 속성 적용됨
                            onClick={() => handleBuyClick(pkg.name)}
                        >
                            {/* 아이콘과 텍스트가 모두 중앙 정렬 */}
                            <FontAwesomeIcon icon={pkg.icon} style={{...styles.icon, color: pkg.color}} />
                            <h2 style={{ color: pkg.color, marginTop: '10px' }}>{pkg.name} 패키지</h2>
                            <p style={{ fontSize: '2.5em', margin: '15px 0', fontWeight: 'bold' }}>{pkg.tickets} <span style={{ fontSize: '0.5em', fontWeight: 'normal' }}>개</span></p>
                            <p style={{ color: '#999' }}>{pkg.price}</p>
                            <button
                                style={{
                                    marginTop: '20px',
                                    padding: '10px 30px',
                                    backgroundColor: '#1B2C4F',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                            >
                                구매하기
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TicketPage;
