// src/App.jsx (고객님 제공 최종 라우팅 통합 버전)

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NavermapsProvider } from 'react-naver-maps'; // NavermapsProvider 사용

// =================================================================
// 1. 모든 페이지 Import
// =================================================================
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';
import LoginSuccessPage from './pages/LoginSuccessPage';

// 옵션 선택 경로
import Option1Page from './pages/Option1Page';
import Option2Page from './pages/Option2Page';
import Option3Page from './pages/Option3Page';
import Option4Page from './pages/Option4Page';
import Option6Page from './pages/Option6Page'; // Option 5는 제거됨

// 지도 및 로딩 경로
import LoadingPage from './pages/LoadingPage';
import Busan1Page from './pages/Busan1Page'; // 지도 페이지
import MapPage from './pages/MapPage'; 
import WelfarePage from './pages/WelfarePage'; 

// 햄버거 메뉴 및 마이페이지 경로
import MoneyPage from './pages/MoneyPage';              // 가계부
import ReviewPage from './pages/ReviewPage';            // 여행 후기 (목록)
import DisabledPersonPage from './pages/DisabledPersonPage'; // 지원 제도 안내
import TicketPage from './pages/TicketPage';            // 티켓 구매
import MyPlanPage from './pages/MyPlanPage';            // 마이페이지 - 여행 계획
import MyReviewPage from './pages/MyReviewPage';            // 마이페이지 - 리뷰

// 상세 후기 경로
import GangneungReviewPage from './pages/GangneungReviewPage'; // 강릉 리뷰 목록
import JungwhaDetailPage from './pages/JungwhaDetailPage';      // 정화식당 상세 리뷰


// =================================================================
// 2. App 컴포넌트 및 라우팅 설정
// =================================================================

function App() {
    return (
        // NavermapsProvider를 사용합니다.
        <NavermapsProvider
            // Client ID 적용
            clientId="nsna3qednt" 
            submodules={["panorama", "geocoder"]}
        >
            <Router>
                <Routes>
                    {/* 메인 및 로그인/회원가입 */}
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/loginsuccess" element={<LoginSuccessPage />} />

                    {/* 일정 생성 Option 경로 (Option 5 제거됨) */}
                    <Route path="/option1" element={<Option1Page />} />
                    <Route path="/option2" element={<Option2Page />} />
                    <Route path="/option3" element={<Option3Page />} />
                    <Route path="/option4" element={<Option4Page />} />
                    <Route path="/option6" element={<Option6Page />} />

                    {/* 지도 및 로딩 경로 */}
                    <Route path="/loading" element={<LoadingPage />} />
                    <Route path="/busan1" element={<Busan1Page />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/welfare" element={<WelfarePage />} />

                    {/* 햄버거 메뉴 및 마이페이지 경로 (최종 추가된 경로) */}
                    <Route path="/moneypage" element={<MoneyPage />} />
                    <Route path="/reviewpage" element={<ReviewPage />} />
                    <Route path="/disabledpersonpage" element={<DisabledPersonPage />} />
                    <Route path="/ticketpage" element={<TicketPage />} /> {/* 티켓 구매 */}
                    <Route path="/myplanpage" element={<MyPlanPage />} />
                    <Route path="/myreviewpage" element={<MyReviewPage />} />

                    {/* 상세 후기 경로 */}
                    <Route path="/gangneungreview" element={<GangneungReviewPage />} />
                    <Route path="/jungwha-detail" element={<JungwhaDetailPage />} /> {/* 정화식당 상세 */}
                    <Route path="/review/:city" element={<div style={{padding:'50px'}}>도시 상세 후기 페이지 (파라미터 사용)</div>} />

                </Routes>
            </Router>
        </NavermapsProvider>
    );
}

export default App;
