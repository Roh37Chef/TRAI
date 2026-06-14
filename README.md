# 🤖 AI 여행 일정 추천 프로젝트 (TRAI)

블로그 URL이나 키워드를 기반으로 맞춤형 여행 일정을 생성하고, A\* 알고리즘을 통해 최적의 동선을 추천하는 AI 여행 일정 추천 시스템입니다.

---

## 🛠️ 주요 기술 스택 (Tech Stack)

| 역할 | 폴더 | 주요 기술 스택 | 언어 환경 |
| :--- | :--- | :--- | :--- |
| **프론트엔드 (UI/UX)** | `frontend` | React | JavaScript |
| **백엔드 (시스템 관리 & A\*)** | `backend` | Spring Boot, Java, A\* (A-star) | Java |
| **AI/RAG 서버 (추출 & 검색)** | `ai` | FastAPI, LangChain, OpenAI API | Python |
| **데이터베이스 (DB)** | `backend` / `ai` | MySQL, ChromaDB | SQL & Python |

### 1. AI/데이터 추출 및 검색 (`ai`)
* **비정형 데이터 추출:** OpenAI Chat Completions API (JSON Mode)
* **지식 기반 구축 (벡터화):** OpenAI Embeddings API
* **벡터 데이터 저장:** ChromaDB (Vector DB)
* **맞춤 일정 검색 (RAG):** LangChain

### 2. 백엔드 시스템 및 최적화 (`backend`)
* **경로 최적화:** A\* (A-star) 알고리즘
* **이동 비용 산출:** 네이버 지도 API (Geocoding)
* **데이터 관리:** MySQL (사용자, 가계부, 일정 등)

### 3. 프론트엔드 (`frontend`)
* **UI/UX:** React
* **API 통신:** Axios
* **상태 관리:** Zustand (또는 Recoil)
* **지도:** react-kakao-maps-sdk

---

## 🚀 프로젝트 실행 방법

### 1. 프론트엔드 (React)
```bash
cd frontend
npm install
npm run dev
```

### 2. 백엔드 (Spring Boot)
```bash
1. IntelliJ 또는 Eclipse에서 backend 폴더를 프로젝트로 열기
2. build.gradle (또는 pom.xml) 의존성을 빌드
3. application.properties (또는 .yml) 파일에 MySQL, 네이버 API 키 등 설정을 확인
3. 메인 애플리케이션을 실행
```

### 3. AI/RAG 서버 (Python)
```bash
cd ai
pip install -r requirements.txt
uvicorn main:app --reload
```

## TRAI 저장소 최상위 폴더에서 실행
```bash
git config --local commit.template .gitmessage.txt
```

## 개발 및 PR (Pull Request) 진행 순서
```bash
1. 시작 전 동기화: git pull origin main
2. 브랜치 생성: git checkout -b 브랜치명(ex: backend/feature/auth-register)
3. 코드 수정
4. 변경 파일 추가: git add 파일명(ex: backend/	frontend/	ai/)
5. 커밋: git commit (e 키 눌러서 수정 후 esc -> :wq 입력하여 저장)
6. 원격 푸시: git push origin 생성한 브랜치명(ex: backend/feature/auth-register)
7. PR 요청: GitHub 웹사이트에서 해당 브랜치명 → main으로 Pull Request를 요청합니다.
```
