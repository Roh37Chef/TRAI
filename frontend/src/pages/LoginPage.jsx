// src/pages/LoginPage.jsx (최종 - Header 사용 및 경로 수정)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components-ui/Header'; // 👈 경로 수정

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // 실제 로그인 로직 (현재는 임시로 /loginsuccess로 이동)
        if (email && password) {
            navigate('/loginsuccess');
        } else {
            alert('이메일과 비밀번호를 입력해주세요.');
        }
    };
    
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
            <Header /> 
            <div style={{ 
                maxWidth: '400px', 
                margin: '50px auto', 
                padding: '30px', 
                backgroundColor: '#fff', 
                borderRadius: '8px', 
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '2.5em', color: '#1B2C4F', marginBottom: '30px' }}>로그인</h1>
                
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: '10px', width: '100%', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: '10px', width: '100%', marginBottom: '25px', borderRadius: '4px', border: '1px solid #ccc' }}
                />

                <button
                    onClick={handleLogin}
                    style={{
                        padding: '12px 0',
                        width: '100%',
                        backgroundColor: '#1B2C4F',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '1.1em',
                        marginBottom: '10px'
                    }}
                >
                    로그인
                </button>

                <p style={{ fontSize: '0.9em', color: '#666' }}>
                    계정이 없으신가요? <span onClick={() => navigate('/signup')} style={{ color: '#1B2C4F', cursor: 'pointer', fontWeight: 'bold' }}>회원가입</span>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
