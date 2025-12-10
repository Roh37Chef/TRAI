import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar'; // 달력 라이브러리 (npm install react-calendar 필요)
import '../styles/Calendar.css'; // 달력 스타일을 위한 CSS 파일이 필요함

// Option 3, 6에서 사용할 중앙 로고 (logo1.jpg)
import LargeLogo from '../assets/logo1.jpg'; 

const Option3Page = () => {
    const navigate = useNavigate();
    const [goingDate, setGoingDate] = useState(null); // 가는 날
    const [comingDate, setComingDate] = useState(null); // 오는 날

    const handleNext = () => {
        if (!goingDate || !comingDate) {
            alert("가는 날과 오는 날을 모두 선택해주세요.");
            return;
        }
        if (goingDate >= comingDate) {
            alert("오는 날은 가는 날보다 늦어야 합니다.");
            return;
        }
        
        // 날짜를 ISO 문자열로 변환하여 다음 페이지로 전달
        navigate('/option4', { 
            state: { 
                goingDate: goingDate.toISOString().split('T')[0], 
                comingDate: comingDate.toISOString().split('T')[0]
            } 
        });
    };

    return (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
            {/* Option 3은 logo1.jpg를 중앙에 크게 배치 */}
            <img 
                src={LargeLogo} 
                alt="TRAI Logo" 
                style={{ height: '100px', margin: '0 auto 20px auto', display: 'block' }} 
            />
            <p style={{ fontSize: '0.9em', color: '#32CD32', fontWeight: 'bold', marginBottom: '50px' }}>
                AI-PLANNED, PERSONALIZED ADVENTURES
            </p>
            
            <h2 style={{ fontSize: '1.8em', margin: '0 0 30px 0' }}>
                Q. 원하는 날짜를 선택해주세요.
            </h2>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', maxWidth: '1000px', margin: '0 auto' }}>
                
                {/* 가는 날 선택 달력 */}
                <div>
                    <h3 style={{ marginBottom: '20px', color: goingDate ? '#32CD32' : '#333' }}>
                        📅 가는 날 (체크인)
                    </h3>
                    <Calendar 
                        onChange={setGoingDate} 
                        value={goingDate} 
                        minDate={new Date()} // 오늘 이전 날짜 선택 불가
                        tileDisabled={({date, view}) => view === 'month' && date < new Date()}
                        selectRange={false}
                    />
                    <p style={{ marginTop: '10px' }}>
                        {goingDate ? `선택된 날짜: ${goingDate.toDateString()}` : '날짜를 선택하세요.'}
                    </p>
                </div>
                
                {/* 오는 날 선택 달력 */}
                <div>
                    <h3 style={{ marginBottom: '20px', color: comingDate ? '#32CD32' : '#333' }}>
                        🗓️ 오는 날 (체크아웃)
                    </h3>
                    <Calendar 
                        onChange={setComingDate} 
                        value={comingDate} 
                        minDate={goingDate || new Date()} // 가는 날 이후 또는 오늘 이후만 선택 가능
                        tileDisabled={({date, view}) => view === 'month' && date <= goingDate}
                        selectRange={false}
                    />
                    <p style={{ marginTop: '10px' }}>
                        {comingDate ? `선택된 날짜: ${comingDate.toDateString()}` : '날짜를 선택하세요.'}
                    </p>
                </div>
            </div>

            <button
                onClick={handleNext}
                style={{
                    marginTop: '50px',
                    padding: '15px 60px',
                    backgroundColor: '#1B2C4F',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1.2em'
                }}
            >
                다음
            </button>
        </div>
    );
};

export default Option3Page;
