package com.michael.lab.services;

import com.michael.lab.pojos.Student;

import java.util.List;

public class StudentServiceImpl implements  StudentService{
	private static StudentServiceImpl instance = new StudentServiceImpl();
	private final com.michael.lab.repository.StudentRepository studentRepository = com.michael.lab.repository.StudentRepositoryImpl.getInstance();

	public static StudentService getInstance() {
		if (instance == null) {
			instance = new StudentServiceImpl();
		}
		return instance;
	}

	@Override
	public List<Student> getAllStudents() {
		return studentRepository.findAll();
	}

	@Override
	public void save(Student student) {
		studentRepository.save(student);
	}

	@Override
	public void delete(Long studentID) {
		studentRepository.delete(studentID);
	}

	@Override
	public Student getStudentById(Long studentID) {
		return studentRepository.findById(studentID);
	}

	@Override
	public Student getStudentByEmail(String email) {
		return studentRepository.findStudentByEmail(email);
	}

	@Override
	public void update(Student student) {
		
		studentRepository.update(student);
	}

}
