// src/pages/BusanPage.jsx (최종 - Import 구문 오류 수정 완료 + DAY 2 배경 이미지 변경 기능 추가)

import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

// 로고 및 지도 이미지 경로
import TraiLogo from '../assets/logo1.jpg'; 
// ⚠️ 주의: 이 파일은 프로젝트 폴더에 있어야 합니다.
import BusanRouteImage from '../assets/busan_map_route.jpg'; 
// ✅ DAY 2 배경 이미지 경로 추가
import BusanRouteImageDay2 from '../assets/busan_map_route_day2.jpg'; 

const initialSchedule = {
    'DAY 1': [
        { type: '숙소 출발', time: '09:00', detail: '해운대 그랜드 호텔', cost: '0원', notes: '지하철 2호선 장산 방면 이용', editable: true },
        { type: '관광', time: '10:30', detail: '해운대 해변', cost: '0원', notes: '해변 산책로 이용, 인근 휠체어 대여소 확인', editable: true },
        { type: '식사', time: '12:30', detail: '금산식당 (아구찜)', cost: '45,000원', notes: '이동거리: 305m. 해운대역에서 도보 이동 (접근성 양호)', editable: true },
        { type: '관광', time: '14:30', detail: '달맞이길 (문탠로드)', cost: '0원', notes: '부산 100번 버스 이용. 휠체어 접근 가능한 전망대 위주', editable: true },
    ],
    'DAY 2': [
        { type: '관광', time: '10:00', detail: '감천 문화마을', cost: '0원', notes: '토성역 하차 후 감천마을 가는 버스 이용 (마을버스 1-1, 2, 2-2). 언덕 경사 주의', editable: true },
        { type: '카페', time: '13:00', detail: "마을 내 카페 '아방가르드'", cost: '15,000원', notes: '내부 엘리베이터 설치, 뷰 좋음', editable: true }, 
        { type: '관광', time: '15:00', detail: '국제시장/깡통시장', cost: '자유', notes: '시장 내 경사가 적은 구역 위주로 이동', editable: true },
    ],
    'DAY 3': [
        { type: '관광', time: '11:00', detail: '태종대 유람선', cost: '20,000원', notes: '다누비 순환열차 이용 가능. 유람선 선실 사전 문의', editable: true },
    ],
    'DAY 4': [
        { type: '식사', time: '18:00', detail: "서면 '미스터스시' 본점", cost: '35,000원', notes: '엘리베이터 이용 가능, 넓은 테이블 배치', editable: true },
    ],
};

// ===============================================
// 서브 컴포넌트: DAY별 경로 오버레이 렌더링 (수정 없음)
// ===============================================
const DayRouteOverlay = ({ selectedDay }) => {
    // 임의의 마커 위치 배열 (최소 7개 이상)
    const day1Markers = [
        { top: '25%', left: '40%', label: 'A' },
        { top: '35%', left: '48%', label: 'B' },
        { top: '48%', left: '55%', label: 'C' },
        { top: '55%', left: '45%', label: 'D' },
        { top: '65%', left: '38%', label: 'E' },
        { top: '75%', left: '30%', label: 'F' },
        { top: '80%', left: '20%', label: 'G' },
    ];
    
    const day2Markers = [
        { top: '15%', left: '75%', label: 'A' },
        { top: '30%', left: '70%', label: 'B' },
        { top: '45%', left: '60%', label: 'C' },
        { top: '60%', left: '50%', label: 'D' },
        { top: '75%', left: '40%', label: 'E' },
        { top: '85%', left: '30%', label: 'F' },
        { top: '90%', left: '25%', label: 'G' },
    ];

    const getMarkers = () => {
        let markers = [];
        if (selectedDay === 'DAY 1') {
            markers = day1Markers;
        } else if (selectedDay === 'DAY 2') {
            markers = day2Markers;
        } else {
            return null;
        }

        return markers.map((marker, index) => (
            // 일반 마커 (📍) 크기 키움: fontSize: '40px'
            <div 
                key={index}
                style={{ 
                    position: 'absolute', 
                    top: marker.top, 
                    left: marker.left, 
                    color: '#1B2C4F', // 마커 색상을 로고 색과 비슷하게 조정
                    fontSize: '40px', // 크기 키움
                    textShadow: '0 0 5px white', 
                    zIndex: 20,
                    transform: 'translate(-50%, -100%)' 
                }}
            >
                📍
                {/* 마커 위에 작은 숫자 표시 */}
                <span style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    fontSize: '0.4em', 
                    color: 'white', 
                    fontWeight: 'bold' 
                }}>
                    {marker.label}
                </span>
            </div>
        ));
    };

    return (
        <>
            {getMarkers()}
        </>
    );
};

// ===============================================
// 서브 컴포넌트: 토글되는 고정 마커 렌더링 (수정 없음)
// ===============================================
const FixedMarkersOverlay = ({ showChargingStations, showRentalLocations }) => {
    // 마커 아이콘 크기를 40px로 키움
    const ICON_SIZE = '40px'; 
    
    // 충전소 마커 (빨간색 ⚡️) - 고정 위치
    const ChargingMarkers = showChargingStations ? (
        <>
            <div style={{ position: 'absolute', top: '25%', left: '35%', color: '#f44336', fontSize: ICON_SIZE, textShadow: '0 0 5px white', zIndex: 25 }}>🔋</div>
            <div style={{ position: 'absolute', top: '60%', left: '55%', color: '#f44336', fontSize: ICON_SIZE, textShadow: '0 0 5px white', zIndex: 25 }}>🔋</div>
        </>
    ) : null;

    // 대여소 마커 (파란색 ♿) - 고정 위치
    const RentalMarkers = showRentalLocations ? (
        <>
            <div style={{ position: 'absolute', top: '40%', left: '70%', color: '#2196f3', fontSize: ICON_SIZE, textShadow: '0 0 5px white', zIndex: 25 }}>♿</div>
            <div style={{ position: 'absolute', top: '80%', left: '45%', color: '#2196f3', fontSize: ICON_SIZE, textShadow: '0 0 5px white', zIndex: 25 }}>♿</div>
        </>
    ) : null;
    
    return (
        <>
            {ChargingMarkers}
            {RentalMarkers}
        </>
    );
}


// ===============================================
// 메인 컴포넌트: BusanPage (배경 이미지 로직 수정)
// ===============================================
const BusanPage = () => { 
    const navigate = useNavigate();
    
    // UI 토글 상태
    const [selectedDay, setSelectedDay] = useState(null); 
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false); 
    
    // 지도 마커 토글 상태
    const [showChargingStations, setShowChargingStations] = useState(false);
    const [showRentalLocations, setShowRentalLocations] = useState(false);

    // 로고 클릭 핸들러: LoginSuccessPage로 이동
    const goToLoginSuccess = () => {
        navigate('/loginsuccess');
    }

    const toggleDay = (day) => {
        setSelectedDay(selectedDay === day ? null : day);
    };
    
    // 가계부 페이지로 이동
    const goToMoneyPage = () => {
        navigate('/moneypage');
    }
    
    // 지도 마커 토글 핸들러
    const toggleChargingStations = () => {
        setShowChargingStations(!showChargingStations);
    }
    
    const toggleRentalLocations = () => {
        setShowRentalLocations(!showRentalLocations);
    }

    // 저장 팝업 열기/닫기
    const openSaveModal = () => setIsSaveModalOpen(true);
    const handleSave = () => {
        alert("부산 일정이 임시 저장되었습니다.");
        setIsSaveModalOpen(false);
    }
    
    // --- 스타일 정의 ---
    const sidebarStyle = {
        width: '350px',
        height: '100vh',
        backgroundColor: '#fff',
        padding: '20px',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10,
        flexShrink: 0,
    };

    const logoStyle = {
        height: '35px', 
        marginRight: '10px'
    };

    // ✅ 선택된 DAY에 따라 배경 이미지 URL을 동적으로 결정하는 로직
    const getMapBackground = () => {
        if (selectedDay === 'DAY 2') {
            return `url(${BusanRouteImageDay2})`; // DAY 2 선택 시 새로운 이미지 사용
        }
        return `url(${BusanRouteImage})`; // 기본 이미지 (DAY 1 및 기타)
    };

    const mapStyle = {
        flexGrow: 1,
        height: '100vh',
        backgroundImage: getMapBackground(), // ✅ 함수 호출
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative', 
        transition: 'background-image 0.5s ease', // 부드러운 전환 효과 (선택 사항)
    };

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden' }}>
            
            {/* 좌측 일정 사이드바 */}
            <div style={sidebarStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div 
                        onClick={goToLoginSuccess} // 로고 클릭 이벤트 
                        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    >
                         <img src={TraiLogo} alt="TRAI Logo" style={logoStyle} />
                         <span style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#1B2C4F' }}>TRAI</span>
                    </div>
                    {/* 저장 버튼 (팝업 트리거) */}
                    <button onClick={openSaveModal} style={{ padding: '8px 15px', backgroundColor: '#1B2C4F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        저장
                    </button>
                </div>
                
                <h2 style={{ fontSize: '1.8em', fontWeight: 'bold', margin: '0 0 20px 0', color: 'black' }}>
                    부산
                </h2>

                {Object.keys(initialSchedule).map((day) => (
                    <div key={day} style={{ marginBottom: '15px', border: '1px solid #eee', borderRadius: '6px' }}>
                        {/* DAY 버튼 */}
                        <div 
                            onClick={() => toggleDay(day)}
                            style={{ 
                                padding: '12px', 
                                backgroundColor: '#f9f9f9', 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                color: '#1B2C4F',
                                borderBottom: selectedDay === day ? '1px solid #ccc' : 'none',
                                borderRadius: selectedDay === day ? '6px 6px 0 0' : '6px'
                            }}
                        >
                            <span>{day}</span>
                            <span style={{ fontSize: '1em', transform: selectedDay === day ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>&#9660;</span> 
                        </div>

                        {/* 일정 상세 목록 (펼쳐진 콘텐츠) */}
                        {selectedDay === day && (
                            <div style={{ padding: '15px 10px' }}>
                                {initialSchedule[day].map((item, index) => (
                                    <div key={index} style={{ marginBottom: '15px', padding: '10px', borderBottom: '1px dotted #eee', position: 'relative' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div style={{ fontWeight: 'bold', color: '#333' }}>
                                                {item.type} ({item.time})
                                            </div>
                                            <div style={{ display: 'flex', gap: '5px' }}>
                                                <button style={{ padding: '4px 8px', fontSize: '0.8em', backgroundColor: '#e0f7fa', border: '1px solid #00bcd4', borderRadius: '3px', cursor: 'pointer' }}>
                                                    EDIT
                                                </button>
                                                <button style={{ padding: '4px 8px', fontSize: '0.8em', backgroundColor: '#ffebee', border: '1px solid #f44336', color: '#f44336', borderRadius: '3px', cursor: 'pointer' }}>
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                        <p style={{ margin: '5px 0 0 0', fontSize: '0.9em', color: '#555' }}>
                                            {item.detail} | {item.cost}
                                        </p>
                                        <p style={{ margin: '3px 0 0 0', fontSize: '0.8em', color: '#999' }}>
                                            {item.notes}
                                        </p>
                                    </div>
                                ))}
                                {/* 일정 추가 버튼 */}
                                <button style={{ width: '100%', padding: '8px', backgroundColor: '#f0f0f0', border: '1px dashed #ccc', borderRadius: '4px', marginTop: '10px', cursor: 'pointer' }}>
                                    + 항목 추가
                                </button>
                            </div>
                        )}
                    </div>
                ))}
                
                {/* 여행 가계부 확인 버튼 (moneypage 이동) */}
                <button 
                    onClick={goToMoneyPage}
                    style={{ 
                        padding: '12px', 
                        backgroundColor: '#E6E6FA', 
                        color: '#1B2C4F', 
                        border: 'none', 
                        borderRadius: '4px', 
                        marginTop: 'auto', 
                        cursor: 'pointer',
                        fontSize: '1em',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    여행 가계부 확인 →
                </button>
            </div>

            {/* 우측 지도 영역 (이미지 배경 + 오버레이) */}
            <div style={mapStyle}>
                {/* 1. DAY별 경로 및 커서 */}
                <DayRouteOverlay selectedDay={selectedDay} />
                
                {/* 2. 토글되는 충전소/대여소 마커 */}
                <FixedMarkersOverlay 
                    showChargingStations={showChargingStations} 
                    showRentalLocations={showRentalLocations} 
                />
                
                {/* 3. 지도 오른쪽 하단의 UI 요소 */}
                <div style={{ 
                    position: 'absolute', 
                    bottom: '20px', 
                    right: '20px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '10px',
                    zIndex: 30
                }}>
                    {/* 확대/축소 버튼 (비활성화) */}
                    <div style={{ fontSize: '30px', color: '#333', cursor: 'default', backgroundColor: 'white', padding: '5px', borderRadius: '50%', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>🔍</div>
                    
                    {/* 전기 휠체어 충전소 토글 버튼 */}
                    <button 
                        onClick={toggleChargingStations}
                        style={{ fontSize: '24px', color: showChargingStations ? 'white' : '#555', backgroundColor: showChargingStations ? '#f44336' : 'white', border: 'none', padding: '10px', borderRadius: '50%', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', cursor: 'pointer' }}
                        title="전기 휠체어 충전소 표시"
                    >
                        🔋
                    </button>
                    
                    {/* 휠체어 대여소 토글 버튼 */}
                    <button 
                        onClick={toggleRentalLocations}
                        style={{ fontSize: '24px', color: showRentalLocations ? 'white' : '#555', backgroundColor: showRentalLocations ? '#2196f3' : 'white', border: 'none', padding: '10px', borderRadius: '50%', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', cursor: 'pointer' }}
                        title="휠체어 대여소 표시"
                    >
                        🦽
                    </button>

                </div>
            </div>

            {/* 저장 팝업 모달 */}
            {isSaveModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', 
                    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 
                }}>
                    <div style={{ 
                        backgroundColor: 'white', padding: '30px', borderRadius: '8px', width: '350px', 
                        boxShadow: '0 5px 15px rgba(0,0,0,0.3)', textAlign: 'center', position: 'relative' 
                    }}>
                        <h3 style={{ margin: '0 0 20px 0', fontSize: '1.2em', fontWeight: 'bold' }}>저장하시겠습니까?</h3>
                        <p style={{ margin: '0 0 10px 0', fontSize: '0.9em' }}>파일명을 작성해주세요.</p>
                        <input 
                            type="text" 
                            defaultValue="부산" 
                            style={{ width: '90%', padding: '10px', margin: '10px 0 20px 0', border: '1px solid #ccc', borderRadius: '4px' }} 
                        />
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                            <button onClick={() => setIsSaveModalOpen(false)} style={{ padding: '10px 20px', backgroundColor: '#f0f0f0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                취소
                            </button>
                            <button onClick={handleSave} style={{ padding: '10px 20px', backgroundColor: '#1B2C4F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                SAVE
                            </button>
                        </div>
                        <button 
                            onClick={() => setIsSaveModalOpen(false)} 
                            style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '1.2em', cursor: 'pointer' }}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BusanPage;
