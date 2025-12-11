// src/pages/Option3Page.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; // 달력 스타일 불러오기

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
    border: '1px solid #1B2C4F', // 테두리 색상 진하게
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '1em',
    textAlign: 'left', // 텍스트 왼쪽 정렬 (스크린샷 참고)
    cursor: 'pointer',
    width: '220px', // 너비 살짝 조정
    marginTop: '10px',
    height: '45px', // 높이 조정
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
                        customInput={<input style={{...inputStyle, backgroundColor: '#f9f9f9', border: '1px solid #ccc'}} />} // 오는 날은 약간 다르게 (스크린샷 느낌)
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
