package com.smarttravel.smart_travel.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class TripRequest {
    private String name;
    private String destination;
    private LocalDate startDate;
    private LocalDate endDate;
}