import React from 'react';
import { Box, Typography, TextField, Button, Link, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 💡 로그인 성공 시 상태 저장
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/main');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 4 }} onClick={() => navigate('/')} sx={{ cursor: 'pointer', p: 4 }}>
        <Typography variant="h4" component="span" sx={{ fontWeight: '900', color: '#002147' }}>TR</Typography>
        <Typography variant="h4" component="span" sx={{ fontWeight: '900', color: '#00C896' }}>AI</Typography>
      </Box>

      <Container maxWidth="xs" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 6 }}>LOGIN</Typography>
        <TextField fullWidth label="Email" sx={{ mb: 3 }} />
        <TextField fullWidth label="Password" type="password" sx={{ mb: 4 }} />
        
        <Button fullWidth variant="contained" size="large" onClick={handleLogin} sx={{ backgroundColor: '#222', mb: 2 }}>
          Sign In
        </Button>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link href="#">Forgot password?</Link>
          <Link component="button" onClick={() => navigate('/signup')}>Sign up</Link>
        </Box>
      </Container>
    </Box>
  );
}

export default LoginPage;
