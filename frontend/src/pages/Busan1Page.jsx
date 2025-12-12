// src/pages/Busan1Page.jsx (최종 - 지도 기능 제거)

import React from 'react';
// NaverMap 관련 import 모두 제거합니다.
import TraiLogo from '../assets/logo1.jpg'; 

const Busan1Page = () => {
    // 지도 API 관련 로직 제거 (useNavermaps, if (!navermaps) 등)
    
    const schedule = [
        { day: 'DAY 1', title: '해운대 & 달맞이길' },
        { day: 'DAY 2', title: '감천 문화마을 투어' },
        { day: 'DAY 3', title: '태종대 유람선' },
        { day: 'DAY 4', title: '서면 맛집 탐방' },
    ];
    
    const sidebarStyle = {
        width: '300px',
        height: '100vh',
        backgroundColor: '#fff',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10,
        flexShrink: 0,
    };

    const logoStyle = {
        height: '40px',
        marginBottom: '20px',
        display: 'block'
    };

    const mapPlaceholderStyle = {
        flexGrow: 1,
        height: '100vh',
        backgroundColor: '#e0e0e0', // 지도가 들어갈 영역에 회색 배경 표시
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5em',
        color: '#666'
    };


    return (
        <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
            
            {/* 좌측 일정 사이드바 */}
            <div style={sidebarStyle}>
                <img src={TraiLogo} alt="TRAI Logo" style={logoStyle} />
                <button style={{ padding: '10px', backgroundColor: '#1B2C4F', color: 'white', border: 'none', borderRadius: '4px', marginBottom: '20px', cursor: 'pointer' }}>
                    설정 저장
                </button>
                <h2 style={{ fontSize: '1.5em', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                    부산
                </h2>

                {schedule.map((item, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <div style={{ 
                            padding: '10px', 
                            border: '1px solid #ccc', 
                            borderRadius: '4px', 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}>
                            <span>{item.day}</span>
                            <span style={{ fontSize: '1em' }}>{item.title}</span>
                            <span style={{ fontSize: '1em', color: '#666' }}>&#9660;</span> 
                        </div>
                    </div>
                ))}
                
                <button style={{ 
                    padding: '10px', 
                    backgroundColor: '#e0e0e0', 
                    color: '#333', 
                    border: 'none', 
                    borderRadius: '4px', 
                    marginTop: '20px', 
                    cursor: 'pointer' 
                }}>
                    여행 기부 계획 확인 &#9654;
                </button>
            </div>

            {/* 우측 지도 영역 (Placeholder로 대체) */}
            <div style={mapPlaceholderStyle}>
                지도 렌더링 불가 (API 충돌)
            </div>
        </div>
    );
};

export default Busan1Page;
