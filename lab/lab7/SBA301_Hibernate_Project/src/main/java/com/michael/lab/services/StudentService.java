package com.michael.lab.services;

import com.michael.lab.pojos.Student;

import java.util.List;

public interface StudentService {
	 List<Student> getAllStudents();
	
	void save(Student student);
	void delete(Long studentID);
	
	Student getStudentById(Long studentID);
	
	Student getStudentByEmail(String email);
	
	void update(Student student);
}
