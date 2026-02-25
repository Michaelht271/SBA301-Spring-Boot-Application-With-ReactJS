package sba301.fe.javafxdemo;

import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

import com.michael.lab.pojos.Student;
import com.michael.lab.services.StudentService;
import com.michael.lab.services.StudentServiceImpl;
import javafx.application.Platform;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.stage.Stage;


public class LoginController implements Initializable {
    @FXML
    private TextField txtEmail;

    @FXML
    private PasswordField txtPassword;

    private StudentService iStudentService = StudentServiceImpl.getInstance() ;

    public LoginController() {
        iStudentService =  StudentServiceImpl.getInstance();
    }

    @Override
    public void initialize(URL arg0, ResourceBundle arg1) {
        // TODO Auto-generated method stub
    }
	
	@FXML
	public void login() throws IOException {
		
		String email = txtEmail.getText();
		String password = txtPassword.getText();
		
		Student account = iStudentService.getStudentByEmail(email);
		
		if (account == null) {
			
			Alert alert = new Alert(Alert.AlertType.ERROR);
			alert.setTitle("Login Failed");
			alert.setHeaderText(null);
			alert.setContentText("Email does not exist!");
			alert.showAndWait();
			
			return;
		}
		
		if (!account.getPassword().equals(password)) {
			
			Alert alert = new Alert(Alert.AlertType.ERROR);
			alert.setTitle("Login Failed");
			alert.setHeaderText(null);
			alert.setContentText("Wrong password!");
			alert.showAndWait();
			
			return;
		}
		
		// login success
		FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("/student-view.fxml"));
		Parent root = fxmlLoader.load();
		
		Stage stage = new Stage();
		stage.setScene(new Scene(root));
		stage.setTitle("Student Dashboard");
		stage.show();
		
		// đóng cửa sổ login
		Stage currentStage = (Stage) txtEmail.getScene().getWindow();
		currentStage.close();
	}

    @FXML
    public void logout() throws IOException {
        Platform.exit();
    }

    @FXML
    public void hello() {
        // Phương thức này hiện đang để trống theo ảnh chụp
    }
}
