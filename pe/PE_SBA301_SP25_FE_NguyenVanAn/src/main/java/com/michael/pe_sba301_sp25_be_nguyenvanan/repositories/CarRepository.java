package com.michael.pe_sba301_sp25_be_nguyenvanan.repositories;

import com.michael.pe_sba301_sp25_be_nguyenvanan.entites.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository  extends JpaRepository<Car, Long> {
}
