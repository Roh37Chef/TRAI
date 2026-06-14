import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Container, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import mainBgImage from '../assets/mainpagebgi.jpg';

function HomePage() {
  const navigate = useNavigate();

  // 드로어(사이드바) 열림/닫힘 상태 관리
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 드로어를 열고 닫는 함수
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  // 메뉴 클릭 시 로그인 페이지로 강제 이동시키는 함수
  const handleMenuClick = (menuName) => {
    if (menuName !== "로그인/회원가입") {
      alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다. 🚗");
    }
    navigate('/login');
  };

  // 드로어 내용 (로그인 전)
  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={() => handleMenuClick("로그인/회원가입")}>
          <ListItemText primary={<Typography fontWeight="bold">로그인/회원가입</Typography>} />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => handleMenuClick("가계부")}>
          <ListItemText primary="가계부" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => handleMenuClick("여행후기")}>
          <ListItemText primary="여행후기" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => handleMenuClick("장애인 지원제도 안내")}>
          <ListItemText primary="장애인 지원제도 안내" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => handleMenuClick("마이페이지")}>
          <ListItemText primary="마이페이지" />
          <ExpandMoreIcon />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      width: '100%',
    }}>
      
      {/* 1. 헤더 */}
      <AppBar 
        position="static" 
        elevation={0} 
        sx={{ 
          backgroundColor: 'white', 
          color: 'black',
          padding: '0 10px' 
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}> 
          {/* 로고 */}
          <Box 
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} 
            onClick={() => navigate('/')}
          >
            <Typography variant="h4" component="span" sx={{ fontWeight: '900', color: '#002147', fontFamily: 'sans-serif' }}>
              TR
            </Typography>
            <Typography variant="h4" component="span" sx={{ fontWeight: '900', color: '#00C896', fontFamily: 'sans-serif' }}>
              AI
            </Typography>
          </Box>

          {/* 우측 상단 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button 
              color="inherit" 
              onClick={() => navigate('/login')} 
              sx={{ fontWeight: 'bold', fontSize: '1rem' }}
            >
              LOGIN
            </Button>
            {/* 햄버거 메뉴 */}
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 사이드바 (Drawer) */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerContent}
      </Drawer>

      {/* 2. 메인 배너 */}
      <Box
        sx={{
          flexGrow: 1,
          backgroundImage: `url(${mainBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, color: 'white', paddingLeft: { xs: 3, md: 5 } }}>
          <Typography variant="h6" sx={{ fontWeight: '500', marginBottom: 2, textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>
            블로그 속 여행 경로, 내 취향을 입다
          </Typography>
          
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}>
            나를 위한 여행, TRAI
          </Typography>

        </Container>
      </Box>

    </Box>
  );
}

export default HomePage;