from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

# 지은 님(A)과 파트너(B)가 작성한 모듈들을 불러옴 (핵심 연결 고리)
from parser import extract_places_from_blog, TravelSpot
from database import get_vector_db_collection, insert_to_vector_db, search_similar_places
from chain import create_rag_recommendation_chain, generate_custom_schedule

app = FastAPI(
    title="TRAI AI Recommendation Server",
    description="블로그 데이터 추출 및 RAG 기반 맞춤형 여행 일정 추천 API 서버",
    version="1.0.0"
)

# 1. 글로벌 Vector DB 컬렉션 및 RAG 체인 초기화
try:
    vector_db_collection = get_vector_db_collection()
    rag_chain = create_rag_recommendation_chain(vector_db_collection)
except Exception as e:
    print(f"[Warning] 초기화 중 오류 발생 (발표용 실행 환경 예외 처리): {e}")
    vector_db_collection = None
    rag_chain = None


# 2. Spring Boot에서 블로그 URL 수집 요청을 보낼 때 사용할 데이터 모델
class BlogRequest(BaseModel):
    url: str
    blog_text: str  # 실제 크롤링된 비정형 텍스트 데이터


# 3. Spring Boot에서 사용자 취향 키워드 검색을 보낼 때 사용할 데이터 모델
class RecommendRequest(BaseModel):
    keyword: str


# ---------------------------------------------------------------------------
# 엔드포인트 1: 블로그 데이터를 파싱하여 Vector DB에 적재 (Data Ingestion API)
# ---------------------------------------------------------------------------
@app.post("/api/v1/ingest", response_model=List[TravelSpot], tags=["Data Pipeline"])
async def ingest_blog_data(request: BlogRequest):
    print(f"[API] 외부 수집 데이터 적재 요청 접수. URL: {request.url}")
    
    try:
        # Step 1: 지은 님의 parser를 이용해 비정형 텍스트에서 구조화된 JSON 데이터 추출
        extracted_spots = extract_places_from_blog(request.blog_text)
        
        # Step 2: 지은 님의 database 로직을 이용해 Vector DB(ChromaDB)에 저장
        if vector_db_collection:
            insert_to_vector_db(vector_db_collection, extracted_spots)
            
        return extracted_spots
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Data ingestion failed: {str(e)}")


# ---------------------------------------------------------------------------
# 엔드포인트 2: 사용자 취향 기반 RAG 맞춤 일정 검색 및 생성 (Inference API)
# ---------------------------------------------------------------------------
@app.post("/api/v1/recommend", tags=["RAG Service"])
async def get_ai_recommendation(request: RecommendRequest):
    print(f"[API] 맞춤형 일정 추천 요청 접수. 키워드: {request.keyword}")
    
    try:
        # Step 1: 지은 님의 database 로직을 이용해 Vector DB에서 유사 장소 탐색 (Retrieval)
        if vector_db_collection:
            retrieved_contexts = search_similar_places(vector_db_collection, request.keyword)
            print(f"[Log] Vector DB에서 연관 컨텍스트 {len(retrieved_contexts)}건을 발견했습니다.")
        
        # Step 2: 파트너의 chain 로직을 이용해 LLM 최종 답변 생성 (Generation)
        # 수치적 유사