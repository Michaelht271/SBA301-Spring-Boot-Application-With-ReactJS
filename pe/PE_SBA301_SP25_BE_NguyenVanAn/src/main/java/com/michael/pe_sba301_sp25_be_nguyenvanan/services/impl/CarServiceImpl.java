package com.michael.pe_sba301_sp25_be_nguyenvanan.services.impl;

import com.michael.pe_sba301_sp25_be_nguyenvanan.dtos.request.CreateCarRequest;
import com.michael.pe_sba301_sp25_be_nguyenvanan.entites.Car;
import com.michael.pe_sba301_sp25_be_nguyenvanan.entites.Country;
import com.michael.pe_sba301_sp25_be_nguyenvanan.repositories.CarRepository;
import com.michael.pe_sba301_sp25_be_nguyenvanan.services.interfaces.CarService;
import com.michael.pe_sba301_sp25_be_nguyenvanan.services.interfaces.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class CarServiceImpl implements CarService {
	private final CarRepository carRepository;
	private final CountryService countryService;
	
	@Override
	public List<Car> getAllCars() {
		return carRepository.findAll();
	}
	@Override
	public Car getCarById(Long carId) {
		return carRepository.findById(carId).orElse(null);
	}
	
	@Override
	public Car createCar(CreateCarRequest car) {
		Car newCar = Car.builder()
				.unitPrice(car.getUnitPrice())
				.carName(car.getCarName())
				.unitsInStock(car.getUnitsInStock()).build();
		Country country = countryService.getCountryById(car.getCountryId());
		country.addCar(newCar);
		return carRepository.save(newCar);
	}
	@Override
	public Car updateCar(Long carId, CreateCarRequest updatedCar) {
		Car existingCar = carRepository.findById(carId).orElse(null);
		assert existingCar != null;
		existingCar.setCarName(updatedCar.getCarName());
		existingCar.setUnitsInStock(updatedCar.getUnitsInStock());
		existingCar.setUnitPrice(updatedCar.getUnitPrice());
		Country country = countryService.getCountryById(updatedCar.getCountryId());
		country.addCar(existingCar);
		return carRepository.save(existingCar);
	}
	@Override
	public void deleteCar(Long carId) {
		Car car = carRepository.findById(carId).orElse(null);
		assert car != null;
		Country country = car.getCountry();
		country.removeCar(car);
		carRepository.deleteById(carId);
	}
}
