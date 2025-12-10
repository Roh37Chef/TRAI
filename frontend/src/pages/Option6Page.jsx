// src/pages/Option6Page.jsx

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LargeLogo from '../assets/logo1.jpg'; 

const Option6Page = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    
    const [inputs, setInputs] = useState({
        destination: '',
        accommodationTime: '',
        departureTime: '',
        accommodationPreference: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 여기에 최종 데이터 전송 로직 구현 (생략)
        
        navigate('/loading'); // <-- LoadingPage로 이동하도록 수정
    };

    const inputStyle = {
        width: '100%',
        padding: '15px 20px',
        margin: '15px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
        fontSize: '1em',
    };

    const formContainerStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '30px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    };

    return (
        <div style={{ textAlign: 'center', paddingTop: '50px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <img 
                src={LargeLogo} 
                alt="TRAI Logo" 
                style={{ height: '100px', margin: '0 auto 20px auto', display: 'block' }} 
            />
            <p style={{ fontSize: '0.9em', color: '#32CD32', fontWeight: 'bold', marginBottom: '30px' }}>
                AI-PLANNED, PERSONALIZED ADVENTURES
            </p>

            <div style={formContainerStyle}>
                <h2 style={{ fontSize: '2em', margin: '0 0 10px 0' }}>세부 정보 입력</h2>
                <p style={{ color: '#666', marginBottom: '30px' }}>당신의 일정을 그 누구보다 세세하게 만들겁니다</p>
                
                <form onSubmit={handleSubmit}>
                    <label style={{ display: 'block', textAlign: 'left', fontWeight: 'bold', marginTop: '10px' }}>출발 장소</label>
                    <input
                        type="text"
                        name="destination"
                        placeholder="출발 장소"
                        value={inputs.destination}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                    <label style={{ display: 'block', textAlign: 'left', fontWeight: 'bold', marginTop: '10px' }}>숙소 출발 예상 시간</label>
                    <input
                        type="text"
                        name="accommodationTime"
                        placeholder="숙소 출발 예상 시간 (예: 10:00 AM)"
                        value={inputs.accommodationTime}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                    <label style={{ display: 'block', textAlign: 'left', fontWeight: 'bold', marginTop: '10px' }}>출발 장소 도착 예상 시간</label>
                    <input
                        type="text"
                        name="departureTime"
                        placeholder="출발 장소 도착 예상 시간 (예: 06:00 PM)"
                        value={inputs.departureTime}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                    <label style={{ display: 'block', textAlign: 'left', fontWeight: 'bold', marginTop: '10px' }}>원하는 숙소 정보</label>
                    <input
                        type="text"
                        name="accommodationPreference"
                        placeholder="원하는 숙소 정보 (예: 깨끗하고 역과 가까운 호텔)"
                        value={inputs.accommodationPreference}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '15px 0',
                            backgroundColor: '#1B2C4F',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1.2em',
                            marginTop: '20px'
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Option6Page;
