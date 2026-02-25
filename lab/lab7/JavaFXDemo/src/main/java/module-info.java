module sba301.fe.javafxdemo {
    requires javafx.controls;
    requires javafx.fxml;
    requires javafx.base;
    requires com.michael.lab; // updated to match the Hibernate project's module name

    opens sba301.fe.javafxdemo to javafx.fxml;
    exports sba301.fe.javafxdemo;
}