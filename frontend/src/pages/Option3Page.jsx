// src/pages/Option3Page.jsx (최종 - 디자인 달력 UI 유지 및 실행 가능 버전)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 

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
    border: '1px solid #1B2C4F', 
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '1em',
    textAlign: 'left',
    cursor: 'pointer',
    width: '220px',
    marginTop: '10px',
    height: '45px',
    paddingLeft: '15px'
};

const Option3Page = () => {
    const navigate = useNavigate();
    const [goingDate, setGoingDate] = useState(null); 
    const [comingDate, setComingDate] = useState(null); 

    const handleNext = () => {
        if (!goingDate || !comingDate) {
            alert("가는 날과 오는 날을 모두 선택해주세요.");
            return;
        }
        if (goingDate >= comingDate) {
            alert("오는 날은 가는 날보다 늦어야 합니다.");
            return;
        }
        
        // Option 4를 건너뛰고 Option 6으로 이동하는 라우팅 유지
        navigate('/option6', { 
            state: { 
                goingDate: goingDate.toISOString().split('T')[0], 
                comingDate: comingDate.toISOString().split('T')[0]
            } 
        });
    };

    return (
        <div style={{ textAlign: 'center', paddingTop: '80px' }}>
             {/* 로고 영역 */}
             <div style={{ marginBottom: '20px' }}>
                {/* LargeLogo는 이미 큰 로고이므로 놔둡니다. */}
                <img 
                    src={LargeLogo} 
                    alt="TRAI Logo" 
                    style={{ height: '40px', display: 'block', margin: '0 auto' }} 
                />
            </div>

            <p style={{ fontSize: '0.9em', color: '#32CD32', fontWeight: 'bold', marginBottom: '40px', letterSpacing: '1px' }}>
                AI-PLANNED, PERSONALIZED ADVENTURES
            </p>
            
            <h2 style={{ fontSize: '2em', fontWeight: 'bold', margin: '0 0 50px 0', color: 'black' }}>
                Q. 원하는 날짜를 선택해주세요.
            </h2>

            <div style={datePickerContainerStyle}>
                <div>
                    <h3 style={{ marginBottom: '15px', color: 'black', fontWeight: 'bold', fontSize: '1.2em', textAlign: 'left' }}>
                        📅 가는 날 (체크인)
                    </h3>
                    <DatePicker 
                        selected={goingDate}
                        onChange={(date) => setGoingDate(date)}
                        selectsStart
                        startDate={goingDate}
                        endDate={comingDate}
                        minDate={new Date()}
                        placeholderText="가는 날짜 선택"
                        customInput={<input style={inputStyle} />}
                    />
                </div>
                
                <div>
                    <h3 style={{ marginBottom: '15px', color: 'black', fontWeight: 'bold', fontSize: '1.2em', textAlign: 'left' }}>
                        🗓️ 오는 날 (체크아웃)
                    </h3>
                    <DatePicker 
                        selected={comingDate}
                        onChange={(date) => setComingDate(date)}
                        selectsEnd
                        startDate={goingDate}
                        endDate={comingDate}
                        minDate={goingDate || new Date()} 
                        placeholderText="오는 날짜 선택"
                        customInput={<input style={{...inputStyle, backgroundColor: '#f9f9f9', border: '1px solid #ccc'}} />} 
                        disabled={!goingDate} 
                    />
                </div>
            </div>

            <button
                onClick={handleNext}
                style={{
                    marginTop: '60px',
                    padding: '15px 50px',
                    backgroundColor: '#1B2C4F',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1.1em',
                    fontWeight: 'bold'
                }}
            >
                다음
            </button>
        </div>
    );
};

export default Option3Page;
