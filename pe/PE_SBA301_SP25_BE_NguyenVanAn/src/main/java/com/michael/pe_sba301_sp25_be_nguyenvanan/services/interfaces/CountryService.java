package com.michael.pe_sba301_sp25_be_nguyenvanan.services.interfaces;

import com.michael.pe_sba301_sp25_be_nguyenvanan.entites.Country;

import java.util.List;

public interface CountryService {
	List<Country> getAllCountries();
	
	Country getCountryById(Long countryId);
	
	Country createCountry(Country country);
	
	Country updateCountry(Long countryId, Country updatedCountry);
	
	void deleteCountry(Long countryId);
}
