// src/pages/MoneyPage.jsx (최종 - 디자인 복구 및 캘린더 기능 통합)

import React, { useState } from 'react';
import Header from '../components-ui/Header'; 
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faHome, faCar, faShoppingCart, faCamera, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

// 항목 정의 및 아이콘 매핑
const CATEGORIES = [
    { name: '식비', icon: faUtensils, color: '#4CAF50' },
    { name: '숙박', icon: faHome, color: '#2196F3' },
    { name: '교통', icon: faCar, color: '#FF9800' },
    { name: '쇼핑', icon: faShoppingCart, color: '#E91E63' },
    { name: '관광', icon: faCamera, color: '#673AB7' },
    { name: '기타', icon: faEllipsisH, color: '#607D8B' },
];

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '50px auto',
        padding: '0 20px',
        display: 'flex',
        gap: '30px',
        // 헤더 높이 100px 복구 가정
        minHeight: 'calc(100vh - 100px)', 
    },
    leftPanel: {
        flex: 2,
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    rightPanel: {
        flex: 1,
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        border: '1px solid #1B2C4F' // 테이블 외곽선 추가 (디자인 강조)
    },
    th: {
        backgroundColor: '#1B2C4F',
        color: 'white',
        padding: '12px',
        textAlign: 'left',
        border: '1px solid #1B2C4F',
    },
    td: {
        border: '1px solid #eee',
        padding: '12px',
        textAlign: 'left',
    },
    inputGroup: {
        marginBottom: '20px',
        marginTop: '20px',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        marginBottom: '10px',
        textAlign: 'right', 
    },
    // 👇 항목 버튼 3x2 그리드 스타일 (요청 반영) 👇
    categoryGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        marginTop: '20px',
    },
    categoryButton: {
        padding: '10px 5px',
        border: '1px solid #ddd',
        borderRadius: '6px',
        backgroundColor: '#f9f9f9',
        cursor: 'pointer',
        fontSize: '0.9em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70px',
        transition: 'background-color 0.2s',
    },
    // 캘린더 컨테이너 스타일
    calendarContainer: {
        display: 'inline-block', 
        border: '1px solid #ddd', 
        padding: '10px', 
        borderRadius: '8px', 
        marginBottom: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    }
};

function MoneyPage() {
    const [expenses, setExpenses] = useState([]); 
    const [selectedDate, setSelectedDate] = useState(new Date()); 
    
    const [currentExpense, setCurrentExpense] = useState({
        id: Date.now(),
        category: null,
        description: '',
        amount: '',
        memo: '',
    });

    // 총 지출액 계산
    const totalAmount = expenses.reduce((sum, item) => sum + (parseInt(item.amount.replace(/,/g, '')) || 0), 0); 

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleCategorySelect = (category) => {
        setCurrentExpense({
            ...currentExpense,
            category: category,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentExpense({
            ...currentExpense,
            [name]: value,
        });
    };
    
    const handleSave = () => {
        if (!currentExpense.description || !currentExpense.amount || !currentExpense.category) {
            alert("지출 내역, 금액, 항목을 모두 입력/선택해주세요.");
            return;
        }

        const newExpense = {
            ...currentExpense,
            date: selectedDate.toISOString().split('T')[0], 
            amount: parseInt(currentExpense.amount).toLocaleString(),
            categoryName: currentExpense.category.name,
            id: Date.now(),
        };

        setExpenses([...expenses, newExpense]);
        
        // 입력 필드 초기화
        setCurrentExpense({
            id: Date.now(),
            category: null,
            description: '',
            amount: '',
            memo: '',
        });
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
            <Header showMenuButton={true} /> 
            
            <div style={styles.container}>
                {/* 1. 왼쪽 패널: 지출 내역 테이블 */}
                <div style={styles.leftPanel}>
                    <h1 style={{ fontSize: '2em', color: '#1B2C4F', marginBottom: '20px', textAlign: 'left' }}>지출 내역</h1>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>항목</th>
                                <th style={styles.th}>지출 날짜</th>
                                <th style={styles.th}>지출 내역</th>
                                <th style={styles.th}>지출 금액 (원)</th>
                                <th style={styles.th}>비고</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((item) => (
                                <tr key={item.id}>
                                    <td style={styles.td}>{item.categoryName}</td>
                                    <td style={styles.td}>{item.date}</td>
                                    <td style={styles.td}>{item.description}</td>
                                    <td style={styles.td}>{item.amount}</td>
                                    <td style={styles.td}>{item.memo}</td>
                                </tr>
                            ))}
                            {/* 테이블 내용이 비어있을 때의 플레이스홀더 */}
                            {expenses.length === 0 && (
                                <tr>
                                    <td style={{...styles.td, color: '#aaa'}}>항목</td>
                                    <td style={{...styles.td, color: '#aaa'}}>입력 날짜</td>
                                    <td style={{...styles.td, color: '#aaa'}}>예: KTX 입금액</td>
                                    <td style={{...styles.td, color: '#aaa'}}>금액</td>
                                    <td style={{...styles.td, color: '#aaa'}}>비고</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 2. 오른쪽 패널: 입력 및 캘린더 */}
                <div style={styles.rightPanel}>
                    
                    {/* 캘린더 통합 영역 */}
                    <div style={styles.calendarContainer}>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            inline 
                            dateFormat="yyyy년 MM월 dd일"
                        />
                    </div>

                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.5em', color: '#1B2C4F' }}>
                        총 지출액: {totalAmount.toLocaleString()}원
                    </h3>

                    <div style={styles.inputGroup}>
                        {/* 지출 내역 입력 필드 */}
                        <input
                            type="text"
                            name="description"
                            placeholder="지출 내역 (예: 점심 식사)"
                            value={currentExpense.description}
                            onChange={handleInputChange}
                            style={{...styles.input, textAlign: 'left'}}
                        />
                        {/* 지출 금액 입력 필드 */}
                        <input
                            type="number"
                            name="amount"
                            placeholder="금액 (원)"
                            value={currentExpense.amount}
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                         {/* 비고 입력 필드 */}
                         <input
                            type="text"
                            name="memo"
                            placeholder="비고"
                            value={currentExpense.memo}
                            onChange={handleInputChange}
                            style={{...styles.input, textAlign: 'left', marginBottom: '0'}}
                        />
                    </div>
                    
                    <h4 style={{ margin: '20px 0 10px 0', color: '#333' }}>항목 선택: {currentExpense.category?.name || '선택 안 됨'}</h4>
                    
                    {/* 항목 버튼 3x2 그리드 */}
                    <div style={styles.categoryGrid}>
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => handleCategorySelect(cat)}
                                style={{
                                    ...styles.categoryButton,
                                    border: currentExpense.category?.name === cat.name ? `2px solid ${cat.color}` : '1px solid #ddd',
                                    backgroundColor: currentExpense.category?.name === cat.name ? '#e8f5e9' : '#f9f9f9',
                                    color: cat.color,
                                }}
                            >
                                <FontAwesomeIcon icon={cat.icon} style={{ fontSize: '1.5em', marginBottom: '5px' }} />
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleSave}
                        style={{
                            marginTop: '30px',
                            padding: '12px 0',
                            width: '100%',
                            backgroundColor: '#1B2C4F',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '1.1em',
                            fontWeight: 'bold',
                        }}
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MoneyPage;
