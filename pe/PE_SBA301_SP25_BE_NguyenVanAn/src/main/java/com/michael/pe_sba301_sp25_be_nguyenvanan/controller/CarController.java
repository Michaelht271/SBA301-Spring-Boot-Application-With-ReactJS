package com.michael.pe_sba301_sp25_be_nguyenvanan.controller;


import com.michael.pe_sba301_sp25_be_nguyenvanan.dtos.request.CreateCarRequest;
import com.michael.pe_sba301_sp25_be_nguyenvanan.entites.Car;
import com.michael.pe_sba301_sp25_be_nguyenvanan.services.interfaces.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CarController {
	private final CarService carService;
	
	@GetMapping({"/cars","/admin/cars"})
	public ResponseEntity<Object> getAllCars() {
		return ResponseEntity.ok(carService.getAllCars());
		
	}
	
	@PostMapping("/admin/cars")
	
	public  ResponseEntity<Object> createCar(@RequestBody CreateCarRequest car) {
		return ResponseEntity.ok(carService.createCar(car));
	}
	
	@PutMapping(("/admin/cars/{id}"))
	public ResponseEntity<Object> updateCar(@PathVariable Long id, @RequestBody CreateCarRequest updatedCar) {
		return ResponseEntity.ok(carService.updateCar(id, updatedCar));
	
	}
	
	@GetMapping("/cars/{id}")
	public ResponseEntity<Object> getCar(@PathVariable Long id){
		return ResponseEntity.ok(carService.getCarById(id));
	}
	
	@DeleteMapping("/admin/cars/{id}")
	public ResponseEntity<Object> deleteCar( @PathVariable Long id) {
		carService.deleteCar(id);
		return ResponseEntity.ok().build();
	}
	
	
}
