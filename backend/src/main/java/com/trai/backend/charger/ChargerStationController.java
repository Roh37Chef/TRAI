package com.trai.backend.charger;

import com.trai.backend.charger.dto.ChargerStationDto;
import com.trai.backend.charger.dto.UserLocationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/stations")
@RequiredArgsConstructor
public class ChargerStationController {

    private final ChargerStationService chargerStationService;

    @PostMapping("/nearby")
    public List<ChargerStationDto> getNearbyStations(@RequestBody UserLocationDto userLocation) {
        return chargerStationService.findNearbyStations(userLocation);
    }
}
