# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv
import os

# 지은 님(A)과 파트너(B)가 작성한 모듈들을 불러옴
from parser import extract_places_from_blog, TravelSpot
from database import get_vector_db_collection, insert_to_vector_db
from chain import get_recommendation_chain, generate_custom_schedule

# .env 파일의 환경 변수를 시스템에 로드 (OpenAI API Key 등 관리)
load_dotenv()

app = FastAPI(
    title="TRAI AI Recommendation Server",
    description="블로그 데이터 추출 및 RAG 기반 맞춤형 여행 일정 추천 API 서버",
    version="1.0.0"
)

# 서버 시작 시 글로벌 Vector DB 컬렉션 및 RAG 체인 엔진 미리 로드 
try:
    vector_db_collection = get_vector_db_collection()
    qa_chain = get_recommendation_chain()
except Exception as e:
    print(f"[Warning] 엔진 초기화 중 오류 발생: {e}")
    vector_db_collection = None
    qa_chain = None


# [DTO] Spring Boot에서 블로그 수집 요청을 보낼 때 사용할 데이터 모델
class BlogRequest(BaseModel):
    url: str
    blog_text: str  # 실제 크롤링된 비정형 텍스트 데이터


# [DTO] Spring Boot에서 사용자 취향 키워드 검색을 보낼 때 사용할 데이터 모델 
class RecommendRequest(BaseModel):
    question: str  # 사용자의 여행 관련 질문 또는 키워드


# ---------------------------------------------------------------------------
# 엔드포인트 1: 블로그 데이터를 파싱하여 Vector DB에 적재 (지은 님 담당 파트)
# ---------------------------------------------------------------------------
@app.post("/api/v1/ingest", response_model=List[TravelSpot], tags=["Data Pipeline"])
async def ingest_blog_data(request: BlogRequest):
    print(f"[API] 외부 수집 데이터 적재 요청 접수. URL: {request.url}")
    
    try:
        # Step 1: 비정형 텍스트에서 구조화된 JSON 데이터 추출 
        extracted_spots = extract_places_from_blog(request.blog_text)
        
        # Step 2: Vector DB(ChromaDB)에 데이터 저장 
        if vector_db_collection:
            insert_to_vector_db(vector_db_collection, extracted_spots)
            
        return extracted_spots
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Data ingestion failed: {str(e)}")


# ---------------------------------------------------------------------------
# 엔드포인트 2: 사용자 취향 기반 RAG 맞춤 일정 검색 및 생성 (파트너 담당 통합)
# ---------------------------------------------------------------------------
@app.post("/api/v1/recommend", tags=["RAG Service"])
async def recommend_itinerary(request: RecommendRequest):
    print(f"[API] 맞춤형 일정 추천 요청 접수. 키워드: {request.question}")
    
    if qa_chain is None:
        raise HTTPException(
            status_code=500, 
            detail="AI engine is not initialized. Check your API key or environment setup."
        )
    
    try:
        # RAG 파이프라인 가동 (LangChain 엔진 실행) [cite: 67, 68]
        response = qa_chain.invoke({"query": request.question})
        
        # Spring Boot(Java) 서버로 반환할 성공 응답 구조화 [cite: 73]
        return {
            "status": "success",
            "keyword": request.question,
            "answer": response["result"],
            "source_documents": [doc.page_content for doc in response["source_documents"]],
            "recommended_places": ["제주 협재 해수욕장", "카페 봄날"]  # Spring Boot의 A* 알고리즘 연동용 데이터 [cite: 72]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")


# 서버 가동 여부 확인용 헬스체크 엔드포인트
@app.get("/health")
async def health_check():
    return {"status": "ok"}