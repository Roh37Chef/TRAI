import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, IconButton, Box, Container, InputBase, Paper, 
  Drawer, List, ListItem, ListItemText, Divider, Collapse 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalActivityIcon from '@mui/icons-material/LocalActivity'; 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 
import ExpandLessIcon from '@mui/icons-material/ExpandLess'; // 접기 아이콘 추가
import { useNavigate } from 'react-router-dom';
import mainBgImage from '../assets/mainpagebgi.jpg';

function MainPage() {
  const navigate = useNavigate();
  const [url, setUrl] = useState(""); 
  const [myTickets, setMyTickets] = useState(25);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 마이페이지 하위 메뉴 열림/닫힘 상태 관리
  const [isMyPageOpen, setIsMyPageOpen] = useState(false);

  // 드로어 열기/닫기 함수
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  // 마이페이지 클릭 시 하위 메뉴 토글 (드로어는 닫히면 안 됨)
  const handleMyPageClick = (e) => {
    e.stopPropagation(); // 드로어가 닫히는 것을 방지
    setIsMyPageOpen(!isMyPageOpen);
  };

  // 일정 생성 핸들러
  const handleCreate = () => {
    if (myTickets < 15) {
      alert("티켓이 부족합니다! 😭");
      return;
    }
    if (!url) {
      alert("URL을 입력해주세요!");
      return;
    }
    if(window.confirm(`티켓 15개를 사용하여 일정을 생성하시겠습니까?\n(남은 티켓: ${myTickets}개)`)) {
      setMyTickets(prev => prev - 15);
      alert("일정이 생성되었습니다! (기능 구현 예정)");
    }
  };

  // 드로어 내용
  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      // Box 전체 클릭 시 드로어 닫힘 (단, 마이페이지 토글 시에는 stopPropagation으로 막음)
      onClick={toggleDrawer(false)} 
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {/* 1. 로그인/회원가입 (로그아웃) */}
        <ListItem button onClick={() => { alert("로그아웃 되었습니다."); navigate('/'); }}>
          <ListItemText primary={<Typography fontWeight="bold">로그인/회원가입</Typography>} />
        </ListItem>
        <Divider />

        {/* 2. 가계부 */}
        <ListItem button onClick={() => alert("가계부 페이지 (준비중)")}>
          <ListItemText primary="가계부" />
        </ListItem>
        <Divider />

        {/* 3. 여행후기 */}
        <ListItem button onClick={() => alert("여행후기 페이지 (준비중)")}>
          <ListItemText primary="여행후기" />
        </ListItem>
        <Divider />

        {/* 4. 장애인 지원제도 안내 */}
        <ListItem button onClick={() => navigate('/welfare')}>
          <ListItemText primary="장애인 지원제도 안내" />
        </ListItem>
        <Divider />

        {/* 5. 티켓 구매 (새로 추가된 메뉴) */}
        <ListItem button onClick={() => alert("티켓 구매 페이지 (준비중)")}>
          <ListItemText primary={<Typography fontWeight="bold">티켓 구매</Typography>} />
        </ListItem>
        <Divider />

        {/* 6. 마이페이지 (펼치기 기능) */}
        <ListItem button onClick={handleMyPageClick}>
          <ListItemText primary="마이페이지" />
          {/* 상태에 따라 화살표 아이콘 변경 */}
          {isMyPageOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        
        {/* 마이페이지 하위 메뉴 (Collapse) */}
        <Collapse in={isMyPageOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* 하위 메뉴 1: 여행 계획 */}
            <ListItem button sx={{ pl: 4 }} onClick={() => alert("나의 여행 계획 보러가기")}>
              <ListItemText primary="여행 계획" secondary="내가 만든 일정 확인" />
            </ListItem>
            
            {/* 하위 메뉴 2: 리뷰 */}
            <ListItem button sx={{ pl: 4 }} onClick={() => alert("나의 리뷰 관리")}>
              <ListItemText primary="리뷰" secondary="작성한 리뷰 확인" />
            </ListItem>
          </List>
        </Collapse>

      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 헤더 */}
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

      {/* 사이드바 (Drawer) */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>

      {/* 메인 컨텐츠 */}
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