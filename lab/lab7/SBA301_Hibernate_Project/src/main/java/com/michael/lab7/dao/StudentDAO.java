package com.michael.lab7.dao;

import com.michael.lab7.pojos.Student;
import com.michael.lab7.utils.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.ArrayList;
import java.util.List;

public class StudentDAO {
	private static StudentDAO instance = new StudentDAO();
		
	public static StudentDAO getInstance() {
		if(instance == null) {
			instance = new StudentDAO();
		}
		return instance;
	}
	
	public void save(Student student) {
		Transaction transaction = null;
		try(Session session = HibernateUtil.getSessionFactory().openSession()){
			transaction =session.beginTransaction();
			session.persist(student);
			transaction.commit();
			System.out.println("Student saved successfully");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public List<Student> getStudents(){
		Transaction transaction = null;
		List<Student> students = new ArrayList<>();
		try(Session session = HibernateUtil.getSessionFactory().openSession()){
			transaction = session.beginTransaction();
			students = session.createQuery("FROM Student", Student.class).getResultList();
			transaction.commit();
			System.out.println("Students retrieved successfully");
			return students;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return students;
	}
	
	public Student getStudentById(Long id) {
		Transaction transaction = null;
		Student student = null;
		try(Session session = HibernateUtil.getSessionFactory().openSession()){
			transaction = session.beginTransaction();
			student = session.get(Student.class, id);
			transaction.commit();
			System.out.println("Student retrieved successfully");
			return student;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return student;
	}
	
	public void delete (Long studentID) {
		Transaction transaction = null;
		try(Session session = HibernateUtil.getSessionFactory().openSession()){
			transaction = session.beginTransaction();
			Student student = getStudentById(studentID);
			session.remove(student);
			transaction.commit();
			System.out.println("Student deleted successfully");
		}  catch ( Exception e) {
			e.printStackTrace();
		}
	}
	
	public Student getStudentByEmail() {
		Transaction transaction = null;
		Student student = null;
		try(Session session = HibernateUtil.getSessionFactory().openSession()){
			transaction = session.beginTransaction();
			student = session.createQuery("FROM Student WHERE email = :email", Student.class).getSingleResult();
			transaction.commit();
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		return student;
	}
	
	public void update(Student student){
		Transaction transaction = null;
		try(Session session = HibernateUtil.getSessionFactory().openSession()){
			transaction = session.beginTransaction();
			session.persist(student);
			transaction.commit();
			System.out.println("Student updated successfully");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
