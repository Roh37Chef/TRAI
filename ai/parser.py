import openai
from pydantic import BaseModel
from typing import List

# 1. 추출할 데이터의 규격을 정의
class TravelSpot(BaseModel):
    place_name: str
    address: str
    activity_type: str
    estimated_duration: str
    notes: str

# 2. OpenAI Structured Outputs를 활용한 추출 함수
def extract_places_from_blog(blog_text: str):
    print(f"[System] AI 모델을 사용하여 블로그 데이터를 구조화하는 중...")
    
    client = openai.OpenAI(api_key="YOUR_OPENAI_API_KEY")
    
    # Chat Completions 엔드포인트 호출
    response = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[
            {"role": "system", "content": "너는 여행 정보 추출 전문가야. 블로그 텍스트에서 모든 방문 장소를 JSON으로 추출해줘."},
            {"role": "user", "content": blog_text}
        ],
        response_format=List[TravelSpot], # 이 부분이 Structured Outputs의 핵심
    )
    
    extracted_data = response.choices[0].message.parsed
    print(f"[Success] {len(extracted_data)}개의 장소 데이터를 추출했습니다.")
    return extracted_data