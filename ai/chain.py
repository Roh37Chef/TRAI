# chain.py
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from database import get_vector_db_collection

# 1. RAG 파이프라인(Chain)을 구성하는 함수
def get_recommendation_chain():
    print("[System] LangChain 오케스트레이션을 통한 RAG 파이프라인을 초기화합니다...") [cite: 66]
    
    # 모델 설정 (GPT-4o)
    llm = ChatOpenAI(
        model_name="gpt-4o", 
        temperature=0.7,
        openai_api_key="YOUR_OPENAI_API_KEY" # 발표용 키 설정 공간
    )
    
    # 벡터화에 사용한 'text-embedding-3-small' 모델을 똑같이 지정
    embeddings = OpenAIEmbeddings(
        model="text-embedding-3-small",
        openai_api_key="YOUR_OPENAI_API_KEY"
    )
    
    # DB 클라이언트를 LangChain용 VectorStore로 변환하여 유기적으로 연동 [cite: 54, 55]
    collection = get_vector_db_collection() [cite: 55]
    vector_db = Chroma(
        client=collection._client,
        collection_name="travel_knowledge_base",
        embedding_function=embeddings
    )
    
    # RAG 파이프라인 구성: 사용자 질문 -> DB 검색 -> GPT 답변 생성 [cite: 68]
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff", # 검색된 문서들을 한꺼번에 모델에 전달
        retriever=vector_db.as_retriever(search_kwargs={"k": 3}), # 유사한 장소 3개 추출 [cite: 36]
        return_source_documents=True
    )
    
    print("[Success] RAG 기반 맞춤 일정 생성 파이프라인 구축 완료.") [cite: 38]
    return qa_chain

# 2. 사용자의 요청을 받아 RAG 체인을 실행하고 답변을 반환하는 함수 [cite: 38]
def generate_custom_schedule(qa_chain, user_keyword: str):
    print(f"[Inference] 사용자 맞춤 키워드 분석 중: '{user_keyword}'") [cite: 35]
    
    # 사용자의 '힐링/먹방' 같은 키워드를 프롬프트와 조합하여 RAG 검색 및 생성 수행 [cite: 35, 68]
    prompt = f"사용자가 원하는 여행 테마는 '{user_keyword}' 입니다. 이 취향에 맞는 장소들을 기반으로 최종 추천 일정표를 생성해주세요." [cite: 38, 68]
    response = qa_chain({"query": prompt})
    
    return response["result"]