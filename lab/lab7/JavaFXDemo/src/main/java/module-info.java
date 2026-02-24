module sba.fe.javafxdemo {
    requires javafx.controls;
    requires javafx.fxml;
    requires javafx.base;
 requires com.michael.lab7; // Tên này phải khớp với module-info bên kia

    opens sba301.fe.javafxdemo to javafx.fxml;
    exports sba301.fe.javafxdemo;
}