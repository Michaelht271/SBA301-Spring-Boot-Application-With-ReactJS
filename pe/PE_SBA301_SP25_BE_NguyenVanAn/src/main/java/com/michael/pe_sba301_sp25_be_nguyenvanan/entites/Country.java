package com.michael.pe_sba301_sp25_be_nguyenvanan.entites;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Country")
@Data
@NoArgsConstructor
public class Country {
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private Long countryId;
	private String countryName;
	
	@OneToMany(mappedBy = "country", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	@JsonIgnoreProperties("country")
	private List<Car> cars = new ArrayList<>();
	public Country(String countryName) {
		this.countryName = countryName;
	}
	public void addCar(Car car) {
		if(cars == null) {
			cars = new ArrayList<>();
		}
		
		cars.add(car);
		car.setCountry(this);
	}
	
	public void removeCar(Car car) {
		cars.remove(car);
		car.setCountry(null);
	}
	
	
}
