package com.michael.a3nguyenvanan18d04.entites;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.michael.a3nguyenvanan18d04.enums.CustomerStatus;
import com.michael.a3nguyenvanan18d04.enums.Role;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Customer")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long customerID;
	
	private String customerFullName;
	
	private String telephone;
	
	private String emailAddress;
	
	private LocalDate customerBirthday;
	
	private CustomerStatus customerStatus;
	
	private String password;
	
	private Role roles;
	
	@OneToMany(mappedBy = "customer", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnoreProperties("customer")
	private List<BookingReservation> bookingReservation =  new ArrayList<>();
	
	
	public void addBookingReservation(BookingReservation bookingReservation) {
		this.bookingReservation.add(bookingReservation);
		bookingReservation.setCustomer(this);
	}
	
	public void removeBookingReservation(BookingReservation bookingReservation) {
		this.bookingReservation.remove(bookingReservation);
		bookingReservation.setCustomer(this);
	}
}
