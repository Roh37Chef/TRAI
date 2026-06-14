from langchain_openai import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory

# LangChain을 활용한 Retrieval-Augmented Generation(RAG) 파이프라인 구축 [cite: 63, 66]
def create_rag_recommendation_chain(vector_db_collection):
    print("[System] LangChain 오케스트레이션을 통한 RAG 파이프라인을 초기화합니다...") [cite: 66]
    
    # 1. 초거대 언어 모델(LLM) 설정 [cite: 64, 66]
    llm = ChatOpenAI(
        model_name="gpt-4o", 
        temperature=0.7,
        openai_api_key="YOUR_OPENAI_API_KEY"
    )
    
    # 2. ChromaDB를 LangChain 리트리버(검색기) 형태로 변환 [cite: 54, 66]
    # 사용자의 취향 키워드를 바탕으로 가장 유사한 장소 벡터를 Vector DB에서 검색 [cite: 36, 68]
    retriever = vector_db_collection.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 3} # 가장 유사도가 높은 상위 3개 장소 추출 [cite: 36]
    )
    
    # 3. 대화 맥락 기억을 위한 메모리 설정 (선택 사항이지만 완성도를 높여줌)
    memory = ConversationBufferMemory(
        memory_key="chat_history",
        return_messages=True
    )
    
    # 4. 검색(Retrieval)과 생성(Generation)을 결합한 통합 RAG 체인 생성 [cite: 66, 68]
    rag_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=retriever,
        memory=memory
    )
    
    print("[Success] RAG 기반 맞춤 일정 생성 파이프라인 구축 완료.") [cite: 38]
    return rag_chain

# 사용자의 요청을 받아 RAG 체인을 실행하는 함수 [cite: 38]
def generate_custom_schedule(rag_chain, user_keyword: str):
    print(f"[Inference] 사용자 맞춤 키워드 분석 중: '{user_keyword}'") [cite: 35]
    
    # 사용자의 '힐링/먹방' 같은 키워드를 프롬프트와 조합하여 RAG 검색 및 생성 수행 [cite: 35, 68]
    prompt = f"사용자가 원하느 여행 테마는 '{user_keyword}' 입니다. 이 취향에 맞는 장소들을 기반으로 최종 추천 일정표를 생성해주세요." [cite: 38, 68]
    response = rag_chain({"question": prompt})
    
    return response["answer"]