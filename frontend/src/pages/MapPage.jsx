import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';

function MapPage() {
  const navermaps = useNavermaps();

  // (임시 데이터) 나중에 공공데이터 API에서 진짜 충전소 정보를 가져옴
  const stations = [
    { title: "가천대 충전소", lat: 37.4500, lng: 127.1288 },
    { title: "서울시청 충전소", lat: 37.5665, lng: 126.9780 },
  ];

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <h2>⚡ 가까운 급속 휠체어 충전소</h2>
      <MapDiv style={{ width: '100%', height: '100%' }}>
        <NaverMap
          defaultCenter={new navermaps.LatLng(37.4500, 127.1288)} // 가천대 중심
          defaultZoom={15}
        >
          {stations.map((station, index) => (
            <Marker
              key={index}
              position={new navermaps.LatLng(station.lat, station.lng)}
              title={station.title}
              onClick={() => alert(`${station.title} 입니다!`)}
            />
          ))}
        </NaverMap>
      </MapDiv>
    </div>
  );
}

export default MapPage;