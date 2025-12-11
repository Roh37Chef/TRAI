// src/pages/Option3Page.jsx (react-datepicker 최종 버전)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; // DatePicker의 필수 CSS import

import LargeLogo from '../assets/logo1.jpg'; 

// DatePicker 스타일 오버라이드를 위한 CSS (인라인 스타일)
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
    fontSize: '1em',
    textAlign: 'center',
    cursor: 'pointer',
    width: '200px',
    marginTop: '10px',
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
        
        navigate('/option4', { 
            state: { 
                goingDate: goingDate.toISOString().split('T')[0], 
                comingDate: comingDate.toISOString().split('T')[0]
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
                
                {/* 가는 날 선택 */}
                <div>
                    <h3 style={{ marginBottom: '20px', color: goingDate ? '#32CD32' : '#333' }}>
                        📅 가는 날 (체크인)
                    </h3>
                    <DatePicker 
                        selected={goingDate}
                        onChange={(date) => setGoingDate(date)}
                        selectsStart
                        startDate={goingDate}
                        endDate={comingDate}
                        minDate={new Date()}
                        customInput={<input style={inputStyle} readOnly placeholder="날짜 선택"/>}
                    />
                    <p style={{ marginTop: '10px', fontSize: '0.9em' }}>
                        {goingDate ? `선택된 날짜: ${goingDate.toDateString()}` : '날짜를 선택하세요.'}
                    </p>
                </div>
                
                {/* 오는 날 선택 */}
                <div>
                    <h3 style={{ marginBottom: '20px', color: comingDate ? '#32CD32' : '#333' }}>
                        🗓️ 오는 날 (체크아웃)
                    </h3>
                    <DatePicker 
                        selected={comingDate}
                        onChange={(date) => setComingDate(date)}
                        selectsEnd
                        startDate={goingDate}
                        endDate={comingDate}
                        minDate={goingDate || new Date()} 
                        customInput={<input style={inputStyle} readOnly placeholder="날짜 선택"/>}
                        disabled={!goingDate} // 가는 날이 선택되어야 오는 날 선택 가능
                    />
                    <p style={{ marginTop: '10px', fontSize: '0.9em' }}>
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
