package com.michael.pe_sba301_sp25_be_nguyenvanan.controller;

import com.michael.pe_sba301_sp25_be_nguyenvanan.services.interfaces.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/countries")
@RequiredArgsConstructor
public class CountryController {
	private final CountryService countryService;
 
	@GetMapping
	public Object getAllCountries() {
		return countryService.getAllCountries();
	}
}
