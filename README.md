# 🤖 AI 여행 일정 추천 프로젝트 TRAI (P-실무 프로젝트)

이 프로젝트는 AI를 활용하여 블로그 URL이나 키워드를 기반으로 맞춤형 여행 일정을 생성하고 최적의 동선을 추천하는 시스템입니다.

(1분반(SW) 2조)

---

## 🛠️ 주요 기술 스택 (Tech Stack)

### 1. 프론트엔드 (`frontend-react`)
* React
* JavaScript
* Axios (API 통신)
* Zustand (상태 관리)
* React Router (페이지 이동)
* Material-UI (MUI) (UI 컴포넌트)
* react-kakao-maps-sdk (지도)

### 2. 백엔드 (`backend-spring`)
* Spring Boot
* Java
* MySQL (사용자 정보, 일정 데이터 관리)
* A* (A-star) 알고리즘 (경로 최적화)
* 네이버 지도 API (Geocoding)

### 3. AI/RAG 서버 (`ai-python`)
* FastAPI
* Python
* OpenAI API (GPT - 일정 추출, 생성)
* LangChain (RAG 파이프라인)
* ChromaDB (Vector DB)

---

## 🚀 프로젝트 실행 방법

### 1. 프론트엔드 (React)
```bash
cd frontend-react
npm install
npm run dev