// src/pages/MoneyPage.jsx (최종 - 가계부 기능 및 캘린더 통합)

import React, { useState } from 'react';
import Header from '../components-ui/Header'; 
import DatePicker from 'react-datepicker'; // 👈 DatePicker 추가
import 'react-datepicker/dist/react-datepicker.css'; // DatePicker CSS 추가

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
    // ... (기타 스타일 유지)
    container: {
        maxWidth: '1200px',
        margin: '50px auto',
        padding: '0 20px',
        display: 'flex',
        gap: '30px',
        minHeight: 'calc(100vh - 100px)', // Header 높이 100px로 복구 가정
    },
    // ... (leftPanel, rightPanel, table, th, td, inputGroup, input, categoryGrid, categoryButton 유지)
};

function MoneyPage() {
    const [expenses, setExpenses] = useState([]); // 지출 목록 (테이블 데이터)
    const [selectedDate, setSelectedDate] = useState(new Date()); // 👈 캘린더에서 선택된 날짜
    
    const [currentExpense, setCurrentExpense] = useState({
        id: Date.now(),
        category: null,
        description: '',
        amount: '',
        memo: '',
    });

    // 총 지출액 계산
    const totalAmount = expenses.reduce((sum, item) => sum + (parseInt(item.amount.replace(/,/g, '')) || 0), 0); // 포맷팅된 금액 처리

    // 날짜 변경 핸들러
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // 항목 선택 핸들러
    const handleCategorySelect = (category) => {
        setCurrentExpense({
            ...currentExpense,
            category: category,
        });
    };

    // 지출 내역/금액 입력 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentExpense({
            ...currentExpense,
            [name]: value,
        });
    };
    
    // 저장 버튼 핸들러
    const handleSave = () => {
        if (!currentExpense.description || !currentExpense.amount || !currentExpense.category) {
            alert("지출 내역, 금액, 항목을 모두 입력/선택해주세요.");
            return;
        }

        const newExpense = {
            ...currentExpense,
            date: selectedDate.toISOString().split('T')[0], // 👈 선택된 날짜 반영
            amount: parseInt(currentExpense.amount).toLocaleString(), // 금액 포맷팅
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
        // 캘린더 날짜는 유지
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
            {/* Header는 showMenuButton=true로 햄버거 메뉴를 가정합니다. */}
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
                    {/* 👇👇👇 캘린더 통합 영역 👇👇👇 */}
                    <div style={{ display: 'inline-block', border: '1px solid #ddd', padding: '10px', borderRadius: '8px', marginBottom: '30px' }}>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            inline // 캘린더를 항상 보이게 설정
                            dateFormat="yyyy년 MM월 dd일"
                        />
                    </div>
                    {/* 👆👆👆 캘린더 통합 영역 👆👆👆 */}

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
                    
                    {/* 항목 버튼 3x3 그리드 */}
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
