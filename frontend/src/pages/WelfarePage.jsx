function WelfarePage() {
  const welfareList = [
    { id: 1, title: "2025년 장애인 연금 인상 안내", date: "2025-01-10" },
    { id: 2, title: "전동 휠체어 보조금 신청 방법", date: "2025-02-15" },
    { id: 3, title: "지하철 교통약자 도우미 서비스", date: "2025-03-01" },
    { id: 4, title: "휠체어가 갈 수 있는 길", date: "2025-03-01" },
    { id: 5, title: "관광 약자를 위한 여행 서비스 설명서", date: "2025-03-01" },
    { id: 6, title: "유용한 무장애 여행정보", date: "2025-03-01" },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>📢 장애인 복지 정보</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {welfareList.map((item) => (
          <li key={item.id} style={{ borderBottom: '1px solid #ddd', padding: '15px 0' }}>
            <strong>{item.title}</strong> <br />
            <span style={{ color: '#888', fontSize: '0.9em' }}>{item.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WelfarePage;
