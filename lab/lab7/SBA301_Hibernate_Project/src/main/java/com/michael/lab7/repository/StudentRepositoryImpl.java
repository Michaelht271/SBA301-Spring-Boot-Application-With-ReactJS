package com.michael.lab7.repository;

import com.michael.lab7.dao.StudentDAO;
import com.michael.lab7.pojos.Student;

import java.util.List;

public class StudentRepositoryImpl implements StudentRepository{
	
	private static StudentRepositoryImpl instance = new StudentRepositoryImpl();
	private final StudentDAO studentDao  = StudentDAO.getInstance();
	public static StudentRepository getInstance() {
		if(instance == null) {
			instance = new StudentRepositoryImpl();
		}
		return instance;
	}
	
	@Override
	public List<Student> findAll() {
		return studentDao.getStudents();
	}
	@Override
	public void save(Student student) {
		 studentDao.save(student);
	}
	@Override
	public void delete(Long studentID) {
	 studentDao.delete(studentID);
	}
	@Override
	public Student findById(Long studentID) {
		return studentDao.getStudentById(studentID);
	}
	@Override
	public Student findStudentByEmail(String email) {
		return studentDao.getStudentByEmail();
	}
	@Override
	public void update(Student student) {
		studentDao.save(student);
	}
}
