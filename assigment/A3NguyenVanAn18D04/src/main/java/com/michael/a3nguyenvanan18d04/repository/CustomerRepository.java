package com.michael.a3nguyenvanan18d04.repository;

import com.michael.a3nguyenvanan18d04.entites.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
	Customer findByEmailAddress(String emailAddress);
	Customer findByTelephone(String telephone);
}
