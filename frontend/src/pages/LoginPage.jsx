import React from 'react';
import { Box, Typography, TextField, Button, Link, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: 'white', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      
      {/* 1. 헤더 (로고 영역) */}
      <Box sx={{ padding: '20px 40px' }}>
        <Box 
          sx={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }} 
          onClick={() => navigate('/')} // 로고 누르면 홈으로
        >
          <Typography variant="h4" component="span" sx={{ fontWeight: '900', color: '#002147', fontFamily: 'sans-serif' }}>
            TR
          </Typography>
          <Typography variant="h4" component="span" sx={{ fontWeight: '900', color: '#00C896', fontFamily: 'sans-serif' }}>
            AI
          </Typography>
        </Box>
      </Box>

      {/* 2. 로그인 폼 컨테이너 (중앙 정렬) */}
      <Container maxWidth="xs" sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '10vh'
      }}>
        
        {/* LOGIN 제목 */}
        <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 6, color: 'black', fontFamily: 'sans-serif' }}>
          LOGIN
        </Typography>

        {/* 이메일 입력 */}
        <Box sx={{ width: '100%', marginBottom: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', marginBottom: 1, color: '#333' }}>
            Email
          </Typography>
          <TextField 
            fullWidth 
            placeholder="Value" 
            variant="outlined" 
            sx={{ 
              backgroundColor: '#fff',
              '& .MuiOutlinedInput-root': { borderRadius: '8px' } // 둥근 모서리
            }}
          />
        </Box>

        {/* 비밀번호 입력 */}
        <Box sx={{ width: '100%', marginBottom: 4 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', marginBottom: 1, color: '#333' }}>
            Password
          </Typography>
          <TextField 
            fullWidth 
            placeholder="Value" 
            type="password" 
            variant="outlined" 
            sx={{ 
              backgroundColor: '#fff',
              '& .MuiOutlinedInput-root': { borderRadius: '8px' }
            }}
          />
        </Box>

        {/* Sign In 버튼 */}
        <Button 
          fullWidth 
          variant="contained" 
          size="large"
          sx={{ 
            backgroundColor: '#222', // 피그마의 짙은 회색/검정
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            fontWeight: 'bold',
            textTransform: 'none', // 대문자 강제 변환 방지
            fontSize: '1rem',
            marginBottom: 2,
            '&:hover': { backgroundColor: '#444' }
          }}
          onClick={() => navigate('/main')} 
        >
          Sign In
        </Button>

        {/* 하단 링크 (비밀번호 찾기 / 회원가입) */}
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Link href="#" underline="always" sx={{ color: '#333', fontSize: '0.9rem' }}>
            Forgot password?
          </Link>
          <Link 
            component="button" 
            onClick={() => navigate('/signup')}  // 회원가입 페이지로 이동
            underline="always" 
            sx={{ color: '#333', fontSize: '0.9rem', fontWeight: 'bold' }}
          >
            Sign up
          </Link>
        </Box>

      </Container>
    </Box>
  );
}

export default LoginPage;