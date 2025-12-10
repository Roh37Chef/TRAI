import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OptionHeader from '../components-ui/OptionHeader';

const Option5Page = () => {
    const navigate = useNavigate();
    const [isVulnerable, setIsVulnerable] = useState(null);

    const options = ["예", "아니요"];

    const handleNext = () => {
        if (isVulnerable === null) {
            alert("사회적 약자 여부를 선택해주세요.");
            return;
        }
        // 사회적 약자 여부를 boolean으로 변환하여 전달
        const value = isVulnerable === "예"; 
        navigate('/option6', { state: { isVulnerable: value } });
    };

    const isButtonSelected = (option) => isVulnerable === option;

    const getButtonStyle = (option) => ({
        padding: '20px 80px',
        margin: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        cursor: 'pointer',
        fontSize: '1.5em',
        backgroundColor: isButtonSelected(option) ? '#32CD32' : '#ccc', // 초록색/회색
        color: isButtonSelected(option) ? 'white' : '#333',
        fontWeight: 'bold',
        transition: 'background-color 0.3s'
    });

    return (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
            <OptionHeader />
            
            <h2 style={{ fontSize: '1.8em', margin: '80px 0 50px 0' }}>
                Q. 사회적 약자이신가요?
            </h2>
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {options.map(option => (
                    <button
                        key={option}
                        style={getButtonStyle(option)}
                        onClick={() => setIsVulnerable(option)}
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

export default Option5Page;
