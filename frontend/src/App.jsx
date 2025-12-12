import { NavermapsProvider } from 'react-naver-maps';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import WelfarePage from './pages/WelfarePage';
import MapPage from './pages/MapPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    // index.html에 키를 넣었으므로 여기선 껍데기만 사용
    <NavermapsProvider>
      <BrowserRouter>
        <Routes>
          {/* ✨ 기본 경로("/") 접속 시 HomePage를 보여줌 */}
          <Route path="/" element={<HomePage />} />

          {/* ✨ 2. 회원가입 경로 추가! */}
          <Route path="/signup" element={<SignupPage />} />

          {/* ✨ 로그인 후 접속할 메인 페이지 경로 추가 */}
          <Route path="/main" element={<MainPage />} />
          
          {/* 나머지 페이지들 */}
          <Route path="/map" element={<MapPage />} />
          <Route path="/welfare" element={<WelfarePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </NavermapsProvider>
  );
}

export default App;