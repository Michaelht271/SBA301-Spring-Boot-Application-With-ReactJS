package com.jobmate.jobmate_connect.dto.response.user;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployerResponse {
    UUID id;
    String email;
    String fullName;
    String address;
    String avatarUrl;
    String badgeLevel;
    Integer reviewCount;
}
