package com.trai.backend.charger;

import com.trai.backend.charger.dto.ChargerStationDto;
import com.trai.backend.charger.dto.UserLocationDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChargerStationService {

    // In a real application, this data would come from a database.
    private final List<ChargerStation> mockStations = new ArrayList<>();

    public ChargerStationService() {
        // Mock data for rapid wheelchair charging stations
        mockStations.add(new ChargerStation(1L, "가천대학교 글로벌센터", "성남시 수정구 성남대로 1342", 37.4508, 127.1272));
        mockStations.add(new ChargerStation(2L, "모란역", "성남시 중원구 성남대로 1144", 37.4320, 127.1293));
        mockStations.add(new ChargerStation(3L, "판교역", "성남시 분당구 판교역로 160", 37.3948, 127.1112));
        mockStations.add(new ChargerStation(4L, "정자역", "성남시 분당구 성남대로 333", 37.3662, 127.1062));
        mockStations.add(new ChargerStation(5L, "야탑역", "성남시 분당구 성남대로 926", 37.4109, 127.1290));
    }

    public List<ChargerStationDto> findNearbyStations(UserLocationDto userLocation) {
        return mockStations.stream()
                .map(station -> {
                    double distance = calculateDistance(
                            userLocation.getLatitude(), userLocation.getLongitude(),
                            station.getLatitude(), station.getLongitude()
                    );
                    return new ChargerStationDto(station, distance);
                })
                .sorted(Comparator.comparingDouble(ChargerStationDto::getDistance))
                .collect(Collectors.toList());
    }

    /**
     * Calculate distance between two points in latitude and longitude.
     * Uses Haversine formula.
     * @return Distance in kilometers
     */
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Radius of the earth in km

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        return R * c;
    }
}
