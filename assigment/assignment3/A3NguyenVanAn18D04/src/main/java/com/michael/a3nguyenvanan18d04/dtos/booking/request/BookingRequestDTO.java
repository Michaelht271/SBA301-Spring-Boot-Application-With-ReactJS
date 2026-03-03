package com.michael.a3nguyenvanan18d04.dtos.booking.request;

import com.michael.a3nguyenvanan18d04.entites.BookingReservation;
import com.michael.a3nguyenvanan18d04.enums.BookingStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class BookingRequestDTO {
	@NotNull
	private Long customerID;
	@NotNull
	private List<BookingDetailRequestDTO> bookingDetails;
	@NotNull
	private BookingStatus bookingStatus;
	@NotNull
	private LocalDate checkInDate;
	
	@NotNull
	private LocalDate checkOutDate;
	@NotNull
	private LocalDateTime bookingDate;
	
	@NotNull
	private double totalPrice;
	
	
}
