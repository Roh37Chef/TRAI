# chain.py
from langchain_openai import ChatOpenAI
from langchain_classic.chains import RetrievalQA
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from database import get_vector_db_collection

def get_recommendation_chain():
    #모델 설정 (GPT-4o)
    #실제로는 .env 파일에서 API 키를 관리해야 함
    llm = ChatOpenAI(model_name="gpt-4o", temperature=0.7)
    
    #벡터 DB 연결
    #벡터에서 사용한 'text-embedding-3-small' 모델을 똑같이 지정
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
    
    #DB 클라이언트를 LangChain용 VectorStore로 변환
    collection = get_vector_db_collection()
    vector_db = Chroma(
        client=collection._client,
        collection_name="travel_knowledge_base",
        embedding_function=embeddings
    )
    
    #RAG 파이프라인(Chain) 구성
    #사용자 질문 -> DB 검색 -> GPT 답변 생성의 흐름을 하나로 묶는 역할
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff", #검색된 문서들을 한꺼번에 모델에 전달
        retriever=vector_db.as_retriever(search_kwargs={"k": 3}), #유사한 장소 k개 추출
        return_source_documents=True
    )
    
    return qa_chain