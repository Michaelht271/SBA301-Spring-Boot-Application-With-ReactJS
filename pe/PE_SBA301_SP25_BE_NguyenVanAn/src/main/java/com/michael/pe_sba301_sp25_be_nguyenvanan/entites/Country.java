package com.michael.pe_sba301_sp25_be_nguyenvanan.entites;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Country")
@Data
public class Country {
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private Long countryId;
	private String countryName;
	
	@OneToMany(mappedBy = "country", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private List<Car> cars = new ArrayList<>();
	
	
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
