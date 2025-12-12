// src/pages/Option2Page.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OptionHeader from '../components-ui/OptionHeader';

const Option2Page = () => {
    const navigate = useNavigate();
    const [selectedStyles, setSelectedStyles] = useState([]);

    const styles = [
        "관광없는 여행은 시체😨", 
        "SNS 사진 올려야해!📸", 
        "여행의 본체는 쇼핑이지🛍️", 
        "1일 5끼 가즈아 먹방여행🍴", 
        "휴식이 필요해...😌", 
        "액티비티는 꼭 해야돼!!🤸"
    ];

    const handleStyleClick = (style) => {
        let newStyles;
        if (selectedStyles.includes(style)) {
            newStyles = selectedStyles.filter(s => s !== style);
        } else if (selectedStyles.length < 3) { 
            newStyles = [...selectedStyles, style];
        } else {
            alert("최대 3개까지 선택할 수 있습니다.");
            return;
        }
        setSelectedStyles(newStyles);
    };

    const handleNext = () => {
        if (selectedStyles.length === 0) {
            alert("여행 스타일을 1개 이상 선택해주세요.");
            return;
        }
        navigate('/option3', { state: { styles: selectedStyles } });
    };

    const isButtonSelected = (style) => selectedStyles.includes(style);

    const getButtonStyle = (style) => ({
        padding: '15px 30px',
        margin: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        cursor: 'pointer',
        fontSize: '1.1em',
        width: '40%', 
        backgroundColor: isButtonSelected(style) ? '#32CD32' : '#ccc', 
        color: isButtonSelected(style) ? 'white' : '#333',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
        textAlign: 'center'
    });

    return (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
            <OptionHeader />
            
            <h2 style={{ fontSize: '1.8em', margin: '50px 0 30px 0' }}>
                Q. 어떤 스타일을 원하나요? (최대 3개)
            </h2>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '800px', margin: '0 auto' }}>
                {styles.map(style => (
                    <button
                        key={style}
                        style={getButtonStyle(style)}
                        onClick={() => handleStyleClick(style)}
                    >
                        {style}
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

export default Option2Page;
