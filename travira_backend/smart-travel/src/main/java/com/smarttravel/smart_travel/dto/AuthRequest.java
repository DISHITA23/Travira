package com.smarttravel.smart_travel.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}