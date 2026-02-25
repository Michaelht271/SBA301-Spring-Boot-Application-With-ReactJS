module com.michael.lab {
	
	requires javafx.controls;
	requires javafx.fxml;
	requires jakarta.persistence;
	requires org.hibernate.orm.core;
	requires java.sql;
	requires static lombok;
	
	exports com.michael.lab;
	exports com.michael.lab.pojos;
	exports com.michael.lab.services;
	
	opens com.michael.lab to javafx.fxml;
	
	opens com.michael.lab.pojos
			to org.hibernate.orm.core, jakarta.persistence;
}