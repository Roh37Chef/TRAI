import React from 'react';
import { NavermapsProvider } from 'react-naver-maps';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// =================================================================
// 1. 주요 페이지 (홈, 로그인, 메인, 지도 - 사용자가 가장 먼저 접하는 화면)
// =================================================================
import HomePage from './pages/HomePage';       // 초기화면 (기차 배경)
import LoginPage from './pages/LoginPage';     // 로그인 페이지
import SignupPage from './pages/SignupPage';   // 회원가입 페이지 (주인님이 만드신 파일)
import MainPage from './pages/MainPage';       // 로그인 후 메인 화면
import MapPage from './pages/MapPage';         // 지도 및 충전소 찾기 화면

// =================================================================
// 2. 세부 기능 페이지 (옵션 선택, 여행지 상세, 마이페이지 등 - 팀원 작업분)
// =================================================================
import LoginSuccessPage from './pages/LoginSuccessPage';
import LoadingPage from './pages/LoadingPage';
import WelfarePage from './pages/WelfarePage'; // 복지 정보
import MoneyPage from './pages/MoneyPage';
import ReviewPage from './pages/ReviewPage';
import DisabledPersonPage from './pages/DisabledPersonPage';
import TicketPage from './pages/TicketPage';
import MyPlanPage from './pages/MyPlanPage';
import MyReviewPage from './pages/MyReviewPage';
import GangneungReviewPage from './pages/GangneungReviewPage';
import JungwhaDetailPage from './pages/JungwhaDetailPage';

// 여행 옵션 선택 페이지들
import Option1Page from './pages/Option1Page';
import Option2Page from './pages/Option2Page';
import Option3Page from './pages/Option3Page';
import Option4Page from './pages/Option4Page';
import Option6Page from './pages/Option6Page';

// 부산 여행 관련 페이지
import BusanPage from './pages/BusanPage';

// =================================================================
// 3. 앱 전체 설정 및 라우터 연결
// =================================================================

function App() {
  return (
    // 네이버 지도 API를 앱 전체에서 사용하기 위해 감싸주는 설정
    <NavermapsProvider>
      <Router>
        <Routes>
          {/* --- [메인 접속 및 인증 관련] --- */}
          {/* 접속하자마자 보이는 화면 (기차 배경 홈) */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* --- [핵심 기능] --- */}
          {/* 로그인 후 진입하는 메인 대시보드 */}
          <Route path="/main" element={<MainPage />} />
          {/* 휠체어 충전소 지도 화면 */}
          <Route path="/map" element={<MapPage />} />
          {/* 장애인 복지 정보 리스트 */}
          <Route path="/welfare" element={<WelfarePage />} />

          {/* --- [상태 및 결과 화면] --- */}
          <Route path="/loginsuccess" element={<LoginSuccessPage />} />
          <Route path="/loading" element={<LoadingPage />} />
          
          {/* --- [여행 코스 생성 옵션] --- */}
          <Route path="/option1" element={<Option1Page />} />
          <Route path="/option2" element={<Option2Page />} />
          <Route path="/option3" element={<Option3Page />} />
          <Route path="/option4" element={<Option4Page />} />
          <Route path="/option6" element={<Option6Page />} />

          {/* --- [지역별 상세 페이지] --- */}
          <Route path="/busanpage" element={<BusanPage />} />
          <Route path="/Busan" element={<BusanPage />} />

          {/* --- [기타 부가 기능] --- */}
          <Route path="/moneypage" element={<MoneyPage />} />
          <Route path="/reviewpage" element={<ReviewPage />} />
          <Route path="/disabledpersonpage" element={<DisabledPersonPage />} />
          <Route path="/ticketpage" element={<TicketPage />} />
          <Route path="/myplanpage" element={<MyPlanPage />} />
          <Route path="/myreviewpage" element={<MyReviewPage />} />
          <Route path="/gangneungreview" element={<GangneungReviewPage />} />
          <Route path="/jungwha-detail" element={<JungwhaDetailPage />} />
          
          {/* 리뷰 상세 페이지 (동적 경로 예시) */}
          <Route path="/review/:city" element={<div style={{padding:'50px'}}>후기 상세 페이지</div>} />

        </Routes>
      </Router>
    </NavermapsProvider>
  );
}

export default App;
