package com.michael.pe_sba301_sp25_be_nguyenvanan.services.impl;

import com.michael.pe_sba301_sp25_be_nguyenvanan.entites.Car;
import com.michael.pe_sba301_sp25_be_nguyenvanan.repositories.CarRepository;
import com.michael.pe_sba301_sp25_be_nguyenvanan.services.interfaces.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class CarServiceImpl implements CarService {
	private final CarRepository carRepository;
	
	@Override
	public List<Car> getAllCars() {
		return carRepository.findAll();
	}
	@Override
	public Car getCarById(Long carId) {
		return carRepository.findById(carId).orElse(null);
	}
	@Override
	public Car createCar(Car car) {
		return carRepository.save(car);
	}
	@Override
	public Car updateCar(Long carId, Car updatedCar) {
		return carRepository.save(updatedCar);
	}
	@Override
	public void deleteCar(Long carId) {
	carRepository.deleteById(carId);
	}
}
