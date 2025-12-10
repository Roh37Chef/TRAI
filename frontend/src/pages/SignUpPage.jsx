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
};

function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        localStorage.setItem('user', JSON.stringify({ email, password }));
        
        alert('회원가입 성공! 로그인 페이지로 이동합니다.');
        navigate('/login'); 
    };

    return (
        <>
            <Header />
            <div style={styles.container}>
                <h1 style={{ fontWeight: 800, marginBottom: '40px', fontSize: '2.5em' }}>SIGN UP</h1>

                <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column' }}>
                    
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input} 
                        required
                    />
                    
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input} 
                        required
                    />

                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={styles.input} 
                        required
                    />
                    
                    <button type="submit" style={styles.buttonPrimary}>
                        Sign Up
                    </button>
                </form>
                
                <div style={{ marginTop: '20px', textAlign: 'right' }}>
                    <span 
                        style={styles.linkButton} 
                        onClick={() => navigate('/login')}
                    >
                        Sign In
                    </span>
                </div>
            </div>
        </>
    );
}

export default SignUpPage;
