module com.michael.lab7 {
	requires javafx.controls;
	requires javafx.fxml;
	requires jakarta.persistence;

	requires org.hibernate.orm.core;
	requires static lombok;
	
	opens com.michael.lab7 to javafx.fxml;
	exports com.michael.lab7;
	exports com.michael.lab7.pojos;
	exports com.michael.lab7.services;
}