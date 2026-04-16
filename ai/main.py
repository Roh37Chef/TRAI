from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from chain import get_recommendation_chain
from dotenv import load_dotenv
import os

#.env 파일의 환경 변수를 시스템에 로드
load_dotenv() 

#FastAPI 앱 초기화
app = FastAPI(title="TRAI AI Recommendation Server")

#요청 데이터 규격 정의 (Spring Boot 서버와 통신용)
class RecommendRequest(BaseModel):
    question: str  #사용자의 여행 관련 질문 또는 키워드

#서버 시작 시 RAG 체인 엔진을 미리 로드
try:
    qa_chain = get_recommendation_chain()
except Exception as e:
    #시스템 로그 메시지
    print(f"Error loading RAG chain: {e}")
    qa_chain = None

#여행 일정 추천 엔드포인트 구현
@app.post("/api/v1/recommend")
async def recommend_itinerary(request: RecommendRequest):
    #엔진 미준수 시 에러 메시지
    if qa_chain is None:
        raise HTTPException(
            status_code=500, 
            detail="AI engine is not initialized. Check your API key or environment setup."
        )
    
    try:
        #사용자 질문을 기반으로 RAG 파이프라인 가동
        response = qa_chain.invoke({"query": request.question})
        
        #성공 응답 반환
        return {
            "status": "success",
            "answer": response["result"],
            "source_documents": [doc.page_content for doc in response["source_documents"]]
        }
    except Exception as e:
        #런타임 에러 발생 시 시스템 메시지 전달
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")

#서버 가동 여부 확인용 헬스체크 엔드포인트
@app.get("/health")
async def health_check():
    return {"status": "ok"}