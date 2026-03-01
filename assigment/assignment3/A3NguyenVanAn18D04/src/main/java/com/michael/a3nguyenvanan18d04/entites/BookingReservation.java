package com.michael.a3nguyenvanan18d04.entites;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.michael.a3nguyenvanan18d04.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "BookingReservation")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingReservation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long bookingReservationID;
	
	private LocalDateTime bookingDate;
	
	private double totalPrice;
	
	private BookingStatus bookingStatus;
	
	@ManyToOne
	@JoinColumn(name = "customerID")
	@JsonIgnoreProperties("bookingReservation")
	private Customer customer;
	
	
	@OneToMany(mappedBy = "bookingReservation", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnoreProperties("bookingReservation")
	private List<BookingDetail> bookingDetails = new ArrayList<>();
	
	public void addBookingDetails(BookingDetail detail) {
		if (bookingDetails == null) {
			bookingDetails = new ArrayList<>();
		}
		bookingDetails.add(detail);
		detail.setBookingReservation(this); // set back-reference
	}
	
	public void removeBookingDetails(BookingDetail detail) {
		if (bookingDetails != null) {
			bookingDetails.remove(detail);
			detail.setBookingReservation(null);
		}
	}
	
	
}
