import { useState } from 'react';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); // 로그인 <-> 회원가입 전환용

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h2>{isLogin ? '로그인' : '회원가입'}</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" placeholder="아이디" style={{ padding: '10px' }} />
        <input type="password" placeholder="비밀번호" style={{ padding: '10px' }} />
        {!isLogin && <input type="text" placeholder="이름 (회원가입용)" style={{ padding: '10px' }} />}
        
        <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
          {isLogin ? '로그인하기' : '가입하기'}
        </button>
      </form>
      
      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', color: 'blue', marginTop: '10px' }}>
        {isLogin ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
      </p>
    </div>
  );
}

export default LoginPage;