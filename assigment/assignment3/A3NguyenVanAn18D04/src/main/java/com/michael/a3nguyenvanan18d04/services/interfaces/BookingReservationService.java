package com.michael.a3nguyenvanan18d04.services.interfaces;

import com.michael.a3nguyenvanan18d04.dtos.booking.request.BookingRequestDTO;
import com.michael.a3nguyenvanan18d04.entites.BookingReservation;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface BookingReservationService {
	List<BookingReservation> getBookingReservations(Authentication authentication);
	
	BookingReservation getBookingReservationById(Long id);
	
	BookingReservation createBookingReservation(BookingRequestDTO bookingReservation);
	
	BookingReservation updateBookingReservation(Long id, BookingReservation bookingReservation);
	
	void deleteBookingReservation(Long id);
}
