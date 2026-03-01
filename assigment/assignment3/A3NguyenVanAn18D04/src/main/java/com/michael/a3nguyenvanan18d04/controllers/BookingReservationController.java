package com.michael.a3nguyenvanan18d04.controllers;

import com.michael.a3nguyenvanan18d04.dtos.booking.request.BookingRequestDTO;
import com.michael.a3nguyenvanan18d04.dtos.booking.request.BookingStatusUpdateDTO;
import com.michael.a3nguyenvanan18d04.entites.BookingReservation;
import com.michael.a3nguyenvanan18d04.services.interfaces.BookingReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/bookings")
public class BookingReservationController {
	private final BookingReservationService bookingReservationService;
	
	
	public BookingReservationController (BookingReservationService bookingReservationService){
		this.bookingReservationService = bookingReservationService;
	}
	
	@GetMapping({"", "/customer/{customerID}"})
	@PreAuthorize("hasAnyRole('STAFF','CUSTOMER')")
	
	public ResponseEntity<Object> getBookings(@PathVariable(required = false) Long customerID, Authentication authentication) {
		return ResponseEntity.ok(
				bookingReservationService.getBookingReservations(authentication)
		);
	}
	
	@PostMapping
	public ResponseEntity<Object> createBooking(@RequestBody BookingRequestDTO bookingRequestDTO ) {
		return ResponseEntity.ok(
				bookingReservationService.createBookingReservation(bookingRequestDTO)
		);
	}
	@PutMapping("/{id}/status")
	public ResponseEntity<Object> updateBookingStatus(@PathVariable Long id, @RequestBody BookingStatusUpdateDTO bookingStatusUpdateDTO) {
		try {
			BookingReservation bookings = bookingReservationService.getBookingReservationById(id);
			bookings.setBookingStatus(bookingStatusUpdateDTO.getStatus());
			bookingReservationService.updateBookingReservation(id, bookings);
		}
		catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		return ResponseEntity.ok("Booking status updated");
	}
	
}
