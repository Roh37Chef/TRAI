// src/App.jsx (최종 - 지도 관련 Import 및 라우트 정리)

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NavermapsProvider } from 'react-naver-maps'; 

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
import Option6Page from './pages/Option6Page'; 

// 지도 및 로딩 경로
import LoadingPage from './pages/LoadingPage';
// import Busan1Page from './pages/Busan1Page'; // ⚠️ Busan1Page도 제거해야 MapPage와 동일한 문제가 발생하지 않습니다.
// import MapPage from './pages/MapPage';      // ⚠️ MapPage는 삭제했으므로 import를 반드시 제거합니다.
import WelfarePage from './pages/WelfarePage'; 

// 햄버거 메뉴 및 마이페이지 경로
import MoneyPage from './pages/MoneyPage';              
import ReviewPage from './pages/ReviewPage';            
import DisabledPersonPage from './pages/DisabledPersonPage'; 
import TicketPage from './pages/TicketPage';            
import MyPlanPage from './pages/MyPlanPage';            
import MyReviewPage from './pages/MyReviewPage';            

// 상세 후기 경로
import GangneungReviewPage from './pages/GangneungReviewPage'; 
import JungwhaDetailPage from './pages/JungwhaDetailPage';      


// =================================================================
// 2. App 컴포넌트 및 라우팅 설정
// =================================================================

function App() {
    return (
        // NavermapsProvider는 이제 필요 없지만, 프로젝트 구조를 살리기 위해 잠시 유지합니다.
        // MapPage와 Busan1Page의 라우트는 삭제/제거합니다.
        <NavermapsProvider
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

                    {/* 일정 생성 Option 경로 */}
                    <Route path="/option1" element={<Option1Page />} />
                    <Route path="/option2" element={<Option2Page />} />
                    <Route path="/option3" element={<Option3Page />} />
                    <Route path="/option4" element={<Option4Page />} />
                    <Route path="/option6" element={<Option6Page />} />

                    {/* 지도 및 로딩 경로 */}
                    <Route path="/loading" element={<LoadingPage />} />
                    {/* ⚠️ Busan1Page, MapPage 라우트 제거 */}
                    {/* <Route path="/busan1" element={<Busan1Page />} /> */}
                    {/* <Route path="/map" element={<MapPage />} /> */}
                    <Route path="/welfare" element={<WelfarePage />} />

                    {/* 햄버거 메뉴 및 마이페이지 경로 (최종 추가된 경로) */}
                    <Route path="/moneypage" element={<MoneyPage />} />
                    <Route path="/reviewpage" element={<ReviewPage />} />
                    <Route path="/disabledpersonpage" element={<DisabledPersonPage />} />
                    <Route path="/ticketpage" element={<TicketPage />} /> 
                    <Route path="/myplanpage" element={<MyPlanPage />} />
                    <Route path="/myreviewpage" element={<MyReviewPage />} />

                    {/* 상세 후기 경로 */}
                    <Route path="/gangneungreview" element={<GangneungReviewPage />} />
                    <Route path="/jungwha-detail" element={<JungwhaDetailPage />} /> 
                    {/* ⚠️ review/:city 라우트 제거 (다른 페이지도 오류를 유발할 수 있습니다.) */}
                    {/* <Route path="/review/:city" element={<div style={{padding:'50px'}}>도시 상세 후기 페이지 (파라미터 사용)</div>} /> */}

                </Routes>
            </Router>
        </NavermapsProvider>
    );
}

export default App;
