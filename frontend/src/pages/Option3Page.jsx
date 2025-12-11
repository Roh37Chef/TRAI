// src/pages/Option3Page.jsx (Datepicker 사용 코드)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; 
import LargeLogo from '../assets/logo1.jpg'; 
import 'react-datepicker/dist/react-datepicker.css'; 
// import Calendar from 'react-calendar' 흔적이 남아있지 않도록 확인!

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

    const dateInputStyle = {
        padding: '10px', 
        fontSize: '1em', 
        border: '1px solid #ccc', 
        borderRadius: '4px',
        width: '200px',
        cursor: 'pointer'
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
                
                {/* 가는 날 선택 */}
                <div style={{ textAlign: 'left' }}>
                    <h3 style={{ marginBottom: '20px' }}>
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
                        customInput={<input style={dateInputStyle} />}
                    />
                </div>
                
                {/* 오는 날 선택 */}
                <div style={{ textAlign: 'left' }}>
                    <h3 style={{ marginBottom: '20px' }}>
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
                        customInput={<input style={dateInputStyle} />}
                        disabled={!goingDate}
                    />
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
