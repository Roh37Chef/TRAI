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
      
      {/* 1. 상단 헤더 (로고 영역) */}
      <Box sx={{ padding: '20px 40px' }}>
        <Box 
          sx={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }} 
          onClick={() => navigate('/')} // 클릭 시 홈 화면으로 이동
        >
          {/* TRAI 로고 디자인 적용 */}
          <Typography variant="h4" component="span" sx={{ fontWeight: '900', color: '#002147', fontFamily: 'sans-serif' }}>
            TR
          </Typography>
          <Typography variant="h4" component="span" sx={{ fontWeight: '900', color: '#00C896', fontFamily: 'sans-serif' }}>
            AI
          </Typography>
        </Box>
      </Box>

      {/* 2. 로그인 입력 폼 컨테이너 */}
      <Container maxWidth="xs" sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '10vh'
      }}>
        
        {/* 페이지 제목 */}
        <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 6, color: 'black', fontFamily: 'sans-serif' }}>
          LOGIN
        </Typography>

        {/* 이메일 입력 필드 */}
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
              '& .MuiOutlinedInput-root': { borderRadius: '8px' } // 모서리 둥글게 처리
            }}
          />
        </Box>

        {/* 비밀번호 입력 필드 */}
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

        {/* 로그인 버튼 (클릭 시 메인 페이지로 이동) */}
        <Button 
          fullWidth 
          variant="contained" 
          size="large"
          sx={{ 
            backgroundColor: '#222', // 피그마 디자인의 짙은 색상 적용
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            fontWeight: 'bold',
            textTransform: 'none', 
            fontSize: '1rem',
            marginBottom: 2,
            '&:hover': { backgroundColor: '#444' }
          }}
          onClick={() => navigate('/main')} 
        >
          Sign In
        </Button>

        {/* 하단 링크 영역 (비밀번호 찾기 / 회원가입) */}
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Link href="#" underline="always" sx={{ color: '#333', fontSize: '0.9rem' }}>
            Forgot password?
          </Link>
          <Link 
            component="button" 
            onClick={() => navigate('/signup')}  // 회원가입 페이지 이동
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