// src/App.jsx (최종 - MainPage를 첫 화면으로 설정)

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// =================================================================
// 1. 모든 페이지 Import 
// =================================================================
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import LoginSuccessPage from './pages/LoginSuccessPage';

// 옵션 선택 경로
import Option1Page from './pages/Option1Page';
import Option2Page from './pages/Option2Page';
import Option3Page from './pages/Option3Page';
import Option4Page from './pages/Option4Page';
import Option6Page from './pages/Option6Page'; 

// 부산 페이지 추가
import BusanPage from './pages/BusanPage';

// 기타 페이지
import LoadingPage from './pages/LoadingPage';
import WelfarePage from './pages/WelfarePage'; 
import MoneyPage from './pages/MoneyPage';              
import ReviewPage from './pages/ReviewPage';            
import DisabledPersonPage from './pages/DisabledPersonPage'; 
import TicketPage from './pages/TicketPage';            
import MyPlanPage from './pages/MyPlanPage';            
import MyReviewPage from './pages/MyReviewPage';            
import GangneungReviewPage from './pages/GangneungReviewPage'; 
import JungwhaDetailPage from './pages/JungwhaDetailPage';      
// import HomePage from './pages/HomePage'; // ⚠️ HomePage는 사용하지 않으므로 Import 제외

// =================================================================
// 2. App 컴포넌트 및 라우팅 설정
// =================================================================

function App() {
    return (
        <Router>
            <Routes>
                {/* ✅ MainPage를 기본 루트 경로 ("/")로 설정합니다. 
                /main 경로도 MainPage로 연결합니다.
                */}
                <Route path="/" element={<MainPage />} />
                <Route path="/main" element={<MainPage />} />
                
                {/* 로그인 및 회원가입 */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/loginsuccess" element={<LoginSuccessPage />} />
                
                {/* 일정 생성 Option 경로 (핵심) */}
                <Route path="/option1" element={<Option1Page />} />
                <Route path="/option2" element={<Option2Page />} />
                <Route path="/option3" element={<Option3Page />} />
                <Route path="/option4" element={<Option4Page />} />
                <Route path="/option6" element={<Option6Page />} />

                {/* 부산 페이지 라우트 (BusanPage를 /busanpage 및 /Busan 모두 허용) */}
                <Route path="/busanpage" element={<BusanPage />} />
                <Route path="/Busan" element={<BusanPage />} /> 

                {/* 나머지 페이지 라우트 */}
                <Route path="/loading" element={<LoadingPage />} />
                <Route path="/welfare" element={<WelfarePage />} />
                <Route path="/moneypage" element={<MoneyPage />} />
                <Route path="/reviewpage" element={<ReviewPage />} />
                <Route path="/disabledpersonpage" element={<DisabledPersonPage />} />
                <Route path="/ticketpage" element={<TicketPage />} /> 
                <Route path="/myplanpage" element={<MyPlanPage />} />
                <Route path="/myreviewpage" element={<MyReviewPage />} />
                <Route path="/gangneungreview" element={<GangneungReviewPage />} />
                <Route path="/jungwha-detail" element={<JungwhaDetailPage />} /> 
                <Route path="/review/:city" element={<div style={{padding:'50px'}}>도시 상세 후기 페이지 (파라미터 사용)</div>} />
                
                {/* ⚠️ HomePage 라우트는 제거되었습니다. */}
            </Routes>
        </Router>
    );
}

export default App;
