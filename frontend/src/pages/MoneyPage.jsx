// src/pages/MoneyPage.jsx (고객님 UI 요청 반영 최종 버전)

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TraiLogo from '../assets/logo2.jpg'; 

const styles = {
    header: {
        padding: '20px 40px', 
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #eee'
    },
    mainContainer: {
        display: 'flex',
        minHeight: 'calc(100vh - 81px)', // 헤더 높이 제외
        backgroundColor: '#f4f4f4'
    },
    // 왼쪽 테이블 영역
    leftPanel: {
        flex: 2,
        padding: '30px',
        backgroundColor: 'white',
        borderRight: '1px solid #eee'
    },
    // 오른쪽 입력/도구 영역
    rightPanel: {
        flex: 1,
        padding: '30px',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid #ccc',
        marginTop: '20px'
    },
    th: {
        backgroundColor: '#1B2C4F',
        color: 'white',
        padding: '12px 8px',
        textAlign: 'center',
        border: '1px solid #ccc'
    },
    td: {
        padding: '8px',
        border: '1px solid #ccc',
        textAlign: 'center',
        fontSize: '0.95em'
    },
    input: {
        width: '100%',
        padding: '5px',
        border: 'none',
        textAlign: 'center',
        boxSizing: 'border-box'
    },
    categoryIcon: {
        width: '80px',
        height: '80px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        fontSize: '0.9em'
    }
};

const CATEGORIES = [
    { name: '식비', icon: '🍽️' },
    { name: '숙박', icon: '🏠' },
    { name: '교통', icon: '🚗' },
    { name: '쇼핑', icon: '🛒' },
    { name: '관광', icon: '📸' },
    { name: '기타', icon: '•••' }
];

const Header = ({ navigate }) => (
    <header style={styles.header}>
        <img 
            src={TraiLogo}
            alt="TRAI Logo" 
            style={{ height: '40px', cursor: 'pointer' }} 
            onClick={() => navigate('/loginsuccess')} 
        />
        <button 
            onClick={() => navigate('/loginsuccess')}
            style={{ 
                background: 'none', 
                border: '1px solid #333',
                padding: '8px 15px',
                borderRadius: '4px',
                cursor: 'pointer'
            }}
        >
            메뉴 닫기
        </button>
    </header>
);

function MoneyPage() {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]); // 저장된 지출 목록
    const [currentExpense, setCurrentExpense] = useState({ // 현재 입력 중인 지출
        date: '',
        category: '',
        description: '',
        amount: '',
        memo: ''
    });
    const [currentDate, setCurrentDate] = useState(new Date());

    // 총 지출액 계산
    const totalAmount = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

    // 달력 날짜 변경 핸들러
    const handleDateChange = (date) => {
        setCurrentDate(date);
        const formattedDate = date.toISOString().split('T')[0];
        setCurrentExpense(prev => ({ ...prev, date: formattedDate }));
    };

    // 카테고리 버튼 클릭 핸들러
    const handleCategorySelect = (categoryName) => {
        setCurrentExpense(prev => ({ ...prev, category: categoryName }));
    };

    // 저장 버튼 클릭 핸들러 (테이블에 새 행 추가)
    const handleSave = () => {
        const { date, category, description, amount } = currentExpense;
        
        if (!date || !category || !description || !amount) {
            alert('날짜, 항목, 내용, 금액을 모두 입력하거나 선택해주세요.');
            return;
        }

        const newExpenseItem = {
            id: Date.now(),
            ...currentExpense,
        };

        setExpenses(prev => [...prev, newExpenseItem]);
        
        // 입력 필드 초기화
        setCurrentExpense({
            date: '', // 날짜는 달력 선택으로 초기화 안함
            category: '',
            description: '',
            amount: '',
            memo: ''
        });
    };

    // 캘린더 UI (고객님의 이미지와 유사하게 재현)
    const renderCalendar = () => {
        // 간단한 월별 캘린더 UI (실제 라이브러리 UI는 복잡하여 수동 구현)
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startEmptyCells = firstDay;
        
        let days = [];
        for (let i = 0; i < startEmptyCells; i++) days.push(null);
        for (let i = 1; i <= daysInMonth; i++) days.push(i);

        const today = new Date();
        const isSelected = (day) => {
            if (!currentExpense.date) return false;
            const expenseDate = new Date(currentExpense.date);
            return expenseDate.getDate() === day && expenseDate.getMonth() === month && expenseDate.getFullYear() === year;
        };
        
        const renderDay = (day) => {
            if (day === null) return <div style={{ width: '14%', padding: '5px' }}></div>;
            
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            
            return (
                <div 
                    key={day}
                    style={{
                        width: '14%',
                        padding: '5px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        backgroundColor: isSelected(day) ? '#32CD32' : (isToday ? '#eee' : 'transparent'),
                        color: isSelected(day) ? 'white' : 'black',
                        borderRadius: '5px'
                    }}
                    onClick={() => handleDateChange(new Date(year, month, day))}
                >
                    {day}
                </div>
            );
        };

        return (
            <div style={{ width: '100%', marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                {/* 월 네비게이션 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>&lt;</button>
                    <h4 style={{ margin: '0' }}>{year}년 {month + 1}월</h4>
                    <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>&gt;</button>
                </div>
                
                {/* 요일 헤더 */}
                <div style={{ display: 'flex', flexWrap: 'wrap', fontWeight: 'bold' }}>
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                        <div key={day} style={{ width: '14%', textAlign: 'center', padding: '5px', color: (day === 'Su' || day === 'Sa') ? 'red' : 'inherit' }}>{day}</div>
                    ))}
                </div>
                
                {/* 날짜 */}
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {days.map(renderDay)}
                </div>
            </div>
        );
    };


    return (
        <>
            <Header navigate={navigate} />
            <div style={styles.mainContainer}>
                {/* 왼: 지출 내역 테이블 */}
                <div style={styles.leftPanel}>
                    <h2 style={{ color: '#1B2C4F', marginBottom: '20px' }}>지출 내역</h2>
                    
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
                            {/* 현재 입력 행 */}
                            <tr>
                                <td style={styles.td}>
                                    <input 
                                        type="text" 
                                        value={currentExpense.category} 
                                        onChange={(e) => setCurrentExpense(prev => ({...prev, category: e.target.value}))}
                                        style={styles.input} 
                                        placeholder="교통/식비 등"
                                    />
                                </td>
                                <td style={styles.td}>
                                    <input 
                                        type="text" 
                                        value={currentExpense.date} 
                                        style={styles.input}
                                        readOnly
                                        placeholder="달력 선택"
                                    />
                                </td>
                                <td style={styles.td}>
                                    <input 
                                        type="text" 
                                        value={currentExpense.description} 
                                        onChange={(e) => setCurrentExpense(prev => ({...prev, description: e.target.value}))}
                                        style={styles.input} 
                                        placeholder="예: KTX 탑승권"
                                    />
                                </td>
                                <td style={styles.td}>
                                    <input 
                                        type="number" 
                                        value={currentExpense.amount} 
                                        onChange={(e) => setCurrentExpense(prev => ({...prev, amount: e.target.value}))}
                                        style={styles.input} 
                                        placeholder="금액"
                                    />
                                </td>
                                <td style={styles.td}>
                                    <input 
                                        type="text" 
                                        value={currentExpense.memo} 
                                        onChange={(e) => setCurrentExpense(prev => ({...prev, memo: e.target.value}))}
                                        style={styles.input} 
                                        placeholder="메모"
                                    />
                                </td>
                            </tr>

                            {/* 저장된 지출 내역 행 */}
                            {expenses.map(exp => (
                                <tr key={exp.id} style={{ backgroundColor: '#fdfdfd' }}>
                                    <td style={styles.td}>{exp.category}</td>
                                    <td style={styles.td}>{exp.date}</td>
                                    <td style={styles.td}>{exp.description}</td>
                                    <td style={{...styles.td, fontWeight: 'bold', color: 'red'}}>
                                        {Number(exp.amount).toLocaleString()}원
                                    </td>
                                    <td style={styles.td}>{exp.memo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 오른: 입력 및 도구 */}
                <div style={styles.rightPanel}>
                    {/* 달력 영역 */}
                    {renderCalendar()}
                    
                    {/* 총 지출액 */}
                    <div style={{ width: '100%', marginBottom: '30px', padding: '10px', border: '1px solid #ccc', backgroundColor: '#fff', borderRadius: '5px' }}>
                        <h4 style={{ margin: '0 0 5px 0' }}>총 지출액</h4>
                        <p style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#1B2C4F' }}>
                            {totalAmount.toLocaleString()}원
                        </p>
                    </div>

                    {/* 카테고리 아이콘 영역 */}
                    <h4 style={{ color: '#666', marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '5px', width: '100%', textAlign: 'center' }}>
                        항목 선택
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {CATEGORIES.map(cat => (
                            <div 
                                key={cat.name} 
                                style={{
                                    ...styles.categoryIcon,
                                    backgroundColor: currentExpense.category === cat.name ? '#32CD32' : '#fff',
                                    color: currentExpense.category === cat.name ? 'white' : '#333',
                                }}
                                onClick={() => handleCategorySelect(cat.name)}
                            >
                                <span style={{ fontSize: '2em', marginBottom: '5px' }}>{cat.icon}</span>
                                {cat.name}
                            </div>
                        ))}
                    </div>

                    {/* 저장 버튼 */}
                    <button 
                        onClick={handleSave}
                        style={{
                            padding: '12px 30px',
                            backgroundColor: '#1B2C4F',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1.1em',
                            fontWeight: 'bold',
                            marginTop: 'auto',
                            width: '100%'
                        }}
                    >
                        저장
                    </button>
                </div>
            </div>
        </>
    );
}

export default MoneyPage;
