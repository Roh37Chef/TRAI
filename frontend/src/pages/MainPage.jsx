// src/pages/MainPage.jsx (최종 - 사이드바 메뉴 라우팅 연결 완료)

import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, IconButton, Box, Container, InputBase, Paper, 
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
  const [url, setUrl] = useState(""); 
  const [myTickets, setMyTickets] = useState(25);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMyPageOpen, setIsMyPageOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const handleMyPageClick = (e) => {
    e.stopPropagation(); 
    setIsMyPageOpen(!isMyPageOpen);
  };

  // ✅ 일정 생성 핸들러 (옵션1 페이지로 정상 연결)
  const handleCreate = () => {
    if (myTickets < 15) {
      alert("티켓이 부족합니다!");
      return;
    }
    if (!url) {
      alert("URL을 입력해주세요!");
      return;
    }
    if(window.confirm(`티켓 15개를 사용하여 일정을 생성하시겠습니까?\n(남은 티켓: ${myTickets}개)`)) {
      setMyTickets(prev => prev - 15);
      navigate('/option1'); // 알림창 대신 페이지 이동
    }
  };

  // ✅ 사이드바(드로어) 메뉴 내용 (모든 alert 제거 및 라우팅 연결)
  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)} 
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={() => { alert("로그아웃 되었습니다."); navigate('/'); }}>
          <ListItemText primary={<Typography fontWeight="bold">로그인/회원가입</Typography>} />
        </ListItem>
        <Divider />

        <ListItem button onClick={() => navigate('/moneypage')}>
          <ListItemText primary="가계부" />
        </ListItem>
        <Divider />

        <ListItem button onClick={() => navigate('/reviewpage')}>
          <ListItemText primary="여행후기" />
        </ListItem>
        <Divider />

        <ListItem button onClick={() => navigate('/welfare')}>
          <ListItemText primary="장애인 지원제도 안내" />
        </ListItem>
        <Divider />

        <ListItem button onClick={() => navigate('/ticketpage')}>
          <ListItemText primary={<Typography fontWeight="bold">티켓 구매</Typography>} />
        </ListItem>
        <Divider />

        <ListItem button onClick={handleMyPageClick}>
          <ListItemText primary="마이페이지" />
          {isMyPageOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        
        <Collapse in={isMyPageOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4 }} onClick={() => navigate('/myplanpage')}>
              <ListItemText primary="여행 계획" secondary="내가 만든 일정 확인" />
            </ListItem>
            
            <ListItem button sx={{ pl: 4 }} onClick={() => navigate('/myreviewpage')}>
              <ListItemText primary="리뷰" secondary="작성한 리뷰 확인" />
            </ListItem>
          </List>
        </Collapse>

      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <AppBar position="static" color="inherit" elevation={0} sx={{ backgroundColor: 'white', padding: '0 10px' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <Typography variant="h4" component="span" sx={{ fontWeight: '900', color: '#002147', fontFamily: 'sans-serif' }}>TR</Typography>
            <Typography variant="h4" component="span" sx={{ fontWeight: '900', color: '#00C896', fontFamily: 'sans-serif' }}>AI</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#f5f5f5', padding: '6px 12px', borderRadius: '20px', border: '1px solid #ddd' }}>
              <LocalActivityIcon sx={{ color: '#002147', fontSize: 20, marginRight: 1 }} />
              <Typography sx={{ fontWeight: 'bold', color: '#333' }}>{myTickets}</Typography>
            </Box>
            
            <Button color="inherit" onClick={() => navigate('/')} sx={{ fontWeight: 'bold', fontSize: '1rem', textTransform: 'none' }}>
              Logout
            </Button>
            
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>

      <Box
        sx={{
          flexGrow: 1,
          backgroundImage: `url(${mainBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)' }} />
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, color: 'white', textAlign: 'left' }}>
          <Typography variant="h5" sx={{ fontWeight: '500', marginBottom: 1, textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>
            떠나고 싶은 여행을 찾으셨나요?
          </Typography>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', marginBottom: 6, textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}>
            나를 위한 여행, TRAI
          </Typography>
          
          <Paper component="form" sx={{ p: '10px 20px', display: 'flex', alignItems: 'center', width: '100%', borderRadius: '12px', marginBottom: 3 }}>
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize: '1.1rem' }}
              placeholder="마음에 들었던 블로그 여행기 URL을 여기에 붙여넣어 주세요."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Paper>
          
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="contained"
              onClick={handleCreate}
              sx={{ backgroundColor: '#1E2B4D', color: 'white', padding: '12px 40px', fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: 1, '&:hover': { backgroundColor: '#141e36' }}}
            >
              일정 생성
              <Box component="span" sx={{ display: 'flex', alignItems: 'center', fontSize: '1rem', fontWeight: 'normal', opacity: 0.9 }}>
                15 <LocalActivityIcon sx={{ fontSize: 18, marginLeft: 0.5 }} />
              </Box>
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default MainPage;
