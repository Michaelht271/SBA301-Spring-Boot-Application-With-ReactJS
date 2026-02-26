package com.michael.a3nguyenvanan18d04.services.interfaces;

import com.michael.a3nguyenvanan18d04.entites.BookingDetail;

import java.util.List;

public interface BookingDetailService {
	List<BookingDetail> getBookingDetailServices();
	
	BookingDetail getBookingDetailById(Long id);
	
	BookingDetail createBookingDetail(BookingDetail bookingDetail);
	
	BookingDetail updateBookingDetail(Long id, BookingDetail bookingDetail);
	
	void deleteBookingDetail(Long id);
	
}
