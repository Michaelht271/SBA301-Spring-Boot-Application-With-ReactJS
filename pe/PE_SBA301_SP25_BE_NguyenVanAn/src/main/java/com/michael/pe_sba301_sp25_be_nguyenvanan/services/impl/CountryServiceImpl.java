package com.michael.pe_sba301_sp25_be_nguyenvanan.services.impl;

import com.michael.pe_sba301_sp25_be_nguyenvanan.entites.Country;
import com.michael.pe_sba301_sp25_be_nguyenvanan.repositories.CountryRepository;
import com.michael.pe_sba301_sp25_be_nguyenvanan.services.interfaces.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class CountryServiceImpl implements CountryService {
	private final CountryRepository countryRepository;
	
	@Override
	public List<Country> getAllCountries() {
		return countryRepository.findAll();
	}
	@Override
	public Country getCountryById(Long countryId) {
		return countryRepository.findById(countryId).orElse(null);
	}
	@Override
	public Country createCountry(Country country) {
		return countryRepository.save(country);
	}
	@Override
	public Country updateCountry(Long countryId, Country updatedCountry) {
		return countryRepository.save(updatedCountry);
	}
	@Override
	public void deleteCountry(Long countryId) {
	countryRepository.deleteById(countryId);
	}
}
