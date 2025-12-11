// src/pages/Option3Page.jsx (의존성 제거 및 HTML Input 대체 최종 버전)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// react-datepicker 관련 import는 모두 제거되었습니다.

import LargeLogo from '../assets/logo1.jpg'; 

const datePickerContainerStyle = {
    display: 'flex', 
    justifyContent: 'center', 
    gap: '50px', 
    maxWidth: '1000px', 
    margin: '0 auto',
};

const inputStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '1em',
    textAlign: 'center',
    cursor: 'pointer',
    width: '200px',
    marginTop: '10px',
    // HTML input[type=date] 스타일
    height: '40px',
    fontFamily: 'inherit', // 기본 폰트 상속
};

const Option3Page = () => {
    const navigate = useNavigate();
    const [goingDate, setGoingDate] = useState(''); // YYYY-MM-DD 문자열 저장
    const [comingDate, setComingDate] = useState(''); // YYYY-MM-DD 문자열 저장

    // 오늘 날짜를 YYYY-MM-DD 형식으로 반환 (min 속성에 사용)
    const getToday = () => {
        const date = new Date();
        return date.toISOString().split('T')[0];
    };

    const handleNext = () => {
        if (!goingDate || !comingDate) {
            alert("가는 날과 오는 날을 모두 선택해주세요.");
            return;
        }
        
        // 문자열 비교 (YYYY-MM-DD 형식)
        if (goingDate >= comingDate) {
            alert("오는 날은 가는 날보다 늦어야 합니다.");
            return;
        }
        
        // Option 4를 건너뛰고 Option 6으로 이동하는 라우팅 유지
        navigate('/option6', { 
            state: { 
                goingDate: goingDate, 
                comingDate: comingDate
            } 
        });
    };

    return (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
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

            <div style={datePickerContainerStyle}>
                
                {/* 가는 날 선택 (HTML input[type=date] 사용) */}
                <div>
                    <h3 style={{ marginBottom: '20px', color: goingDate ? '#1B2C4F' : '#333' }}>
                        📅 가는 날 (체크인)
                    </h3>
                    <input 
                        type="date"
                        value={goingDate}
                        onChange={(e) => setGoingDate(e.target.value)}
                        min={getToday()} // 오늘 날짜 이후로만 선택 가능
                        style={inputStyle}
                    />
                    <p style={{ marginTop: '10px', fontSize: '0.9em' }}>
                        {goingDate ? `선택된 날짜: ${goingDate}` : '날짜를 선택하세요.'}
                    </p>
                </div>
                
                {/* 오는 날 선택 (HTML input[type=date] 사용) */}
                <div>
                    <h3 style={{ marginBottom: '20px', color: comingDate ? '#1B2C4F' : '#333' }}>
                        🗓️ 오는 날 (체크아웃)
                    </h3>
                    <input 
                        type="date"
                        value={comingDate}
                        onChange={(e) => setComingDate(e.target.value)}
                        min={goingDate || getToday()} // 가는 날 이후 또는 오늘 이후
                        disabled={!goingDate} // 가는 날이 선택되어야 오는 날 선택 가능
                        style={inputStyle}
                    />
                    <p style={{ marginTop: '10px', fontSize: '0.9em' }}>
                        {comingDate ? `선택된 날짜: ${comingDate}` : '날짜를 선택하세요.'}
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
