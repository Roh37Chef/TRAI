import { NavermapsProvider } from 'react-naver-maps';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import WelfarePage from './pages/WelfarePage';
import MapPage from './pages/MapPage';

function App() {
  return (
  
    <NavermapsProvider>
      <BrowserRouter>
        <div style={{ padding: '20px' }}>
          <nav style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
            <Link to="/">홈/지도</Link>
            <Link to="/welfare">장애인 복지 정보</Link>
            <Link to="/login">로그인/회원가입</Link>
          </nav>

          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/welfare" element={<WelfarePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </NavermapsProvider>
  );
}

export default App;