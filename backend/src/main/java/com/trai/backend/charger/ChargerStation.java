package com.trai.backend.charger;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ChargerStation {
    private Long id;
    private String name;
    private String address;
    private double latitude;
    private double longitude;
}
