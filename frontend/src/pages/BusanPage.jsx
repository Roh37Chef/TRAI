import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

// 로고 및 이미지 경로
import TraiLogo from '../assets/logo1.jpg'; 
import BusanRouteImage from '../assets/busan_map_route.jpg'; 
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

// 서브 컴포넌트들 생략 가능 (코드 길어짐 방지)
const DayRouteOverlay = ({ selectedDay }) => { /* 기존 코드 유지 */ return <>{/* 마커 로직 */}</>; };
const FixedMarkersOverlay = ({ showChargingStations, showRentalLocations }) => { /* 기존 코드 유지 */ return <>{/* 마커 로직 */}</>; };

const BusanPage = () => { 
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = useState(null); 
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false); 
    const [showChargingStations, setShowChargingStations] = useState(false);
    const [showRentalLocations, setShowRentalLocations] = useState(false);

    // ✅ 메인 페이지로 이동하는 로직으로 수정
    const goToMain = () => {
        navigate('/'); 
    }

    const toggleDay = (day) => { setSelectedDay(selectedDay === day ? null : day); };
    const goToMoneyPage = () => { navigate('/moneypage'); }
    const toggleChargingStations = () => { setShowChargingStations(!showChargingStations); }
    const toggleRentalLocations = () => { setShowRentalLocations(!showRentalLocations); }
    const openSaveModal = () => setIsSaveModalOpen(true);
    const handleSave = () => { alert("부산 일정이 임시 저장되었습니다."); setIsSaveModalOpen(false); }
    
    const getMapBackground = () => {
        if (selectedDay === 'DAY 2') return `url(${BusanRouteImageDay2})`;
        return `url(${BusanRouteImage})`;
    };

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden' }}>
            <div style={{ width: '350px', height: '100vh', backgroundColor: '#fff', padding: '20px', boxShadow: '2px 0 10px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div onClick={goToMain} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                         <img src={TraiLogo} alt="TRAI Logo" style={{ height: '35px', marginRight: '10px' }} />
                         <span style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#1B2C4F' }}>TRAI</span>
                    </div>
                    <button onClick={openSaveModal} style={{ padding: '8px 15px', backgroundColor: '#1B2C4F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>저장</button>
                </div>
                
                <h2 style={{ fontSize: '1.8em', fontWeight: 'bold', margin: '0 0 20px 0' }}>부산</h2>

                {Object.keys(initialSchedule).map((day) => (
                    <div key={day} style={{ marginBottom: '15px', border: '1px solid #eee', borderRadius: '6px' }}>
                        <div onClick={() => toggleDay(day)} style={{ padding: '12px', backgroundColor: '#f9f9f9', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 'bold', color: '#1B2C4F' }}>
                            <span>{day}</span>
                        </div>
                        {selectedDay === day && (
                            <div style={{ padding: '15px 10px' }}>
                                {/* 일정 상세 목록 */}
                                {initialSchedule[day].map((item, index) => (
                                    <div key={index} style={{ marginBottom: '10px' }}>
                                        <div>{item.type} ({item.time}) - {item.detail}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                
                <button onClick={goToMoneyPage} style={{ padding: '12px', backgroundColor: '#E6E6FA', border: 'none', borderRadius: '4px', marginTop: 'auto', cursor: 'pointer', fontWeight: 'bold' }}>
                    여행 가계부 확인 →
                </button>
            </div>

            <div style={{ flexGrow: 1, backgroundImage: getMapBackground(), backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                {/* 오버레이 컴포넌트들 생략 */}
            </div>
        </div>
    );
};

export default BusanPage;
