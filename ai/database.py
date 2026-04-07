import chromadb
from chromadb.utils import embedding_functions

# 1. ChromaDB 초기화 및 임베딩 설정 [cite: 53, 54]
def get_vector_db_collection():
    # 로컬 경로에 DB 저장 [cite: 55]
    client = chromadb.PersistentClient(path="./chroma_db")
    
    # OpenAI Embedding API 사용 설정 [cite: 31, 32]
    openai_ef = embedding_functions.OpenAIEmbeddingFunction(
        api_key="YOUR_OPENAI_API_KEY",
        model_name="text-embedding-3-small"
    )
    
    # 컬렉션 생성 (기존에 있으면 가져옴)
    collection = client.get_or_create_collection(
        name="travel_knowledge_base", 
        embedding_function=openai_ef
    )
    return collection

# 2. 데이터 적재 (Indexing) [cite: 68]
def insert_to_vector_db(collection, spots: list):
    for i, spot in enumerate(spots):
        # 텍스트와 메타데이터를 함께 저장 [cite: 51]
        collection.add(
            documents=[f"{spot.place_name}: {spot.notes}"], # 검색될 텍스트
            metadatas=[spot.dict()], # 상세 정보 (Spring Boot 전송용) [cite: 51]
            ids=[f"spot_{i}_{spot.place_name}"]
        )
    print(f"[Database] {len(spots)}개의 장소가 Vector DB에 성공적으로 저장되었습니다.")

# 3. 유사도 검색 (Retrieval) [cite: 36, 68]
def search_similar_places(collection, query: str, n_results=3):
    print(f"[Search] 키워드 '{query}'와 유사한 장소를 검색합니다...")
    results = collection.query(
        query_texts=[query],
        n_results=n_results
    )
    return results['metadatas'][0] # 가장 유사한 장소들의 상세 정보 반환