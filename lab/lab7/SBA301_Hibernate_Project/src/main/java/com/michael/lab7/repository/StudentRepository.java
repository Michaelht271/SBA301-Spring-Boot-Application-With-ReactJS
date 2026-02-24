package com.michael.lab7.repository;

import com.michael.lab7.pojos.Student;

import java.util.List;

public interface StudentRepository {
	List<Student> findAll();
	void save(Student student);
	void delete(Long studentID);
	
	Student findById(Long studentID);
	
	Student findStudentByEmail(String email);
	
	void update(Student student);
}
