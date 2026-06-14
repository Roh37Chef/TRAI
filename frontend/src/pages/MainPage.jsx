import React, { useState, useEffect } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, IconButton, Box, Container, 
  Drawer, List, ListItem, ListItemText, Divider, Collapse 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalActivityIcon from '@mui/icons-material/LocalActivity'; 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useNavigate } from 'react-router-dom';
import mainBgImage from '../assets/mainpagebgi.jpg';

function MainPage() {
  const navigate = useNavigate();
  const [myTickets, setMyTickets] = useState(25);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMyPageOpen, setIsMyPageOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 로그인 상태 확인
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setIsDrawerOpen(open);
  };

  const handleCreate = () => {
    if (myTickets < 15) {
      alert("티켓이 부족합니다!");
      return;
    }
    if(window.confirm(`티켓 15개를 사용하여 일정을 생성하시겠습니까?`)) {
      setMyTickets(prev => prev - 15);
      navigate('/option1'); 
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" color="inherit" elevation={0} sx={{ backgroundColor: 'white', padding: '0 10px' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <Typography variant="h4" component="span" sx={{ fontWeight: '900', color: '#002147', fontFamily: 'sans-serif' }}>TR</Typography>
            <Typography variant="h4" component="span" sx={{ fontWeight: '900', color: '#00C896', fontFamily: 'sans-serif' }}>AI</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#f5f5f5', padding: '6px 12px', borderRadius: '20px' }}>
              <LocalActivityIcon sx={{ color: '#002147', fontSize: 20, mr: 1 }} />
              <Typography sx={{ fontWeight: 'bold' }}>{myTickets}</Typography>
            </Box>
            <Button onClick={isLoggedIn ? handleLogout : () => navigate('/login')} sx={{ fontWeight: 'bold' }}>
              {isLoggedIn ? 'Logout' : 'Login'}
            </Button>
            <IconButton onClick={toggleDrawer(true)}><MenuIcon /></IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1, backgroundImage: `url(${mainBgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <Box sx={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)' }} />
        <Container sx={{ position: 'relative', zIndex: 1, color: 'white', textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 8 }}>나를 위한 여행, TRAI</Typography>
          <Button variant="contained" onClick={handleCreate} sx={{ backgroundColor: '#1E2B4D', padding: '15px 50px', fontSize: '1.3rem' }}>
            일정 생성 15 <LocalActivityIcon sx={{ ml: 1 }} />
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default MainPage;
