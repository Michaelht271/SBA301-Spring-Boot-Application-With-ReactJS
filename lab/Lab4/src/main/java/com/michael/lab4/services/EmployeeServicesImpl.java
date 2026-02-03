package com.michael.lab4.services;

import com.michael.lab4.models.Employee;
import com.michael.lab4.repositories.EmployeeRepository;
import com.michael.lab4.repositories.EmployeeRepositoryImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServicesImpl implements  EmployeeService {
	private final EmployeeRepository employeeRepository;
	
	public EmployeeServicesImpl(EmployeeRepository employeeRepository) {
		this.employeeRepository = employeeRepository;
	}
	
	@Override
	public List<Employee> getAllEmployees() {
		return employeeRepository.findAll();
	}
	
	@Override
	public Iterable<Employee> getAllEmployees(Sort sort) {
		return employeeRepository.findAll(sort);
	}
	@Override
	public Page<Employee> getAllEmployees(Pageable pageable) {
		return employeeRepository.findAll(pageable);
	}
	
	@Override
	public Optional<Employee> getEmployee(String id) {
		return employeeRepository.getEmployeeByEmployeeId(id);
	}
	
	@Override
	public Optional<Employee> updateEmployee(Employee employee) throws Exception {
		
		return updateEmployee(employee);
	}
	@Override
	public String deleteEmployee(String id) {
		return employeeRepository.deleteEmployee(id);
	}
	@Override
	public Optional<Employee> createEmployee(Employee employee) {
		return employeeRepository.createEmployee(employee);
	}
}
