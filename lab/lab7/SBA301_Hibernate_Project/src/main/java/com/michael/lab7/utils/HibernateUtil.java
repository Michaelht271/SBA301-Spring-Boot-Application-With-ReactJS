package com.michael.lab7.utils;

import com.michael.lab7.pojos.Book;
import com.michael.lab7.pojos.Student;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

/**
 * Utility class for managing Hibernate {@link SessionFactory}.
 *
 * <p>This class follows the Singleton pattern to ensure only one
 * {@link SessionFactory} instance is created throughout the application lifecycle.
 * The {@link SessionFactory} is initialized once at class loading time and reused
 * for all database operations.</p>
 *
 * <p>Usage example:</p>
 * <pre>{@code
 * SessionFactory factory = HibernateUtil.getSessionFactory();
 * try (Session session = factory.openSession()) {
 *     Transaction tx = session.beginTransaction();
 *     session.save(entity);
 *     tx.commit();
 * }
 * }</pre>
 *
 * @author Michael
 * @version 1.0
 */
public class HibernateUtil {
	private HibernateUtil() {}
	/**
	 * The single instance of {@link SessionFactory}, initialized at class load time.
	 */
	private static final SessionFactory sessionFactory = buildSessionFactory();
	
	/**
	 * Builds and returns a {@link SessionFactory} by loading Hibernate configuration
	 * from {@code hibernate.cfg.xml} and registering all annotated entity classes.
	 *
	 * <p>Registered entities:</p>
	 * <ul>
	 *   <li>{@link Book}</li>
	 *   <li>{@link Student}</li>
	 * </ul>
	 *
	 * @return a fully initialized {@link SessionFactory}
	 * @throws ExceptionInInitializerError if the {@link SessionFactory} creation fails
	 */
	private static SessionFactory buildSessionFactory() {
		try {
			// Load cấu hình từ hibernate.cfg.xml và đăng ký các entity
			Configuration cfg = new Configuration()
					.configure()                          // đọc hibernate.cfg.xml từ classpath
					.addAnnotatedClass(Book.class)        // đăng ký entity Book
					.addAnnotatedClass(Student.class);    // đăng ký entity Student
			
			return cfg.buildSessionFactory();
		} catch (Throwable ex) {
			System.err.println("Initial SessionFactory creation failed.");
			ex.printStackTrace();
			throw new ExceptionInInitializerError(ex);
		}
	}
	
	/**
	 * Returns the singleton {@link SessionFactory} instance.
	 *
	 * <p>Use this method to obtain a {@link SessionFactory} for opening
	 * Hibernate {@code Session}s and performing database operations.</p>
	 *
	 * @return the singleton {@link SessionFactory}
	 */
	public static SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	
	/**
	 * Closes the {@link SessionFactory} and releases all resources.
	 *
	 * <p>This method should be called once when the application is shutting down
	 * to properly release database connections and other resources held by Hibernate.</p>
	 */
//	public static void shutdown() {
//		getSessionFactory().close();
//	}
}