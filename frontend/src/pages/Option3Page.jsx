// src/pages/Option3Page.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar'; 
import '../styles/Calendar.css'; // react-calendar 스타일 파일 import

import LargeLogo from '../assets/logo1.jpg'; 

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
        
        // Option 4 페이지로 이동
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

            <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', maxWidth: '1000px', margin: '0 auto' }}>
                
                {/* 가는 날 선택 달력 */}
                <div>
                    <h3 style={{ marginBottom: '20px', color: goingDate ? '#32CD32' : '#333' }}>
                        📅 가는 날 (체크인)
                    </h3>
                    <Calendar 
                        onChange={setGoingDate} 
                        value={goingDate} 
                        minDate={new Date()} 
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
                        minDate={goingDate || new Date()} 
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
