// src/pages/Option6Page.jsx

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LargeLogo from '../assets/logo1.jpg'; 

const Option6Page = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    
    // 💡 변경점 1: 메인 페이지 등에서 넘겨준 URL이 있다면 기본값으로 가져옵니다.
    const initialUrl = location.state?.url || '';

    // 💡 변경점 2: 상태(state)에 blogUrl 칸을 추가했습니다.
    const [inputs, setInputs] = useState({
        destination: '',
        accommodationTime: '',
        departureTime: '',
        accommodationPreference: '',
        blogUrl: initialUrl 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 💡 변경점 3: Submit 버튼을 누를 때, 이전 페이지들의 데이터와 
        // 현재 페이지에서 입력한 데이터(블로그 URL 포함)를 모두 합쳐서 로딩 페이지로 보냅니다.
        navigate('/loading', { 
            state: { 
                ...location.state, 
                ...inputs 
            } 
        }); 
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

                    {/* 💡 추가된 부분: 블로그 URL 입력 (선택) */}
                    <label style={{ display: 'block', textAlign: 'left', fontWeight: 'bold', marginTop: '10px' }}>블로그 URL (선택)</label>
                    <input
                        type="text"
                        name="blogUrl"
                        placeholder="예: https://blog.naver.com/... (선택 사항)"
                        value={inputs.blogUrl}
                        onChange={handleChange}
                        style={inputStyle}
                        // 선택 사항이므로 required 속성은 넣지 않습니다.
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
