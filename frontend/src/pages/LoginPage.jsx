// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components-ui/Header'; 

const styles = {
    container: {
        maxWidth: '400px',
        margin: '100px auto', 
        textAlign: 'center',
        padding: '20px',
    },
    input: {
        width: '100%',
        padding: '12px 15px',
        margin: '8px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    buttonPrimary: {
        width: '100%',
        padding: '12px 15px',
        backgroundColor: '#333', 
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '20px',
        fontSize: '1em',
        fontWeight: 'bold',
    },
    linkButton: {
        color: '#666',
        textDecoration: 'none', 
        cursor: 'pointer',
        fontSize: '0.9em',
    },
    forgotPassword: {
        fontSize: '0.9em',
        color: '#666',
        cursor: 'pointer',
        textAlign: 'left'
    }
};

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        const storedUser = JSON.parse(localStorage.getItem('user'));
        
        if (storedUser && storedUser.email === email && storedUser.password === password) {
            alert('로그인 성공! AI 추천 페이지로 이동합니다.');
            navigate('/loginsuccess'); // 최종 확인: /loginsuccess로 이동
        } else {
            alert('로그인 정보가 일치하지 않거나 회원가입이 필요합니다.');
        }
    };

    return (
        <>
            <Header /> 
            <div style={styles.container}>
                <h1 style={{ fontWeight: 800, marginBottom: '40px', fontSize: '2.5em' }}>LOGIN</h1>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
                    
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input} 
                    />
                    
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input} 
                    />
                    
                    <button type="submit" style={styles.buttonPrimary}>
                        Sign In
                    </button>
                </form>

                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    
                    <span style={styles.forgotPassword}>
                        Forgot password?
                    </span>
                    
                    <span 
                        style={styles.linkButton} 
                        onClick={() => navigate('/signup')} 
                    >
                        Sign up
                    </span>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
