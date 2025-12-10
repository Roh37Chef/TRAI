// src/pages/Option1Page.jsx

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
        transition: 'background-color 0.3s'
    });

    return (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
            <OptionHeader />
            
            <h2 style={{ fontSize: '1.8em', margin: '50px 0 30px 0' }}>
                Q. 떠나고 싶은 도시를 선택해주세요.
            </h2>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '600px', margin: '0 auto' }}>
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
