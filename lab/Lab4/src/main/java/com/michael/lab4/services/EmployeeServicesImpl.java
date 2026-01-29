package com.michael.lab4.services;

import com.michael.lab4.models.Employee;
import com.michael.lab4.repositories.EmployeeRepository;
import com.michael.lab4.repositories.EmployeeRepositoryImpl;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServicesImpl implements  EmployeeService {
	private final EmployeeRepository employeeRepository;
	
	public EmployeeServicesImpl(EmployeeRepositoryImpl employeeRepository) {
		this.employeeRepository = employeeRepository;
	}
	
	@Override
	public List<Employee> getAllEmployees() {
		return employeeRepository.getAllEmployees();
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
