package com.michael.a3nguyenvanan18d04.entites;

import com.michael.a3nguyenvanan18d04.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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
	private Customer customer;
	
}
