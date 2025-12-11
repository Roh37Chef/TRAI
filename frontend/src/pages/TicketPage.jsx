// src/pages/TicketPage.jsx (최종 디자인 반영)

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
        maxWidth: '1200px',
        margin: '50px auto',
        padding: '0 20px',
        textAlign: 'center',
    },
    title: {
        fontSize: '2.5em',
        color: '#333',
        marginBottom: '10px',
    },
    subtitle: {
        fontSize: '1em',
        color: '#666',
        marginBottom: '50px',
        lineHeight: '1.4'
    },
    divider: {
        width: '100%',
        borderBottom: '1px solid #ddd',
        marginBottom: '60px'
    },
    grid: {
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        marginBottom: '50px'
    },
    card: {
        flex: 1,
        maxWidth: '300px',
        padding: '30px 20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: '1.8em',
        fontWeight: 'bold',
        color: '#1B2C4F',
        marginBottom: '20px'
    },
    ticketZone: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        marginBottom: '30px',
        width: '100%',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    ticketIcon: {
        fontSize: '3em',
        transform: 'rotate(45deg)', // 티켓이 겹쳐 보이는 효과
        display: 'inline-block',
        margin: '0 -10px'
    },
    ticketCount: {
        fontSize: '2em',
        fontWeight: 'bold',
        color: '#333',
        marginTop: '15px'
    },
    buyButton: {
        padding: '12px 40px',
        backgroundColor: '#1B2C4F',
        color: 'white',
        border: 'none',
        borderRadius: '25px',
        cursor: 'pointer',
        fontSize: '1.1em',
        fontWeight: 'bold',
        transition: 'background-color 0.2s'
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

const TicketDisplay = ({ count }) => {
    // 티켓을 겹쳐서 표시하는 로직
    const tickets = [];
    const baseIcon = '🎟️'; 
    
    if (count === 30) {
        tickets.push(baseIcon);
        tickets.push(baseIcon);
        tickets.push(baseIcon);
    } else if (count === 70) {
        tickets.push(baseIcon);
        tickets.push(baseIcon);
        tickets.push(baseIcon);
        tickets.push(baseIcon);
    } else if (count === 150) {
        tickets.push(baseIcon);
        tickets.push(baseIcon);
        tickets.push(baseIcon);
        tickets.push(baseIcon);
        tickets.push(baseIcon);
    }
    
    return (
        <div style={{ position: 'relative', height: '100px', display: 'flex', alignItems: 'center' }}>
            {tickets.map((icon, index) => (
                <span 
                    key={index}
                    style={{
                        ...styles.ticketIcon,
                        position: 'absolute',
                        left: `${index * 15}px`, // 오른쪽으로 조금씩 이동하며 겹침
                        top: '50%',
                        transform: `translateY(-50%) rotate(45deg) scale(${1 - index * 0.05})`, // 작아지고 겹치는 효과
                        opacity: 1 - index * 0.1,
                    }}
                >
                    {icon}
                </span>
            ))}
        </div>
    );
};

const TICKET_PACKAGES = [
    { name: 'Starter', tickets: 30, price: '5,000원' },
    { name: 'Traveler', tickets: 70, price: '10,000원' },
    { name: 'Planner', tickets: 150, price: '20,000원' },
];

function TicketPage() {
    const navigate = useNavigate();

    const handleBuyClick = (packageName) => {
        alert(`${packageName} 패키지 구매 페이지로 이동합니다.`);
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
            <Header navigate={navigate} />
            
            <div style={styles.container}>
                <h1 style={styles.title}>티켓 충전소</h1>
                <p style={styles.subtitle}>
                    일정 생성, 가계부 파일 변환 등에 사용되는 화폐입니다.<br/>
                    해당 페이지에서 구매 혹은 여행 후기, 광고 시청 등을 통해 무료로 충전 가능합니다.
                </p>
                
                <div style={styles.divider}></div>
                
                <div style={styles.grid}>
                    {TICKET_PACKAGES.map((pkg) => (
                        <div key={pkg.name} style={styles.card}>
                            <h3 style={styles.cardTitle}>{pkg.name}</h3>
                            <div style={styles.ticketZone}>
                                <TicketDisplay count={pkg.tickets} />
                                <p style={styles.ticketCount}>{pkg.tickets} TICKET</p>
                            </div>
                            
                            <button 
                                style={styles.buyButton}
                                onClick={() => handleBuyClick(pkg.name)}
                            >
                                {pkg.price}
                            </button>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '20px', textAlign: 'right', fontSize: '0.9em' }}>
                    <span style={{ cursor: 'pointer', color: '#666', borderBottom: '1px solid #666' }}>
                        티켓 무료 충전하기
                    </span>
                </div>
            </div>
        </div>
    );
}

export default TicketPage;
