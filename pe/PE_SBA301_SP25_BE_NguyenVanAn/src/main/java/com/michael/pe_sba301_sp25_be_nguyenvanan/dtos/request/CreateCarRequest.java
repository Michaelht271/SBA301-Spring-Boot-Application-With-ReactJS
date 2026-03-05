package com.michael.pe_sba301_sp25_be_nguyenvanan.dtos.request;

import com.michael.pe_sba301_sp25_be_nguyenvanan.entites.Country;
import lombok.Data;

@Data
public class CreateCarRequest {

	private String carName;
	
	private Country country;
	
	private Long unitsInStock;
	
	private double unitPrice;
	private Long countryId;
	
}
