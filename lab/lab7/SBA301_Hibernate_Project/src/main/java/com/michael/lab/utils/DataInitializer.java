package com.michael.lab.utils;

import com.michael.lab.dao.StudentDAO;
import com.michael.lab.pojos.Student;

public class DataInitializer {

    /**
     * Initialize sample Student data. This method is idempotent-ish: if DB
     * constraints prevent duplicates, errors will be logged but won't stop app.
     */
    public static void initData() {
        StudentDAO dao = StudentDAO.getInstance();

        try {
            Student s1 = new Student();
            s1.setEmail("alice@example.com");
            s1.setPassword("pass123");
            s1.setFirstName("Alice");
            s1.setLastName("Smith");
            s1.setMarks(90);
            dao.save(s1);
        } catch (Exception e) {
            System.err.println("Failed to save student alice@example.com: " + e.getMessage());
        }

        try {
            Student s2 = new Student();
            s2.setEmail("bob@example.com");
            s2.setPassword("secret");
            s2.setFirstName("Bob");
            s2.setLastName("Johnson");
            s2.setMarks(78);
            dao.save(s2);
        } catch (Exception e) {
            System.err.println("Failed to save student bob@example.com: " + e.getMessage());
        }

        try {
            Student s3 = new Student();
            s3.setEmail("carol@example.com");
            s3.setPassword("pwd");
            s3.setFirstName("Carol");
            s3.setLastName("Williams");
            s3.setMarks(82);
            dao.save(s3);
        } catch (Exception e) {
            System.err.println("Failed to save student carol@example.com: " + e.getMessage());
        }

        System.out.println("DataInitializer: sample students initialization finished.");
    }
}
