// src/pages/Option1Page.jsx (최종 - 도시 버튼 4x2 그리드 적용)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OptionHeader from '../components-ui/OptionHeader';

const Option1Page = () => {
    const navigate = useNavigate();
    const [selectedCity, setSelectedCity] = useState(null);

    const cities = ["서울", "부산", "인천", "강릉", "광주", "대전", "울산", "제주"];

    const handleNext = () => {
        if (!selectedCity) {
            alert("도시를 선택해주세요.");
            return;
        }
        navigate('/option2', { state: { city: selectedCity } });
    };

    const isButtonSelected = (city) => selectedCity === city;

    const getButtonStyle = (city) => ({
        padding: '15px 30px',
        margin: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        cursor: 'pointer',
        fontSize: '1.1em',
        backgroundColor: isButtonSelected(city) ? '#32CD32' : '#ccc', 
        color: isButtonSelected(city) ? 'white' : '#333',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
        // 👇 버튼 크기를 일정하게 설정하여 그리드에 맞춤 (100px)
        width: '100px', 
        textAlign: 'center',
    });

    return (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
            {/* OptionHeader는 Option 페이지에서 큰 로고와 작은 문구를 표시합니다. */}
            <OptionHeader /> 
            
            <h2 style={{ fontSize: '1.8em', margin: '50px 0 30px 0' }}>
                Q. 떠나고 싶은 도시를 선택해주세요.
            </h2>
            
            {/* 👇 도시 선택 버튼 4x2 그리드 레이아웃 설정 👇 */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)', // 한 줄에 4개
                gap: '10px', // 그리드 간격
                maxWidth: '500px', // 전체 너비를 좁혀서 중앙에 배치
                margin: '0 auto' 
            }}>
                {cities.map(city => (
                    <button
                        key={city}
                        style={getButtonStyle(city)}
                        onClick={() => setSelectedCity(city)}
                    >
                        {city}
                    </button>
                ))}
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

export default Option1Page;
