package com.trai.backend.charger.dto;

import com.trai.backend.charger.ChargerStation;
import lombok.Getter;

@Getter
public class ChargerStationDto {
    private final Long id;
    private final String name;
    private final String address;
    private final double latitude;
    private final double longitude;
    private final double distance; // Distance in kilometers

    public ChargerStationDto(ChargerStation station, double distance) {
        this.id = station.getId();
        this.name = station.getName();
        this.address = station.getAddress();
        this.latitude = station.getLatitude();
        this.longitude = station.getLongitude();
        this.distance = Math.round(distance * 100.0) / 100.0; // Round to 2 decimal places
    }
}
