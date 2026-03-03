package com.michael.a3nguyenvanan18d04.services.impl;

import com.michael.a3nguyenvanan18d04.dtos.booking.request.BookingRequestDTO;
import com.michael.a3nguyenvanan18d04.entites.BookingDetail;
import com.michael.a3nguyenvanan18d04.entites.BookingReservation;
import com.michael.a3nguyenvanan18d04.entites.Customer;
import com.michael.a3nguyenvanan18d04.repository.BookingReservationRepository;
import com.michael.a3nguyenvanan18d04.services.interfaces.BookingDetailService;
import com.michael.a3nguyenvanan18d04.services.interfaces.BookingReservationService;
import com.michael.a3nguyenvanan18d04.services.interfaces.CustomerService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookingReservationServiceImpl implements BookingReservationService {
	private final BookingReservationRepository bookingReservationRepository;
	private final CustomerService customerService;
	private final BookingDetailService bookingDetailService;
	
	public BookingReservationServiceImpl(BookingReservationRepository bookingReservationRepository, CustomerServiceImpl customerService, BookingDetailService bookingDetailService) {
		this.bookingReservationRepository = bookingReservationRepository;
		this.customerService = customerService;
		this.bookingDetailService = bookingDetailService;
	}
	
	@Override
	public List<BookingReservation> getBookingReservations(Authentication authentication) {
		boolean isStaff = authentication.getAuthorities().stream()
		                                .map(a -> a.getAuthority())
		                                .anyMatch(role -> role.equals("ROLE_STAFF") || role.equals("ROLE_ADMIN") || role.equals("ROLE_MANAGER"));
		if (isStaff) {
			return bookingReservationRepository.findAll();
		}
		String principalName = authentication.getName();
		Customer customer = customerService.getCustomerByEmail(principalName);
		return customer.getBookingReservation();
	}
	@Override
	public BookingReservation getBookingReservationById(Long id) {
		return bookingReservationRepository.getReferenceById(id);
	}
	@Override
	public BookingReservation createBookingReservation(BookingRequestDTO bookingRequest) {
		BookingReservation bookings= BookingReservation.builder().bookingDate(bookingRequest.getBookingDate()).bookingStatus(bookingRequest.getBookingStatus()).totalPrice(bookingRequest.getTotalPrice()).build();
		List<BookingDetail> bookingDetails =
				bookingRequest.getBookingDetails()
				              .stream()
				              .map(bookingDetailService::createBookingDetail).toList();
		for (BookingDetail detail : bookingDetails) {
			bookings.addBookingDetails(detail);
		}
		Customer customer = customerService.getCustomerById(bookingRequest.getCustomerID());
		customer.addBookingReservation(bookings);
		return bookingReservationRepository.save(bookings);
	}
	@Override
	public BookingReservation updateBookingReservation(Long id, BookingReservation bookingReservation) {
		return bookingReservationRepository.save(bookingReservation);
	}
	@Override
	public void deleteBookingReservation(Long id) {
		bookingReservationRepository.deleteById(id);
	
	}
}
