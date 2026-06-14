import React from 'react';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();

  // 입력창 스타일 (반복되니까 변수로 빼둠)
  const inputStyles = {
    backgroundColor: '#fff',
    '& .MuiOutlinedInput-root': { borderRadius: '8px' }
  };

  // 라벨 스타일
  const labelStyles = {
    fontWeight: 'bold', 
    marginBottom: 1, 
    color: '#333',
    alignSelf: 'flex-start' // 라벨은 왼쪽 정렬
  };

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
          onClick={() => navigate('/')} 
        >
          <Typography variant="h4" component="span" sx={{ fontWeight: '900', color: '#002147', fontFamily: 'sans-serif' }}>
            TR
          </Typography>
          <Typography variant="h4" component="span" sx={{ fontWeight: '900', color: '#00C896', fontFamily: 'sans-serif' }}>
            AI
          </Typography>
        </Box>
      </Box>

      {/* 2. 회원가입 폼 컨테이너 */}
      <Container maxWidth="xs" sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        paddingBottom: '10vh'
      }}>
        
        {/* SIGN UP 제목 */}
        <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 5, color: 'black', fontFamily: 'sans-serif' }}>
          SIGN UP
        </Typography>

        {/* --- 입력 필드 시작 --- */}

        {/* 1. Name */}
        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography variant="subtitle2" sx={labelStyles}>Name</Typography>
          <TextField fullWidth placeholder="Value" variant="outlined" sx={inputStyles} />
        </Box>

        {/* 2. Surname */}
        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography variant="subtitle2" sx={labelStyles}>Surname</Typography>
          <TextField fullWidth placeholder="Value" variant="outlined" sx={inputStyles} />
        </Box>

        {/* 3. Email + Verify Button */}
        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography variant="subtitle2" sx={labelStyles}>Email</Typography>
          <TextField fullWidth placeholder="Value" variant="outlined" sx={inputStyles} />
          {/* Verify 버튼 */}
          <Button 
            fullWidth 
            variant="contained" 
            sx={{ 
              marginTop: 1,
              backgroundColor: '#222', 
              color: 'white',
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#444' }
            }}
          >
            Verify
          </Button>
        </Box>

        {/* 4. Password */}
        <Box sx={{ width: '100%', marginBottom: 4 }}>
          <Typography variant="subtitle2" sx={labelStyles}>Password</Typography>
          <TextField fullWidth type="password" placeholder="Value" variant="outlined" sx={inputStyles} />
        </Box>

        {/* --- 하단 버튼 --- */}

        {/* Sign Up 버튼 */}
        <Button 
          fullWidth 
          variant="contained" 
          size="large"
          sx={{ 
            backgroundColor: '#222', 
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: '1rem',
            '&:hover': { backgroundColor: '#444' }
          }}
          onClick={() => {
            alert("회원가입이 완료되었습니다! (임시)");
            navigate('/login'); // 가입 후 로그인 페이지로 이동
          }}
        >
          Sign Up
        </Button>

      </Container>
    </Box>
  );
}

export default SignupPage;