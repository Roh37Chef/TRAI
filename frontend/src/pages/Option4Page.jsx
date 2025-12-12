// src/pages/Option4Page.jsx (수정 완료)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OptionHeader from '../components-ui/OptionHeader';

const Option4Page = () => {
    const navigate = useNavigate();
    const [useCar, setUseCar] = useState(null);

    const options = ["YES", "NO"];

    const handleNext = () => {
        if (useCar === null) {
            alert("차량 이용 여부를 선택해주세요.");
            return;
        }
        // 👇 경로를 /option6로 변경합니다. 👇
        navigate('/option6', { state: { useCar: useCar } });
    };

    const isButtonSelected = (option) => useCar === option;

    const getButtonStyle = (option) => ({
        padding: '20px 80px',
        margin: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        cursor: 'pointer',
        fontSize: '1.5em',
        backgroundColor: isButtonSelected(option) ? '#32CD32' : '#ccc', 
        color: isButtonSelected(option) ? 'white' : '#333',
        fontWeight: 'bold',
        transition: 'background-color 0.3s'
    });

    return (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
            <OptionHeader />
            
            <h2 style={{ fontSize: '1.8em', margin: '80px 0 50px 0' }}>
                Q. 자차 이용 여부를 선택해주세요.
            </h2>
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {options.map(option => (
                    <button
                        key={option}
                        style={getButtonStyle(option)}
                        onClick={() => setUseCar(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <button
                onClick={handleNext}
                style={{
                    marginTop: '80px',
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

export default Option4Page;
