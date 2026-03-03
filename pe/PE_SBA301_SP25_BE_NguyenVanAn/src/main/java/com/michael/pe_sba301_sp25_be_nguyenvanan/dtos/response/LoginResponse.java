package com.michael.pe_sba301_sp25_be_nguyenvanan.dtos.response;

import lombok.Data;

import java.util.List;
@Data
public class LoginResponse {
	private String token;
	private List<String> roles;
	
}
