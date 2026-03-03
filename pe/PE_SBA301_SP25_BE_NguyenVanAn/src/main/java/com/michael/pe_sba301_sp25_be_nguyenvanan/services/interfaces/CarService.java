package com.michael.pe_sba301_sp25_be_nguyenvanan.services.interfaces;

import com.michael.pe_sba301_sp25_be_nguyenvanan.entites.Car;

import java.util.List;

public interface CarService {
	List<Car> getAllCars();
	
	Car getCarById(Long carId);
	
	Car createCar(Car car);
	
	Car updateCar(Long carId, Car updatedCar);
	
	void deleteCar(Long carId);
}
