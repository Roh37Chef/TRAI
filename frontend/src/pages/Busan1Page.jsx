// src/pages/Busan1Page.jsx

import React from 'react';
import { useNavermaps, NaverMap, Marker } from 'react-naver-maps';
import TraiLogo from '../assets/logo1.jpg'; 

const Busan1Page = () => {
    const navermaps = useNavermaps();
    
    // 네이버 맵의 초기 중심 좌표 (예시: 부산 시청)
    const initialCenter = navermaps ? new navermaps.LatLng(35.1795, 129.0756) : null;
    
    // 여행 일정을 관리하는 사이드바 데이터 (예시)
    const schedule = [
        { day: 'DAY 1', title: '해운대 & 달맞이길' },
        { day: 'DAY 2', title: '감천 문화마을 투어' },
        { day: 'DAY 3', title: '태종대 유람선' },
        { day: 'DAY 4', title: '서면 맛집 탐방' },
    ];
    
    // 사이드바 스타일 정의
    const sidebarStyle = {
        width: '300px',
        height: '100vh',
        backgroundColor: '#fff',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10 // 지도 위에 표시되도록 zIndex 설정
    };

    const logoStyle = {
        height: '40px',
        marginBottom: '20px',
        display: 'block'
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

                {/* Day별 일정 목록 */}
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

                {/* 여행 기부 계획 확인 버튼 */}
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

            {/* 우측 네이버 지도 영역 */}
            <div style={{ flexGrow: 1 }}>
                {navermaps && initialCenter && (
                    <NaverMap
                        defaultCenter={initialCenter}
                        defaultZoom={12}
                        style={{ width: '100%', height: '100%' }}
                        zoomControl={true}
                        scaleControl={true}
                    >
                        {/* 마커 예시: 부산역 */}
                        <Marker 
                            position={new navermaps.LatLng(35.1154, 129.0416)} 
                            title="부산역" 
                        />
                    </NaverMap>
                )}
                {!navermaps && (
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                        네이버 지도 로딩 중이거나 API 설정이 필요합니다.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Busan1Page;
