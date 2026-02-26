package com.michael.a3nguyenvanan18d04.services.interfaces;

import com.michael.a3nguyenvanan18d04.entites.BookingReservation;

import java.util.List;

public interface BookingReservationService {
	List<BookingReservation> getBookingReservationServices();
	
	BookingReservation getBookingReservationById(Long id);
	
	BookingReservation createBookingReservation(BookingReservation bookingReservation);
	
	BookingReservation updateBookingReservation(Long id, BookingReservation bookingReservation);
	
	void deleteBookingReservation(Long id);
}
