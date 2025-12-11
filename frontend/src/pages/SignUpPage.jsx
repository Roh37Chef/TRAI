// src/pages/SignUpPage.jsx (최종 - Header 사용 및 경로 수정)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components-ui/Header'; // 👈 경로 수정

function SignUpPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = () => {
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        // 실제 회원가입 로직 (현재는 임시로 /login으로 이동)
        if (email && password) {
            alert('회원가입 성공!');
            navigate('/login');
        } else {
            alert('모든 정보를 입력해주세요.');
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
                <h1 style={{ fontSize: '2.5em', color: '#1B2C4F', marginBottom: '30px' }}>회원가입</h1>
                
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
                    style={{ padding: '10px', width: '100%', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ padding: '10px', width: '100%', marginBottom: '25px', borderRadius: '4px', border: '1px solid #ccc' }}
                />

                <button
                    onClick={handleSignUp}
                    style={{
                        padding: '12px 0',
                        width: '100%',
                        backgroundColor: '#32CD32', // 회원가입은 다른 색상
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '1.1em',
                        marginBottom: '10px'
                    }}
                >
                    회원가입
                </button>

                <p style={{ fontSize: '0.9em', color: '#666' }}>
                    이미 계정이 있으신가요? <span onClick={() => navigate('/login')} style={{ color: '#1B2C4F', cursor: 'pointer', fontWeight: 'bold' }}>로그인</span>
                </p>
            </div>
        </div>
    );
}

export default SignUpPage;
